import { useState, useMemo } from "react";
import { Plus, Minus, Fuel, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface StockItem {
  id: string;
  litrage: number;
  quantiteDisponible: number;
  prixUnitaire: number;
}

export interface SelectedVoucher {
  litrageId: string;
  litrage: number;
  quantite: number;
  prixUnitaire: number;
}

interface VoucherSelectorProps {
  stocks: StockItem[];
  selectedVouchers: SelectedVoucher[];
  onChange: (vouchers: SelectedVoucher[]) => void;
}

export function VoucherSelector({ stocks, selectedVouchers, onChange }: VoucherSelectorProps) {
  const [selectedLitrage, setSelectedLitrage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Calculate remaining stock after current selections
  const remainingStock = useMemo(() => {
    return stocks.map(stock => {
      const selected = selectedVouchers.find(v => v.litrageId === stock.id);
      return {
        ...stock,
        quantiteRestante: stock.quantiteDisponible - (selected?.quantite || 0)
      };
    });
  }, [stocks, selectedVouchers]);

  // Calculate totals
  const totals = useMemo(() => {
    const totalLitres = selectedVouchers.reduce((acc, v) => acc + (v.litrage * v.quantite), 0);
    const totalBons = selectedVouchers.reduce((acc, v) => acc + v.quantite, 0);
    const totalValeur = selectedVouchers.reduce((acc, v) => acc + (v.prixUnitaire * v.quantite), 0);
    return { totalLitres, totalBons, totalValeur };
  }, [selectedVouchers]);

  const handleAddVoucher = () => {
    if (!selectedLitrage || quantity < 1) return;
    
    const stock = stocks.find(s => s.id === selectedLitrage);
    if (!stock) return;

    const remaining = remainingStock.find(s => s.id === selectedLitrage);
    if (!remaining || remaining.quantiteRestante < quantity) return;

    const existingIndex = selectedVouchers.findIndex(v => v.litrageId === selectedLitrage);
    
    if (existingIndex >= 0) {
      // Update existing
      const updated = [...selectedVouchers];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantite: updated[existingIndex].quantite + quantity
      };
      onChange(updated);
    } else {
      // Add new
      onChange([...selectedVouchers, {
        litrageId: stock.id,
        litrage: stock.litrage,
        quantite: quantity,
        prixUnitaire: stock.prixUnitaire
      }]);
    }
    
    setSelectedLitrage("");
    setQuantity(1);
  };

  const handleRemoveVoucher = (litrageId: string) => {
    onChange(selectedVouchers.filter(v => v.litrageId !== litrageId));
  };

  const handleUpdateQuantity = (litrageId: string, delta: number) => {
    const stock = stocks.find(s => s.id === litrageId);
    const remaining = remainingStock.find(s => s.id === litrageId);
    
    onChange(selectedVouchers.map(v => {
      if (v.litrageId === litrageId) {
        const newQty = Math.max(1, v.quantite + delta);
        // Check stock limit
        if (delta > 0 && remaining && remaining.quantiteRestante < delta) {
          return v;
        }
        return { ...v, quantite: newQty };
      }
      return v;
    }));
  };

  const availableStocks = remainingStock.filter(s => s.quantiteRestante > 0);

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2">
        <Fuel className="h-4 w-4" />
        Sélection des bons (comme billets de banque)
      </Label>

      {/* Stock Available Summary */}
      <div className="flex flex-wrap gap-2">
        {remainingStock.map(stock => (
          <Badge 
            key={stock.id} 
            variant={stock.quantiteRestante > 0 ? "outline" : "secondary"}
            className={stock.quantiteRestante <= 5 && stock.quantiteRestante > 0 ? "border-warning text-warning" : ""}
          >
            {stock.litrage}L: {stock.quantiteRestante} dispo
          </Badge>
        ))}
      </div>

      {/* Add Voucher Row */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 space-y-1">
          <label className="text-xs text-muted-foreground">Type de bon</label>
          <Select value={selectedLitrage} onValueChange={setSelectedLitrage}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un litrage" />
            </SelectTrigger>
            <SelectContent>
              {availableStocks.map(stock => (
                <SelectItem key={stock.id} value={stock.id}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{stock.litrage}L</span>
                    <span className="text-muted-foreground text-xs">
                      ({stock.quantiteRestante} dispo)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-20 space-y-1">
          <label className="text-xs text-muted-foreground">Qté</label>
          <Input
            type="number"
            min={1}
            max={remainingStock.find(s => s.id === selectedLitrage)?.quantiteRestante || 99}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
        </div>
        <Button 
          type="button" 
          onClick={handleAddVoucher}
          disabled={!selectedLitrage || quantity < 1}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Vouchers */}
      {selectedVouchers.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4 space-y-3">
            <div className="text-sm font-medium">Bons sélectionnés</div>
            {selectedVouchers.map(voucher => (
              <div key={voucher.litrageId} className="flex items-center justify-between bg-background rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {voucher.litrage}L
                  </div>
                  <div>
                    <div className="font-medium">Bon de {voucher.litrage} litres</div>
                    <div className="text-xs text-muted-foreground">
                      {voucher.prixUnitaire.toFixed(2)} € × {voucher.quantite} = {(voucher.prixUnitaire * voucher.quantite).toFixed(2)} €
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUpdateQuantity(voucher.litrageId, -1)}
                    disabled={voucher.quantite <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{voucher.quantite}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUpdateQuantity(voucher.litrageId, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveVoucher(voucher.litrageId)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="text-sm text-muted-foreground">
                {totals.totalBons} bon(s) • {totals.totalLitres} litres
              </div>
              <div className="text-lg font-bold">
                {totals.totalValeur.toFixed(2)} €
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedVouchers.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
          <AlertCircle className="h-4 w-4" />
          Sélectionnez les bons à attribuer en combinant différents types
        </div>
      )}
    </div>
  );
}

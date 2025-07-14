
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface VerbaFormProps {
  onSubmit: (verba: any) => void;
  onCancel: () => void;
}

export const VerbaForm = ({ onSubmit, onCancel }: VerbaFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fornecedor: "",
    tipo: "",
    valor: "",
    canal: "",
    dataInicio: "",
    dataFim: "",
    observacoes: ""
  });
  // States para controlar abertura dos Selects
  const [openFornecedor, setOpenFornecedor] = useState(false);
  const [openTipo, setOpenTipo] = useState(false);
  const [openCanal, setOpenCanal] = useState(false);

  useEffect(() => {
    function handleCloseAll() {
      setOpenFornecedor(false);
      setOpenTipo(false);
      setOpenCanal(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fornecedor || !formData.tipo || !formData.valor) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novaVerba = {
      id: `VB${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      fornecedor: formData.fornecedor,
      tipo: formData.tipo as 'carta' | 'percentual' | 'fixo',
      valor: parseFloat(formData.valor),
      status: 'pendente' as const,
      dataInicio: formData.dataInicio,
      dataFim: formData.dataFim,
      canal: formData.canal as 'varejo' | 'atacado' | 'ambos',
      utilizacao: 0,
      responsavel: 'Usuário Atual'
    };

    onSubmit(novaVerba);
    toast({
      title: "Sucesso",
      description: "Verba cadastrada com sucesso!",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Cadastrar Nova Verba</CardTitle>
        <CardDescription>Registre uma nova verba comercial no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select
                value={formData.fornecedor}
                onChange={(value) => setFormData({ ...formData, fornecedor: value })}
                options={[
                  { value: "Samsung Electronics", label: "Samsung Electronics" },
                  { value: "LG Brasil", label: "LG Brasil" },
                  { value: "Sony Corporation", label: "Sony Corporation" },
                  { value: "Philips Healthcare", label: "Philips Healthcare" },
                  { value: "Electrolux", label: "Electrolux" },
                ]}
                placeholder="Selecione o fornecedor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Verba *</Label>
              <Select
                value={formData.tipo}
                onChange={(value) => setFormData({ ...formData, tipo: value })}
                options={[
                  { value: "carta", label: "Carta de Verba" },
                  { value: "percentual", label: "% sobre Compra" },
                  { value: "fixo", label: "Valor Fixo" },
                ]}
                placeholder="Selecione o tipo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor *</Label>
              <Input 
                id="valor" 
                placeholder={formData.tipo === 'percentual' ? '0.00%' : 'R$ 0,00'}
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canal">Canal</Label>
              <Select
                value={formData.canal}
                onChange={(value) => setFormData({ ...formData, canal: value })}
                options={[
                  { value: "varejo", label: "Varejo" },
                  { value: "atacado", label: "Atacado" },
                  { value: "ambos", label: "Ambos" },
                ]}
                placeholder="Selecione o canal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input 
                id="dataInicio" 
                type="date" 
                value={formData.dataInicio}
                onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input 
                id="dataFim" 
                type="date" 
                value={formData.dataFim}
                onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea 
              id="observacoes" 
              placeholder="Detalhes adicionais da verba..."
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Verba
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

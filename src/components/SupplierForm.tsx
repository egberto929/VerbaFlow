
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SupplierFormProps {
  onSubmit: (supplier: any) => void;
  onCancel: () => void;
}

export const SupplierForm = ({ onSubmit, onCancel }: SupplierFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    categoria: "",
    responsavel: "",
    email: "",
    telefone: "",
    endereco: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cnpj || !formData.categoria) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const novoFornecedor = {
      id: `FOR${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      nome: formData.nome,
      cnpj: formData.cnpj,
      categoria: formData.categoria,
      status: 'ativo' as const,
      verbasAtivas: 0,
      valorTotal: 0,
      contato: {
        responsavel: formData.responsavel,
        email: formData.email,
        telefone: formData.telefone
      },
      endereco: formData.endereco,
      ultimaAtualizacao: new Date().toISOString().split('T')[0]
    };

    onSubmit(novoFornecedor);
    toast({
      title: "Sucesso",
      description: "Fornecedor cadastrado com sucesso!",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Cadastrar Novo Fornecedor</CardTitle>
        <CardDescription>Adicione um novo fornecedor ao sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome/Razão Social *</Label>
              <Input 
                id="nome" 
                placeholder="Nome do fornecedor"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input 
                id="cnpj" 
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select
                value={formData.categoria}
                onChange={(value) => setFormData({ ...formData, categoria: value })}
                options={[
                  { value: "Eletrônicos", label: "Eletrônicos" },
                  { value: "Eletrodomésticos", label: "Eletrodomésticos" },
                  { value: "Móveis", label: "Móveis" },
                  { value: "Saúde e Beleza", label: "Saúde e Beleza" },
                ]}
                placeholder="Selecione a categoria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input 
                id="responsavel" 
                placeholder="Nome do contato"
                value={formData.responsavel}
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="contato@fornecedor.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input 
                id="telefone" 
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input 
              id="endereco" 
              placeholder="Cidade - Estado"
              value={formData.endereco}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Fornecedor
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

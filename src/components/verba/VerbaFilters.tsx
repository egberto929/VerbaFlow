
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

interface VerbaFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export const VerbaFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion
}: VerbaFiltersProps) => {
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("todos");
    setSelectedCategory("todos");
    setSelectedRegion("todos");
  };

  const hasActiveFilters = searchTerm || selectedStatus !== "todos" || 
                          selectedCategory !== "todos" || selectedRegion !== "todos";

  // States para controlar abertura dos Selects
  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);

  useEffect(() => {
    function handleCloseAll() {
      setOpenStatus(false);
      setOpenCategory(false);
      setOpenRegion(false);
    }
    window.addEventListener('close-all-radix-portals', handleCloseAll);
    return () => window.removeEventListener('close-all-radix-portals', handleCloseAll);
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por fornecedor, ID ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={[
                { value: "todos", label: "Todos" },
                { value: "ativa", label: "Ativa" },
                { value: "pendente", label: "Pendente" },
                { value: "vencida", label: "Vencida" },
                { value: "utilizada", label: "Utilizada" },
              ]}
              placeholder="Status"
              className="min-w-[120px]"
            />

            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                { value: "todos", label: "Todas" },
                { value: "eletronicos", label: "Eletrônicos" },
                { value: "eletrodomesticos", label: "Eletrodomésticos" },
                { value: "moveis", label: "Móveis" },
                { value: "utilidades", label: "Utilidades" },
              ]}
              placeholder="Categoria"
              className="min-w-[120px]"
            />

            <Select
              value={selectedRegion}
              onChange={setSelectedRegion}
              options={[
                { value: "todos", label: "Todas" },
                { value: "sul", label: "Sul" },
                { value: "sudeste", label: "Sudeste" },
                { value: "norte", label: "Norte" },
                { value: "nordeste", label: "Nordeste" },
                { value: "centrooeste", label: "Centro-Oeste" },
              ]}
              placeholder="Região"
              className="min-w-[120px]"
            />

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

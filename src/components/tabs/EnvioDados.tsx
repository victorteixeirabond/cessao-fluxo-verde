
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "../FileUpload";
import { toast } from "@/hooks/use-toast";

const EnvioDados = () => {
  const [formData, setFormData] = useState({
    taxaCessao: "",
    dataCarteira: "",
    potencialCessao: "",
    numeroSimulacoes: ""
  });

  const [cnabFiles, setCnabFiles] = useState<File[]>([]);
  const [nfFiles, setNfFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTransformarCnab = () => {
    if (cnabFiles.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione ao menos um arquivo CNAB para transformar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processando CNAB",
      description: `Transformando ${cnabFiles.length} arquivo(s) CNAB para formato Finaxis...`
    });
  };

  const handleUploadNF = () => {
    if (nfFiles.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione ao menos uma Nota Fiscal para enviar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Upload realizado",
      description: `${nfFiles.length} Nota(s) Fiscal(is) enviada(s) com sucesso.`
    });
  };

  const handleAplicarCriterios = () => {
    const requiredFields = ['taxaCessao', 'dataCarteira', 'potencialCessao', 'numeroSimulacoes'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos do formulário.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Critérios aplicados",
      description: "Análise de elegibilidade iniciada com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload de Arquivos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-eucalyptus-dark">Arquivos CNAB</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              title="Upload CNAB (400 ou 600)"
              acceptedTypes=".txt,.cnab"
              onFileSelect={setCnabFiles}
              multiple={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-eucalyptus-dark">Notas Fiscais</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              title="Upload Notas Fiscais"
              acceptedTypes=".pdf,.xml"
              onFileSelect={setNfFiles}
              multiple={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Configuração */}
      <Card>
        <CardHeader>
          <CardTitle className="text-eucalyptus-dark">Configuração da Simulação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="taxaCessao">Taxa de Cessão (%)</Label>
              <Input
                id="taxaCessao"
                type="number"
                step="0.01"
                placeholder="Ex: 2.5"
                value={formData.taxaCessao}
                onChange={(e) => handleInputChange('taxaCessao', e.target.value)}
                className="border-gray-300 focus:border-eucalyptus-dark"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataCarteira">Data da Carteira</Label>
              <Input
                id="dataCarteira"
                type="date"
                value={formData.dataCarteira}
                onChange={(e) => handleInputChange('dataCarteira', e.target.value)}
                className="border-gray-300 focus:border-eucalyptus-dark"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="potencialCessao">Potencial de Cessão (R$)</Label>
              <Input
                id="potencialCessao"
                type="number"
                placeholder="Ex: 1000000"
                value={formData.potencialCessao}
                onChange={(e) => handleInputChange('potencialCessao', e.target.value)}
                className="border-gray-300 focus:border-eucalyptus-dark"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numeroSimulacoes">Número de Simulações</Label>
              <Input
                id="numeroSimulacoes"
                type="number"
                min="1"
                placeholder="Ex: 3"
                value={formData.numeroSimulacoes}
                onChange={(e) => handleInputChange('numeroSimulacoes', e.target.value)}
                className="border-gray-300 focus:border-eucalyptus-dark"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-eucalyptus-dark">Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleTransformarCnab}
              className="bg-eucalyptus-dark hover:bg-cyan-800 text-white"
            >
              Transformar CNAB
            </Button>
            
            <Button
              onClick={handleUploadNF}
              variant="outline"
              className="border-eucalyptus-dark text-eucalyptus-dark hover:bg-eucalyptus-pale"
            >
              Enviar Notas Fiscais
            </Button>
            
            <Button
              onClick={handleAplicarCriterios}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Aplicar Critérios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvioDados;

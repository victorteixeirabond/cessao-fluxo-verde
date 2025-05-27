
import { useState } from "react";
import Layout from "../components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnvioDados from "../components/tabs/EnvioDados";
import AnaliseEstatistica from "../components/tabs/AnaliseEstatistica";
import ResultadosCriterios from "../components/tabs/ResultadosCriterios";
import Downloads from "../components/tabs/Downloads";

const Index = () => {
  const [activeTab, setActiveTab] = useState("envio-dados");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-eucalyptus-dark mb-2">
            Plataforma de Cessão FIDC
          </h1>
          <p className="text-gray-600">
            Sistema interno para análise e processamento de carteiras de recebíveis
          </p>
        </div>

        {/* Navegação por Abas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="envio-dados">
              Envio de Dados
            </TabsTrigger>
            <TabsTrigger value="analise-estatistica">
              Análise Estatística
            </TabsTrigger>
            <TabsTrigger value="resultados-criterios">
              Resultados de Critérios
            </TabsTrigger>
            <TabsTrigger value="downloads">
              Downloads
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="envio-dados" className="mt-0">
              <EnvioDados />
            </TabsContent>
            
            <TabsContent value="analise-estatistica" className="mt-0">
              <AnaliseEstatistica />
            </TabsContent>
            
            <TabsContent value="resultados-criterios" className="mt-0">
              <ResultadosCriterios />
            </TabsContent>
            
            <TabsContent value="downloads" className="mt-0">
              <Downloads />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;

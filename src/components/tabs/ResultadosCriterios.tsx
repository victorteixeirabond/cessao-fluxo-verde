
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const ResultadosCriterios = () => {
  // Dados simulados dos resultados
  const creditosAprovados = {
    quantidade: 1850,
    valor: 980000,
    percentage: 75.5
  };

  const creditosReprovados = {
    quantidade: 600,
    valor: 300000,
    percentage: 24.5
  };

  const motivosRecusa = [
    { motivo: "Prazo de vencimento superior a 180 dias", quantidade: 245, percentage: 40.8 },
    { motivo: "Rating do devedor inferior ao mínimo", quantidade: 156, percentage: 26.0 },
    { motivo: "Valor individual inferior ao limite", quantidade: 98, percentage: 16.3 },
    { motivo: "Concentração por devedor excedida", quantidade: 67, percentage: 11.2 },
    { motivo: "Outros critérios", quantidade: 34, percentage: 5.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Créditos Aprovados */}
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-700">Créditos Aprovados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-green-600">
                  {creditosAprovados.quantidade.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">títulos aprovados</p>
              </div>
              
              <div>
                <p className="text-2xl font-semibold text-green-600">
                  R$ {creditosAprovados.valor.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">valor total aprovado</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${creditosAprovados.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {creditosAprovados.percentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Créditos Reprovados */}
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <XCircle className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-700">Créditos Reprovados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-red-600">
                  {creditosReprovados.quantidade.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">títulos reprovados</p>
              </div>
              
              <div>
                <p className="text-2xl font-semibold text-red-600">
                  R$ {creditosReprovados.valor.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">valor total reprovado</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${creditosReprovados.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-red-600">
                  {creditosReprovados.percentage}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivos de Recusa */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <CardTitle className="text-eucalyptus-dark">Motivos de Recusa</CardTitle>
          </div>
          <p className="text-sm text-gray-600">
            Detalhamento dos critérios que resultaram na reprovação dos créditos
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {motivosRecusa.map((motivo, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 flex-1 pr-4">
                    {motivo.motivo}
                  </h4>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {motivo.quantidade} títulos
                    </p>
                    <p className="text-sm text-gray-600">
                      {motivo.percentage}% do total reprovado
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${motivo.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12">
                    {motivo.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumo Total */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total de Recusas:</span>
              <span className="font-bold text-red-600">
                {motivosRecusa.reduce((acc, curr) => acc + curr.quantidade, 0)} títulos
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Taxa de Aprovação</p>
            <p className="text-xl font-bold text-eucalyptus-dark">75.5%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Valor Médio Aprovado</p>
            <p className="text-xl font-bold text-eucalyptus-dark">R$ 530</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Concentração Máxima</p>
            <p className="text-xl font-bold text-eucalyptus-dark">8.5%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Prazo Médio Aprovado</p>
            <p className="text-xl font-bold text-eucalyptus-dark">98 dias</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultadosCriterios;

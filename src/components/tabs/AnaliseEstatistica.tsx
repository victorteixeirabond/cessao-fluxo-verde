
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AnaliseEstatistica = () => {
  const [selectedSimulation, setSelectedSimulation] = useState("1");

  // Dados simulados para os gráficos
  const valorPorVencimento = [
    { mes: "Jan", valor: 120000 },
    { mes: "Fev", valor: 98000 },
    { mes: "Mar", valor: 145000 },
    { mes: "Abr", valor: 167000 },
    { mes: "Mai", valor: 134000 },
    { mes: "Jun", valor: 189000 },
  ];

  const distribuicaoPorUF = [
    { uf: "SP", valor: 450000, percentage: 35 },
    { uf: "RJ", valor: 280000, percentage: 22 },
    { uf: "MG", valor: 190000, percentage: 15 },
    { uf: "RS", valor: 150000, percentage: 12 },
    { uf: "PR", valor: 120000, percentage: 9 },
    { uf: "Outros", valor: 90000, percentage: 7 },
  ];

  const COLORS = ['#166e63', '#a7e1c3', '#d1eae6', '#f5f5dc', '#6b7280', '#9ca3af'];

  return (
    <div className="space-y-6">
      {/* Seletor de Simulação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-eucalyptus-dark">Seleção de Simulação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-xs">
            <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
              <SelectTrigger className="border-gray-300 focus:border-eucalyptus-dark">
                <SelectValue placeholder="Escolha a simulação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Simulação 1</SelectItem>
                <SelectItem value="2">Simulação 2</SelectItem>
                <SelectItem value="3">Simulação 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Valor por Data de Vencimento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-eucalyptus-dark">Valor por Data de Vencimento</CardTitle>
            <p className="text-sm text-gray-600">Simulação {selectedSimulation}</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valorPorVencimento}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                    labelStyle={{ color: '#166e63' }}
                    contentStyle={{ 
                      backgroundColor: '#f8f9fa', 
                      border: '1px solid #d1eae6',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="#166e63"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Distribuição por UF */}
        <Card>
          <CardHeader>
            <CardTitle className="text-eucalyptus-dark">Distribuição por UF</CardTitle>
            <p className="text-sm text-gray-600">Simulação {selectedSimulation}</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicaoPorUF}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ uf, percentage }) => `${uf} (${percentage}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {distribuicaoPorUF.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                    contentStyle={{ 
                      backgroundColor: '#f8f9fa', 
                      border: '1px solid #d1eae6',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legenda personalizada */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {distribuicaoPorUF.map((item, index) => (
                <div key={item.uf} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-700">
                    {item.uf}: R$ {item.valor.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total da Carteira</p>
              <p className="text-2xl font-bold text-eucalyptus-dark">R$ 1.280.000</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Prazo Médio</p>
              <p className="text-2xl font-bold text-eucalyptus-dark">127 dias</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Quantidade de Títulos</p>
              <p className="text-2xl font-bold text-eucalyptus-dark">2.450</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnaliseEstatistica;


import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Users, 
  FileText,
  AlertCircle,
  CheckCircle 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
  const [userRole] = useState<"dirigeant" | "comptable" | "caissier">("dirigeant");

  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Fév", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 31000 },
    { month: "Avr", revenue: 61000, expenses: 38000 },
    { month: "Mai", revenue: 55000, expenses: 36000 },
    { month: "Jun", revenue: 67000, expenses: 42000 },
  ];

  const cashflowData = [
    { month: "Jan", inflow: 45000, outflow: 32000 },
    { month: "Fév", inflow: 52000, outflow: 35000 },
    { month: "Mar", inflow: 48000, outflow: 31000 },
    { month: "Avr", inflow: 61000, outflow: 38000 },
  ];

  if (userRole === "comptable") {
    return <ComptableDashboard />;
  }

  if (userRole === "caissier") {
    return <CaissierDashboard />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav userRole={userRole} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tableau de bord dirigeant
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Vue d'ensemble de votre entreprise - Entreprise Demo SARL
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€67,000</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5% vs mois dernier
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€42,000</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8.2% vs mois dernier
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trésorerie</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€25,000</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Situation saine
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Marge nette</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37.3%</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +2.1% vs mois dernier
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Évolution du chiffre d'affaires</CardTitle>
                <CardDescription>Revenus et dépenses des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flux de trésorerie</CardTitle>
                <CardDescription>Entrées et sorties d'argent</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inflow" fill="#10b981" />
                    <Bar dataKey="outflow" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Action Items and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Actions requises</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Déclaration TVA</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Échéance: 20 juillet 2024</p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    7 jours
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Facture en retard</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Client: ABC Corp - €3,500</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    En retard
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Révision comptable</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Planifiée avec votre comptable</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Planifié
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Statistiques équipe</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilisateurs actifs</span>
                    <span className="font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tâches complétées ce mois</span>
                    <span className="font-medium">47/52</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Factures traitées</span>
                    <span className="font-medium">156/160</span>
                  </div>
                  <Progress value={97} className="h-2" />
                </div>

                <div className="pt-4 space-y-2">
                  <p className="text-sm font-medium">Prochaines échéances</p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>• Déclaration sociale: 15 juillet</div>
                    <div>• Bilan annuel: 31 décembre</div>
                    <div>• Audit interne: 15 août</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comptable Dashboard Component
function ComptableDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav userRole="comptable" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tableau de bord comptable
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gestion des opérations comptables et conformité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Écritures en attente</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-orange-600">À valider aujourd'hui</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Rapprochements</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/5</div>
                <p className="text-xs text-green-600">Comptes rapprochés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Déclarations</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-red-600">En attente de soumission</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tâches comptables prioritaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Validation des factures fournisseurs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">8 factures à traiter</p>
                  </div>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Rapprochement bancaire Juin</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compte principal</p>
                  </div>
                  <Badge variant="outline">En cours</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Caissier Dashboard Component
function CaissierDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav userRole="caissier" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tableau de bord caissier
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gestion des encaissements et paiements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Encaissements aujourd'hui</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€2,450</div>
                <p className="text-xs text-green-600">+€350 vs hier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-orange-600">À traiter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Solde caisse</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€850</div>
                <p className="text-xs text-blue-600">Espèces disponibles</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Opérations récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Paiement facture F-2024-156</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client: Martin SARL</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+€1,200</p>
                    <p className="text-xs text-gray-500">Virement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Paiement fournisseur</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Electricité Bureau</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-€245</p>
                    <p className="text-xs text-gray-500">Prélèvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

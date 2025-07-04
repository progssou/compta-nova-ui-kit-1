
import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  CreditCard, 
  Brain, 
  Shield, 
  Globe, 
  Bell,
  Save,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Entreprise Demo SARL",
    siret: "12345678901234",
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    phone: "+33 1 23 45 67 89",
    email: "contact@entreprise-demo.fr"
  });

  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    autoBookkeeping: false,
    smartCategorization: true,
    anomaliesDetection: true,
    reportGeneration: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    dashboard: true,
    deadlines: true,
    anomalies: false,
    reports: true
  });

  const currentPlan = {
    name: "Pro",
    price: "29€/mois",
    users: "5 utilisateurs",
    features: ["IA avancée", "Multi-devises", "Rapports détaillés", "Support prioritaire"],
    nextBilling: "2024-08-04"
  };

  const handleSaveCompany = () => {
    toast.success("Informations de l'entreprise mises à jour");
  };

  const handleSaveAI = () => {
    toast.success("Paramètres IA mis à jour");
  };

  const handleSaveNotifications = () => {
    toast.success("Préférences de notification mises à jour");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav userRole="dirigeant" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Paramètres
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez les paramètres de votre entreprise et de votre compte
            </p>
          </div>

          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Entreprise</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Facturation</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Assistant IA</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>

            {/* Company Settings */}
            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de l'entreprise</CardTitle>
                  <CardDescription>
                    Gérez les informations principales de votre entreprise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nom de l'entreprise</Label>
                      <Input
                        id="companyName"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="siret">SIRET</Label>
                      <Input
                        id="siret"
                        value={companyInfo.siret}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, siret: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={companyInfo.city}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={companyInfo.postalCode}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, postalCode: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Select value={companyInfo.country} onValueChange={(value) => setCompanyInfo({ ...companyInfo, country: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Belgium">Belgique</SelectItem>
                          <SelectItem value="Switzerland">Suisse</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveCompany} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder les modifications</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plan actuel</CardTitle>
                  <CardDescription>
                    Gérez votre abonnement et vos factures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Plan {currentPlan.name}
                        </h3>
                        <Badge variant="default">Actuel</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {currentPlan.price} • {currentPlan.users}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentPlan.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Prochaine facturation
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {currentPlan.nextBilling}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Besoin de plus de fonctionnalités ?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Passez au plan Premium pour plus d'utilisateurs et de fonctionnalités avancées
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">Voir les plans</Button>
                      <Button>Upgrader</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historique des factures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "2024-07-04", amount: "29,00 €", status: "Payée" },
                      { date: "2024-06-04", amount: "29,00 €", status: "Payée" },
                      { date: "2024-05-04", amount: "29,00 €", status: "Payée" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Facture du {invoice.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Plan Pro</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{invoice.amount}</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {invoice.status}
                          </Badge>
                          <Button variant="ghost" size="sm">Télécharger</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Settings */}
            <TabsContent value="ai" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>Assistant IA ComptaNova</span>
                  </CardTitle>
                  <CardDescription>
                    Configurez les fonctionnalités d'intelligence artificielle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Activer l'assistant IA</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Active ou désactive toutes les fonctionnalités IA
                      </p>
                    </div>
                    <Switch
                      checked={aiSettings.enabled}
                      onCheckedChange={(checked) => setAiSettings({ ...aiSettings, enabled: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Fonctionnalités IA spécifiques</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Comptabilisation automatique</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            L'IA propose automatiquement les écritures comptables
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.autoBookkeeping}
                          onCheckedChange={(checked) => setAiSettings({ ...aiSettings, autoBookkeeping: checked })}
                          disabled={!aiSettings.enabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Catégorisation intelligente</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Classification automatique des transactions
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.smartCategorization}
                          onCheckedChange={(checked) => setAiSettings({ ...aiSettings, smartCategorization: checked })}
                          disabled={!aiSettings.enabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Détection d'anomalies</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Identification automatique des transactions suspectes
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.anomaliesDetection}
                          onCheckedChange={(checked) => setAiSettings({ ...aiSettings, anomaliesDetection: checked })}
                          disabled={!aiSettings.enabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Génération de rapports IA</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rapports avec insights et recommandations
                          </p>
                        </div>
                        <Switch
                          checked={aiSettings.reportGeneration}
                          onCheckedChange={(checked) => setAiSettings({ ...aiSettings, reportGeneration: checked })}
                          disabled={!aiSettings.enabled}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h5 className="font-medium text-blue-900 dark:text-blue-100">
                          À propos de l'IA
                        </h5>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                          L'assistant IA utilise vos données historiques pour améliorer ses suggestions. 
                          Toutes les données restent chiffrées et sécurisées.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveAI} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder les paramètres IA</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Choisissez comment et quand vous souhaitez être notifié
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Canaux de notification</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications par email</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Recevoir les notifications importantes par email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notifications dans l'app</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Afficher les notifications dans le tableau de bord
                        </p>
                      </div>
                      <Switch
                        checked={notifications.dashboard}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, dashboard: checked })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Types de notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Échéances importantes</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Déclarations, paiements, dates limites
                        </p>
                      </div>
                      <Switch
                        checked={notifications.deadlines}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, deadlines: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Détection d'anomalies</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Transactions inhabituelles détectées par l'IA
                        </p>
                      </div>
                      <Switch
                        checked={notifications.anomalies}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, anomalies: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Rapports générés</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Nouveaux rapports et analyses disponibles
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reports}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, reports: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder les préférences</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;

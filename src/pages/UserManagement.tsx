
import { useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Shield, 
  Users,
  Crown,
  Calculator,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@entreprise.com",
      role: "dirigeant" as const,
      status: "active",
      lastLogin: "2024-07-04",
      inviteDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@entreprise.com",
      role: "comptable" as const,
      status: "active",
      lastLogin: "2024-07-03",
      inviteDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Pierre Durand",
      email: "pierre.durand@entreprise.com",
      role: "caissier" as const,
      status: "pending",
      lastLogin: null,
      inviteDate: "2024-07-01"
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "comptable" as const
  });

  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const roleConfig = {
    dirigeant: {
      label: "Dirigeant",
      icon: Crown,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      description: "Accès complet à toutes les fonctionnalités"
    },
    comptable: {
      label: "Comptable",
      icon: Calculator,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      description: "Gestion comptable et rapports"
    },
    caissier: {
      label: "Caissier",
      icon: CreditCard,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      description: "Gestion des encaissements et paiements"
    }
  };

  const handleInviteUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newUserData = {
      id: users.length + 1,
      ...newUser,
      status: "pending" as const,
      lastLogin: null,
      inviteDate: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: "", email: "", role: "comptable" });
    setIsInviteOpen(false);
    toast.success(`Invitation envoyée à ${newUser.email}`);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("Utilisateur supprimé");
  };

  const currentPlan = "Pro"; // This would come from your plan management
  const maxUsers = currentPlan === "Gratuit" ? 1 : currentPlan === "Pro" ? 5 : Infinity;
  const activeUsers = users.filter(u => u.status === "active").length;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav userRole="dirigeant" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Gestion des utilisateurs
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Gérez les accès et permissions de votre équipe
              </p>
            </div>
            
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Inviter un utilisateur</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inviter un nouvel utilisateur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="jean.dupont@entreprise.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comptable">Comptable</SelectItem>
                        <SelectItem value="caissier">Caissier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleInviteUser}>
                      Envoyer l'invitation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Plan Usage */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Utilisation du plan {currentPlan}</span>
              </CardTitle>
              <CardDescription>
                {activeUsers} / {maxUsers === Infinity ? "∞" : maxUsers} utilisateurs actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${maxUsers === Infinity ? 20 : (activeUsers / maxUsers) * 100}%` }}
                  />
                </div>
                {maxUsers !== Infinity && activeUsers >= maxUsers && (
                  <Badge variant="destructive">Limite atteinte</Badge>
                )}
              </div>
              {maxUsers !== Infinity && activeUsers >= maxUsers * 0.8 && (
                <p className="text-sm text-orange-600 mt-2">
                  Vous approchez de la limite. 
                  <Button variant="link" className="p-0 h-auto ml-1 text-orange-600">
                    Upgrader votre plan
                  </Button>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Users List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Tous les utilisateurs ({users.length})</TabsTrigger>
              <TabsTrigger value="active">Actifs ({users.filter(u => u.status === "active").length})</TabsTrigger>
              <TabsTrigger value="pending">En attente ({users.filter(u => u.status === "pending").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <UsersList users={users} onDelete={handleDeleteUser} roleConfig={roleConfig} />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <UsersList 
                users={users.filter(u => u.status === "active")} 
                onDelete={handleDeleteUser} 
                roleConfig={roleConfig} 
              />
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <UsersList 
                users={users.filter(u => u.status === "pending")} 
                onDelete={handleDeleteUser} 
                roleConfig={roleConfig} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

function UsersList({ 
  users, 
  onDelete, 
  roleConfig 
}: { 
  users: any[], 
  onDelete: (id: number) => void,
  roleConfig: any 
}) {
  return (
    <div className="space-y-4">
      {users.map((user) => {
        const role = roleConfig[user.role];
        const RoleIcon = role.icon;
        
        return (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <Badge className={role.color}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {role.label}
                      </Badge>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Actif" : "En attente"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      {user.lastLogin && (
                        <span>Dernière connexion: {user.lastLogin}</span>
                      )}
                      <span>Invité le: {user.inviteDate}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {role.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {user.status === "pending" && (
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Renvoyer
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  {user.role !== "dirigeant" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {users.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucun utilisateur
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Aucun utilisateur ne correspond aux critères sélectionnés.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UserManagement;

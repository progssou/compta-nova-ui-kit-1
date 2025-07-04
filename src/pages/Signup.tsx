
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    country: "France"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Compte créé avec succès !");
    navigate("/dashboard");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CN</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ComptaNova</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Créer votre compte dirigeant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Démarrez votre essai gratuit en quelques minutes
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              En tant que dirigeant, vous aurez accès à toutes les fonctionnalités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <Separator />

              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Informations de l'entreprise
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Commerce de détail</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="manufacturing">Industrie</SelectItem>
                        <SelectItem value="tech">Technologie</SelectItem>
                        <SelectItem value="consulting">Conseil</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
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
              </div>

              <div className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" size="lg">
                  Créer mon compte dirigeant
                </Button>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Déjà un compte ?{" "}
                  <Link to="/dashboard" className="text-blue-600 hover:text-blue-500 font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mt-6">
          En créant un compte, vous acceptez nos{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">conditions d'utilisation</a>
          {" "}et notre{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">politique de confidentialité</a>.
        </p>
      </div>
    </div>
  );
};

export default Signup;

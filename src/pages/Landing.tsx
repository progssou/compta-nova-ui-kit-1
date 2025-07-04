
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Brain, Globe, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "Automatisation intelligente de la comptabilité avec IA"
    },
    {
      icon: Globe,
      title: "Multi-devises",
      description: "Gestion des devises multiples et conformité locale"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Chiffrement de niveau bancaire et conformité RGPD"
    },
    {
      icon: Zap,
      title: "Temps réel",
      description: "Tableaux de bord en temps réel et rapports instantanés"
    }
  ];

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour débuter",
      features: [
        "1 utilisateur",
        "Comptabilité de base",
        "Tableau de bord simple",
        "Support par email"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      description: "Pour les PME en croissance",
      features: [
        "5 utilisateurs",
        "IA avancée",
        "Multi-devises",
        "Rapports détaillés",
        "Support prioritaire"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "99€",
      period: "/mois",
      description: "Pour les grandes entreprises",
      features: [
        "Utilisateurs illimités",
        "IA personnalisée",
        "API complète",
        "Conformité avancée",
        "Support dédié"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ComptaNova</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link to="/dashboard">Connexion</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Commencer</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            🚀 Nouveau : Assistant IA intégré
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            La comptabilité
            <span className="text-blue-600"> intelligente</span>
            <br />
            pour votre entreprise
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            ComptaNova révolutionne la gestion financière des PME avec une plateforme 
            tout-en-un alimentée par l'IA, multi-devises et conforme aux réglementations locales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link to="/signup">Essayer gratuitement</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi choisir ComptaNova ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Une solution complète qui s'adapte à vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tarifs transparents
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choisissez le plan qui correspond à votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Plus populaire
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-300">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/signup">Commencer</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="text-xl font-bold">ComptaNova</span>
            </div>
            <div className="text-gray-400">
              © 2024 ComptaNova. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

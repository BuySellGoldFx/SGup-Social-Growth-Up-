"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Zap, Shield, Clock, Users, Star, Check, Instagram, Youtube, TrendingUp, Cpu, Award, Target, Globe, DollarSign, ShoppingCart } from "lucide-react"
import { CurrencySelector, PriceDisplay } from "@/components/CurrencySelector"
import { PricingTiers } from "@/components/PricingTiers"
import { ROICalculator } from "@/components/ROICalculator"
import { Testimonials } from "@/components/Testimonials"
import { FAQ } from "@/components/FAQ"
import { ComparisonTable } from "@/components/ComparisonTable"
import { OrderForm } from "@/components/OrderForm"
import { PLATFORM_TIERS } from "@/hooks/useCurrency"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <ArrowUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SGup
            </span>
            <Badge variant="secondary" className="ml-2">Social Growth Up</Badge>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Serviços</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
            <a href="#ai" className="text-gray-600 hover:text-gray-900 transition-colors">IA</a>
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
            <CurrencySelector />
          </nav>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" asChild>
            <a href="/checkout?tier=Basico&platform=instagram&price=16.90&total=16.90">
              Começar Agora
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            <Globe className="w-3 h-3 mr-1" />
            Preços internacionais 60% mais baixos que RiseKarma
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Cresça nas redes sociais com IA superior
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            O SGup oferece o melhor algoritmo de IA do mercado para crescimento orgânico no Instagram, TikTok e YouTube.
            <strong> Preços globais em CHF</strong> com conversão automática para sua moeda local e <strong>qualidade superior</strong> garantida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8" asChild>
              <ahref="/checkout?tier=Influencer&platform=instagram&price=99.90&total=99.90">
                <Users className="w-5 h-5 mr-2" />
                Ganhar Seguidores Agora
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/dashboard">
                <Star className="w-5 h-5 mr-2" />
                Acessar Dashboard
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2M+</div>
              <div className="text-gray-600">Seguidores entregues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Taxa de retenção</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">24h</div>
              <div className="text-gray-600">Entrega garantida</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15k+</div>
              <div className="text-gray-600">Clientes satisfeitos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Serviços para Todas as Plataformas</h2>
            <p className="text-xl text-gray-600">Cresça onde seus clientes estão</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instagram */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Instagram</CardTitle>
                <CardDescription>Seguidores reais e engajamento orgânico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Seguidores brasileiros reais
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Curtidas e comentários orgânicos
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Stories views e saves
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Targeting por nicho e localização
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600 mb-2">5 Escalões Disponíveis</div>
                    <div className="text-sm text-gray-600 mb-3">
                      De {PLATFORM_TIERS.instagram[0].minFollowers.toLocaleString()} a {PLATFORM_TIERS.instagram[4].maxFollowers.toLocaleString()} seguidores
                    </div>
                  </div>
                  <PriceDisplay
                    chfPrice={PLATFORM_TIERS.instagram[0].price}
                    showComparison={true}
                  />
                  <div className="text-xs text-gray-500 text-center">
                    Básico: {PLATFORM_TIERS.instagram[0].minFollowers.toLocaleString()}-{PLATFORM_TIERS.instagram[0].maxFollowers.toLocaleString()} •
                    Expert: até {PLATFORM_TIERS.instagram[4].maxFollowers.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>{/* TikTok */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-black to-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-white font-bold text-lg">TT</div>
                </div>
                <CardTitle className="text-2xl">TikTok</CardTitle>
                <CardDescription>Viralização inteligente e seguidores engajados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Seguidores ativos e reais
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Likes e compartilhamentos orgânicos
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Visualizações de alta qualidade
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Algoritmo otimizado para viralização
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-black mb-2">5 Escalões Disponíveis</div>
                    <div className="text-sm text-gray-600 mb-3">
                      De {PLATFORM_TIERS.tiktok[0].minFollowers.toLocaleString()} a {PLATFORM_TIERS.tiktok[4].maxFollowers.toLocaleString()} seguidores
                    </div>
                  </div>
                  <PriceDisplay
                    chfPrice={PLATFORM_TIERS.tiktok[0].price}
                    showComparison={true}
                  />
                  <div className="text-xs text-gray-500 text-center">
                    Básico: {PLATFORM_TIERS.tiktok[0].minFollowers.toLocaleString()}-{PLATFORM_TIERS.tiktok[0].maxFollowers.toLocaleString()} •
                    Expert: até {PLATFORM_TIERS.tiktok[4].maxFollowers.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Youtube className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">YouTube</CardTitle>
                <CardDescription>Crescimento sustentável e monetização</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Inscritos genuínos e ativos
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Visualizações com tempo de retenção
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Likes e comentários relevantes
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Otimização para monetização
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600 mb-2">5 Escalões Disponíveis</div>
                    <div className="text-sm text-gray-600 mb-3">
                      De {PLATFORM_TIERS.youtube[0].minFollowers.toLocaleString()} a {PLATFORM_TIERS.youtube[4].minFollowers.toLocaleString()} inscritos
                    </div>
                  </div>
                  <PriceDisplay
                    chfPrice={PLATFORM_TIERS.youtube[0].price}
                    showComparison={true}
                  />
                  <div className="text-xs text-gray-500 text-center">
                    Básico: {PLATFORM_TIERS.youtube[0].minFollowers.toLocaleString()} •
                    Expert: {PLATFORM_TIERS.youtube[4].minFollowers.toLocaleString()} inscritos
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>{/* Currency Information Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Globe className="w-3 h-3 mr-1" />
              Preços Globais
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Preços em CHF com Conversão Automática</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossos preços são baseados no Franco Suíço (CHF) e convertidos automaticamente para sua moeda local
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-3">🇨🇭</div>
                <h3 className="font-semibold mb-2">Base em CHF</h3>
                <p className="text-sm text-gray-600">
                  Preços estáveis em Franco Suíço, uma das moedas mais confiáveis do mundo
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-semibold mb-2">Conversão Automática</h3>
                <p className="text-sm text-gray-600">
                  Detectamos seu país e convertemos os preços para sua moeda local automaticamente
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-3">💱</div>
                <h3 className="font-semibold mb-2">10+ Moedas</h3>
                <p className="text-sm text-gray-600">
                  Suportamos USD, EUR, BRL, GBP, CAD, AUD, JPY, MXN, ARS e mais
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              <DollarSign className="w-3 h-3 mr-1" />
              Preços Transparentes
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Escolha o Escalão Perfeito</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 escalões profissionais para cada plataforma. De iniciantes a influencers experientes,
              temos o pacote ideal para seu crescimento.
            </p>
          </div>

          <PricingTiers />
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* Order Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <ShoppingCart className="w-3 h-3 mr-1" />
              Fazer Pedido
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Comece seu Crescimento Agora</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Configure seu pacote personalizado e veja os resultados em horas, não dias
            </p>
          </div>

          <OrderForm />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />{/* AI Technology Section */}
      <section id="ai" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Cpu className="w-3 h-3 mr-1" />
              Tecnologia de Ponta
            </Badge>
            <h2 className="text-4xl font-bold mb-4">IA de Alto Padrão SGup</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa inteligência artificial supera a concorrência com algoritmos próprios e targeting ultra-preciso
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Targeting Ultra-Preciso</h3>
                    <p className="text-gray-600">
                      Nossa IA analisa 500+ pontos de dados para encontrar o público perfeito para seu nicho
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Crescimento Orgânico</h3>
                    <p className="text-gray-600">
                      Algoritmo proprietário que simula interações humanas reais com 99.8% de precisão
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
                    <p className="text-gray-600">
                      Proteção total contra detecção e banimentos. Compliance com todas as políticas das plataformas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Entrega em 24h</h3>
                    <p className="text-gray-600">
                      Resultados visíveis em menos de 24 horas com crescimento sustentável a longo prazo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl inline-block mb-6">
                  <Cpu className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">SGup AI vs Concorrência</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-sm">Precisão do targeting</span>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold mr-2">98.5%</span>
                      <Badge className="bg-green-100 text-green-800">SGup</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-sm">RiseKarma</span>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-semibold mr-2">84.2%</span>
                      <Badge variant="secondary">Concorrente</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-sm">Tempo de entrega</span>
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold mr-2">&lt; 24h</span>
                      <Badge className="bg-green-100 text-green-800">SGup</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-sm">RiseKarma</span>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-semibold mr-2">3-7 dias</span>
                      <Badge variant="secondary">Concorrente</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para crescer com IA superior?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão crescendo mais rápido e gastando menos com o SGup
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 text-lg px-8">
              <Award className="w-5 h-5 mr-2" />
              Começar Agora - Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8">
              Falar com Especialista
            </Button>
          </div>

          <div className="mt-8 text-purple-100 text-sm">
            ✅ Sem taxas de setup • ✅ Garantia de 30 dias • ✅ Suporte 24/7
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <ArrowUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SGup</span>
              </div>
              <p className="text-gray-400">
                A plataforma de crescimento de redes sociais mais avançada e econômica do Brasil.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Instagram Growth</li>
                <li>TikTok Growth</li>
                <li>YouTube Growth</li>
                <li>Consultoria IA</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre nós</li>
                <li>Casos de sucesso</li>
                <li>Blog</li>
                <li>Carreira</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de ajuda</li>
                <li>Contato</li>
                <li>WhatsApp 24/7</li>
                <li>Status do sistema</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SGup - Social Growth Up. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

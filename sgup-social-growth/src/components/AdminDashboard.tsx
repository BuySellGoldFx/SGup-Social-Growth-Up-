"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  Download,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Globe
} from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'

interface AdminOrder {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  tier: string
  status: 'pending' | 'processing' | 'active' | 'completed' | 'paused' | 'cancelled'
  progress: number
  startDate: string
  estimatedCompletion: string
  targetFollowers: number
  currentFollowers: number
  initialFollowers: number
  amount: number
  paymentMethod: string
  transactionId: string
  country: string
  lastUpdate: string
}

interface AdminStats {
  totalOrders: number
  activeOrders: number
  completedOrders: number
  totalRevenue: number
  totalCustomers: number
  avgOrderValue: number
  completionRate: number
  dailyRevenue: number
}

// Mock admin data
const MOCK_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'SGU-2024-001',
    customerId: 'CUST-001',
    customerName: 'Ana Carolina Silva',
    customerEmail: 'ana@email.com',
    customerPhone: '+55 11 99999-9999',
    platform: 'instagram',
    tier: 'Influencer',
    status: 'active',
    progress: 75,
    startDate: '2024-11-28',
    estimatedCompletion: '2 dias',
    targetFollowers: 10000,
    currentFollowers: 8500,
    initialFollowers: 3200,
    amount: 99.90,
    paymentMethod: 'Stripe',
    transactionId: 'pi_1ABC123',
    country: 'Brazil',
    lastUpdate: '2024-12-01 14:30'
  },
  {
    id: 'SGU-2024-002',
    customerId: 'CUST-002',
    customerName: 'Felipe Workout',
    customerEmail: 'felipe@email.com',
    customerPhone: '+55 21 88888-8888',
    platform: 'tiktok',
    tier: 'Profissional',
    status: 'completed',
    progress: 100,
    startDate: '2024-11-15',
    estimatedCompletion: 'Concluído',
    targetFollowers: 20000,
    currentFollowers: 20000,
    initialFollowers: 8500,
    amount: 229.90,
    paymentMethod: 'PayPal',
    transactionId: 'paypal_2XYZ789',
    country: 'Brazil',
    lastUpdate: '2024-11-25 09:15'
  },
  {
    id: 'SGU-2024-003',
    customerId: 'CUST-003',
    customerName: 'Marina Culinária',
    customerEmail: 'marina@email.com',
    customerPhone: '+41 79 123 45 67',
    platform: 'youtube',
    tier: 'Expert',
    status: 'processing',
    progress: 25,
    startDate: '2024-12-01',
    estimatedCompletion: '5 dias',
    targetFollowers: 5000,
    currentFollowers: 1750,
    initialFollowers: 1200,
    amount: 459.90,
    paymentMethod: 'Stripe',
    transactionId: 'pi_2DEF456',
    country: 'Switzerland',
    lastUpdate: '2024-12-01 16:45'
  }
]

const MOCK_ADMIN_STATS: AdminStats = {
  totalOrders: 156,
  activeOrders: 23,
  completedOrders: 124,
  totalRevenue: 45789.50,
  totalCustomers: 134,
  avgOrderValue: 293.52,
  completionRate: 98.1,
  dailyRevenue: 1247.80
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  paused: 'bg-orange-100 text-orange-800',
  cancelled: 'bg-red-100 text-red-800'
}

const STATUS_LABELS = {
  pending: 'Pendente',
  processing: 'Processando',
  active: 'Ativo',
  completed: 'Concluído',
  paused: 'Pausado',
  cancelled: 'Cancelado'
}

const PLATFORM_ICONS = {
  instagram: '📷',
  tiktok: '🎵',
  youtube: '📺'
}

export function AdminDashboard() {
  const { formatPrice } = useCurrency()
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [platformFilter, setPlatformFilter] = useState<string>('all')

  const filteredOrders = MOCK_ADMIN_ORDERS.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || order.platform === platformFilter

    return matchesSearch && matchesStatus && matchesPlatform
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    // In real app, this would call API
  }

  const sendCustomEmail = (customerEmail: string) => {
    console.log(`Sending email to: ${customerEmail}`)
    // In real app, this would open email composer
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Gerenciamento de pedidos e clientes SGup</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(MOCK_ADMIN_STATS.totalRevenue)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pedidos Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {MOCK_ADMIN_STATS.activeOrders}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {MOCK_ADMIN_STATS.totalCustomers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Sucesso</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {MOCK_ADMIN_STATS.completionRate}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Gerenciar Pedidos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filtros e Busca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Buscar</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nome, email ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="processing">Processando</SelectItem>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="paused">Pausado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Plataforma</Label>
                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Plataformas</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ações</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Orders List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedOrder?.id === order.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {PLATFORM_ICONS[order.platform]}
                          </div>
                          <div>
                            <div className="font-semibold">{order.customerName}</div>
                            <div className="text-sm text-gray-600">{order.customerEmail}</div>
                            <div className="text-xs text-gray-500">{order.id}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge className={STATUS_COLORS[order.status]}>
                            {STATUS_LABELS[order.status]}
                          </Badge>
                          <div className="text-sm font-semibold text-green-600 mt-1">
                            {formatPrice(order.amount)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {order.tier} - {order.platform.charAt(0).toUpperCase() + order.platform.slice(1)}
                          </span>
                          <span className="font-medium">{order.progress}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <div className="text-gray-600">Inicial</div>
                            <div className="font-medium">{order.initialFollowers.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Atual</div>
                            <div className="font-medium">{order.currentFollowers.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Meta</div>
                            <div className="font-medium">{order.targetFollowers.toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t text-xs">
                          <div>
                            <span className="text-gray-600">Última atualização: </span>
                            <span className="font-medium">{order.lastUpdate}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={(e) => {
                              e.stopPropagation()
                              sendCustomEmail(order.customerEmail)
                            }}>
                              <Mail className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Details Panel */}
              <div>
                {selectedOrder ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Detalhes do Pedido
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl mb-3">
                          {PLATFORM_ICONS[selectedOrder.platform]}
                        </div>
                        <h3 className="font-semibold text-lg">{selectedOrder.customerName}</h3>
                        <p className="text-gray-600 text-sm">{selectedOrder.customerEmail}</p>
                        <Badge className={STATUS_COLORS[selectedOrder.status]} >
                          {STATUS_LABELS[selectedOrder.status]}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID do Pedido</span>
                          <span className="font-medium">{selectedOrder.id}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Cliente ID</span>
                          <span className="font-medium">{selectedOrder.customerId}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Telefone</span>
                          <span className="font-medium">{selectedOrder.customerPhone}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">País</span>
                          <span className="font-medium">{selectedOrder.country}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Escalão</span>
                          <span className="font-medium">{selectedOrder.tier}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Valor Pago</span>
                          <span className="font-medium text-green-600">{formatPrice(selectedOrder.amount)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Pagamento</span>
                          <span className="font-medium">{selectedOrder.paymentMethod}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Transação ID</span>
                          <span className="font-mono text-xs">{selectedOrder.transactionId}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Data Início</span>
                          <span className="font-medium">{selectedOrder.startDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimativa</span>
                          <span className="font-medium">{selectedOrder.estimatedCompletion}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Alterar Status</Label>
                        <Select
                          value={selectedOrder.status}
                          onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="processing">Processando</SelectItem>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="completed">Concluído</SelectItem>
                            <SelectItem value="paused">Pausado</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar Email
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Relatório Detalhado
                        </Button>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => {
                          if (selectedOrder.status === 'active') {
                            updateOrderStatus(selectedOrder.id, 'paused')
                          } else if (selectedOrder.status === 'paused') {
                            updateOrderStatus(selectedOrder.id, 'active')
                          }
                        }}>
                          {selectedOrder.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pausar Serviço
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Retomar Serviço
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Selecione um pedido para ver os detalhes
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Clientes</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os clientes da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Gestão de Clientes</h3>
                  <p className="text-gray-600 mb-6">
                    Funcionalidade completa para gerenciar base de clientes
                  </p>
                  <Button>
                    Implementar Gestão de Clientes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Administrativo</CardTitle>
                <CardDescription>
                  Métricas detalhadas de negócio e performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Avançado</h3>
                  <p className="text-gray-600 mb-6">
                    Dashboards interativos com métricas de receita, crescimento e performance
                  </p>
                  <Button>
                    Acessar Analytics Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Configurações administrativas e do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Configurações Admin</h3>
                  <p className="text-gray-600 mb-6">
                    Painel de configurações para preços, integrações e sistema
                  </p>
                  <Button>
                    Acessar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

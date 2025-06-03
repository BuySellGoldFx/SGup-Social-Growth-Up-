"use client"

import { useState, useEffect } from 'react'
import { AdminDashboard } from '@/components/AdminDashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  Lock,
  Download,
  Upload,
  Settings,
  Activity,
  Database,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react'
import { backupSystem, getBackupList, createManualBackup, getSystemLogs } from '@/lib/backup'
import type { BackupData, ActivityLog, User } from '@/types'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [backups, setBackups] = useState<BackupData[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock admin user
  const adminUser: User = {
    id: 'admin-001',
    name: 'Administrador SGup',
    email: 'admin@sgup.com',
    plan: 'Expert',
    verified: true,
    joinDate: '2024-01-01',
    country: 'Switzerland'
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadBackups()
      loadLogs()
    }
  }, [isAuthenticated])

  const handleAdminLogin = async () => {
    setIsLoading(true)
    setAuthError('')

    try {
      const isValid = await backupSystem.validateAdminPassword(adminPassword)

      if (isValid) {
        setIsAuthenticated(true)
        await backupSystem.logActivity('ADMIN', 'ADMIN_LOGIN', 'Login administrativo realizado', '127.0.0.1', true)
      } else {
        setAuthError('Senha administrativa incorreta')
        await backupSystem.logActivity('ADMIN', 'ADMIN_LOGIN_FAILED', 'Tentativa de login admin com senha incorreta', '127.0.0.1', false)
      }
    } catch (error) {
      setAuthError('Erro ao validar credenciais')
    } finally {
      setIsLoading(false)
    }
  }

  const loadBackups = async () => {
    try {
      const backupList = await getBackupList()
      setBackups(backupList)
    } catch (error) {
      console.error('Erro ao carregar backups:', error)
    }
  }

  const loadLogs = async () => {
    try {
      const logList = await getSystemLogs(50)
      setLogs(logList)
    } catch (error) {
      console.error('Erro ao carregar logs:', error)
    }
  }

  const handleCreateBackup = async () => {
    setIsLoading(true)
    try {
      await createManualBackup('Backup manual via admin dashboard', 'ADMIN')
      await loadBackups()
      alert('Backup criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar backup')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestoreBackup = async (backupId: string) => {
    if (!confirm('Tem certeza que deseja restaurar este backup? Esta ação é irreversível.')) {
      return
    }

    setIsLoading(true)
    try {
      const success = await backupSystem.restoreBackup(backupId, adminPassword, 'ADMIN')
      if (success) {
        alert('Backup restaurado com sucesso!')
        window.location.reload()
      } else {
        alert('Erro ao restaurar backup')
      }
    } catch (error) {
      alert('Erro ao restaurar backup')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async (format: 'json' | 'csv') => {
    setIsLoading(true)
    try {
      const exportPath = await backupSystem.exportData(format, adminPassword, 'ADMIN')
      if (exportPath) {
        alert(`Dados exportados com sucesso: ${exportPath}`)
      } else {
        alert('Erro ao exportar dados')
      }
    } catch (error) {
      alert('Erro ao exportar dados')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
            <CardDescription>
              Digite a senha administrativa para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-700 text-sm">{authError}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="admin-password">Senha Administrativa</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Digite a senha administrativa"
                  className="pr-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleAdminLogin}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              disabled={isLoading || !adminPassword}
            >
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? 'Validando...' : 'Acessar Dashboard'}
            </Button>

            <div className="text-center text-xs text-gray-500">
              🔒 Acesso restrito apenas a administradores autorizados
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">SGup Admin Panel</h1>
                <p className="text-red-100">Bem-vindo, {adminUser.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Sistema Ativo
              </Badge>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600"
                onClick={() => setIsAuthenticated(false)}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard Principal</TabsTrigger>
            <TabsTrigger value="backup">Sistema de Backup</TabsTrigger>
            <TabsTrigger value="logs">Logs de Atividade</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Main Dashboard */}
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          {/* Backup System */}
          <TabsContent value="backup" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Criar Backup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleCreateBackup}
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Criar Backup Manual
                  </Button>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => handleExportData('json')}
                      className="w-full"
                      disabled={isLoading}
                    >
                      Exportar JSON
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleExportData('csv')}
                      className="w-full"
                      disabled={isLoading}
                    >
                      Exportar CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Backups Disponíveis</CardTitle>
                  <CardDescription>
                    Lista de todos os backups do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {backups.map((backup) => (
                      <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{backup.description}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(backup.timestamp).toLocaleString()} •
                            <Badge variant="outline" className="ml-2">
                              {backup.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">
                            Tamanho: {(backup.size / 1024).toFixed(2)} KB • Criador: {backup.creator}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestoreBackup(backup.id)}
                            disabled={isLoading}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Restaurar
                          </Button>
                        </div>
                      </div>
                    ))}

                    {backups.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum backup encontrado
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Logs */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Logs de Atividade do Sistema
                </CardTitle>
                <CardDescription>
                  Registro de todas as atividades administrativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-gray-600">{log.details}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString()} • {log.user} • {log.ipAddress}
                          </div>
                        </div>
                      </div>
                      <Badge variant={log.success ? "default" : "destructive"}>
                        {log.success ? 'Sucesso' : 'Falha'}
                      </Badge>
                    </div>
                  ))}

                  {logs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum log encontrado
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações do Sistema
                </CardTitle>
                <CardDescription>
                  Configurações de segurança e sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Configurações Avançadas</h3>
                  <p className="text-gray-600 mb-6">
                    Painel para configurar preços, integrações, segurança e mais
                  </p>
                  <Button>
                    Implementar Configurações Avançadas
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

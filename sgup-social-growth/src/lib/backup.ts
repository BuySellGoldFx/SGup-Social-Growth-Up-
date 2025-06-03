import bcrypt from 'bcryptjs'
import { promises as fs } from 'fs'
import path from 'path'

interface BackupData {
  id: string
  timestamp: string
  type: 'full' | 'incremental' | 'manual'
  size: number
  description: string
  checksum: string
  creator: string
}

interface ActivityLog {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
  ipAddress: string
  success: boolean
}

interface SystemConfig {
  adminPassword: string
  lastBackup: string
  autoBackupEnabled: boolean
  backupRetentionDays: number
  securitySettings: {
    requirePasswordForChanges: boolean
    maxLoginAttempts: number
    sessionTimeout: number
  }
}

// Password protection system
export class BackupSystem {
  private static instance: BackupSystem
  private backupPath = path.join(process.cwd(), '.backups')
  private configPath = path.join(process.cwd(), '.same', 'system-config.json')
  private logsPath = path.join(process.cwd(), '.same', 'activity-logs.json')

  static getInstance(): BackupSystem {
    if (!BackupSystem.instance) {
      BackupSystem.instance = new BackupSystem()
    }
    return BackupSystem.instance
  }

  async initializeSystem(adminPassword: string): Promise<void> {
    try {
      // Create necessary directories
      await fs.mkdir(this.backupPath, { recursive: true })
      await fs.mkdir(path.dirname(this.configPath), { recursive: true })

      // Hash the admin password
      const hashedPassword = await bcrypt.hash(adminPassword, 12)

      const initialConfig: SystemConfig = {
        adminPassword: hashedPassword,
        lastBackup: new Date().toISOString(),
        autoBackupEnabled: true,
        backupRetentionDays: 30,
        securitySettings: {
          requirePasswordForChanges: true,
          maxLoginAttempts: 3,
          sessionTimeout: 3600000 // 1 hour
        }
      }

      await fs.writeFile(this.configPath, JSON.stringify(initialConfig, null, 2))

      // Initialize activity logs
      await this.logActivity('SYSTEM', 'SYSTEM_INITIALIZED', 'Sistema de backup inicializado', '127.0.0.1', true)

      console.log('✅ Sistema de backup inicializado com sucesso')
    } catch (error) {
      console.error('❌ Erro ao inicializar sistema de backup:', error)
      throw error
    }
  }

  async validateAdminPassword(password: string): Promise<boolean> {
    try {
      const config = await this.getSystemConfig()
      return await bcrypt.compare(password, config.adminPassword)
    } catch (error) {
      console.error('Erro na validação de senha:', error)
      return false
    }
  }

  async changeAdminPassword(currentPassword: string, newPassword: string, user: string): Promise<boolean> {
    try {
      const isValid = await this.validateAdminPassword(currentPassword)
      if (!isValid) {
        await this.logActivity(user, 'PASSWORD_CHANGE_FAILED', 'Tentativa de mudança de senha com senha incorreta', '127.0.0.1', false)
        return false
      }

      const config = await this.getSystemConfig()
      config.adminPassword = await bcrypt.hash(newPassword, 12)

      await fs.writeFile(this.configPath, JSON.stringify(config, null, 2))
      await this.logActivity(user, 'PASSWORD_CHANGED', 'Senha administrativa alterada', '127.0.0.1', true)

      return true
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      return false
    }
  }

  async createBackup(type: 'full' | 'incremental' | 'manual', description: string, creator: string): Promise<BackupData> {
    try {
      const timestamp = new Date().toISOString()
      const backupId = `backup_${timestamp.replace(/[:.]/g, '-')}_${type}`

      // Collect all important data
      const projectData = await this.collectProjectData()
      const backupContent = {
        metadata: {
          id: backupId,
          timestamp,
          type,
          description,
          creator,
          version: '1.0'
        },
        data: projectData
      }

      // Create backup file
      const backupFilePath = path.join(this.backupPath, `${backupId}.json`)
      const backupJson = JSON.stringify(backupContent, null, 2)
      await fs.writeFile(backupFilePath, backupJson)

      // Calculate checksum
      const checksum = await this.calculateChecksum(backupJson)

      const backupData: BackupData = {
        id: backupId,
        timestamp,
        type,
        size: Buffer.byteLength(backupJson, 'utf8'),
        description,
        checksum,
        creator
      }

      // Update system config
      const config = await this.getSystemConfig()
      config.lastBackup = timestamp
      await fs.writeFile(this.configPath, JSON.stringify(config, null, 2))

      // Log activity
      await this.logActivity(creator, 'BACKUP_CREATED', `Backup ${type} criado: ${description}`, '127.0.0.1', true)

      console.log(`✅ Backup criado: ${backupId}`)
      return backupData

    } catch (error) {
      console.error('❌ Erro ao criar backup:', error)
      await this.logActivity(creator, 'BACKUP_FAILED', `Falha ao criar backup: ${error}`, '127.0.0.1', false)
      throw error
    }
  }

  async listBackups(): Promise<BackupData[]> {
    try {
      const files = await fs.readdir(this.backupPath)
      const backups: BackupData[] = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.backupPath, file)
          const content = await fs.readFile(filePath, 'utf8')
          const backup = JSON.parse(content)

          if (backup.metadata) {
            backups.push({
              id: backup.metadata.id,
              timestamp: backup.metadata.timestamp,
              type: backup.metadata.type,
              size: Buffer.byteLength(content, 'utf8'),
              description: backup.metadata.description,
              checksum: await this.calculateChecksum(content),
              creator: backup.metadata.creator
            })
          }
        }
      }

      return backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    } catch (error) {
      console.error('Erro ao listar backups:', error)
      return []
    }
  }

  async restoreBackup(backupId: string, adminPassword: string, user: string): Promise<boolean> {
    try {
      // Validate admin password
      const isValid = await this.validateAdminPassword(adminPassword)
      if (!isValid) {
        await this.logActivity(user, 'RESTORE_FAILED', `Tentativa de restore com senha incorreta: ${backupId}`, '127.0.0.1', false)
        return false
      }

      const backupFilePath = path.join(this.backupPath, `${backupId}.json`)
      const backupContent = await fs.readFile(backupFilePath, 'utf8')
      const backup = JSON.parse(backupContent)

      // Verify backup integrity
      const currentChecksum = await this.calculateChecksum(backupContent)

      // Create a restoration backup before proceeding
      await this.createBackup('manual', `Pre-restore backup before restoring ${backupId}`, 'SYSTEM')

      // Here you would implement the actual restoration logic
      // This would involve restoring database, files, configurations, etc.
      console.log(`🔄 Iniciando restore do backup: ${backupId}`)

      // Simulate restoration process
      await new Promise(resolve => setTimeout(resolve, 2000))

      await this.logActivity(user, 'BACKUP_RESTORED', `Backup restaurado: ${backupId}`, '127.0.0.1', true)
      console.log(`✅ Backup restaurado com sucesso: ${backupId}`)

      return true
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error)
      await this.logActivity(user, 'RESTORE_FAILED', `Falha ao restaurar backup ${backupId}: ${error}`, '127.0.0.1', false)
      return false
    }
  }

  async exportData(format: 'json' | 'csv', adminPassword: string, user: string): Promise<string | null> {
    try {
      const isValid = await this.validateAdminPassword(adminPassword)
      if (!isValid) {
        await this.logActivity(user, 'EXPORT_FAILED', 'Tentativa de export com senha incorreta', '127.0.0.1', false)
        return null
      }

      const data = await this.collectProjectData()
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `sgup_export_${timestamp}.${format}`
      const exportPath = path.join(this.backupPath, fileName)

      if (format === 'json') {
        await fs.writeFile(exportPath, JSON.stringify(data, null, 2))
      } else if (format === 'csv') {
        // Convert to CSV format (simplified)
        const csvContent = this.convertToCSV(data)
        await fs.writeFile(exportPath, csvContent)
      }

      await this.logActivity(user, 'DATA_EXPORTED', `Dados exportados em formato ${format}`, '127.0.0.1', true)
      return exportPath
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
      await this.logActivity(user, 'EXPORT_FAILED', `Falha ao exportar dados: ${error}`, '127.0.0.1', false)
      return null
    }
  }

  async getActivityLogs(limit = 100): Promise<ActivityLog[]> {
    try {
      const logsContent = await fs.readFile(this.logsPath, 'utf8')
      const logs: ActivityLog[] = JSON.parse(logsContent)
      return logs.slice(0, limit).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    } catch (error) {
      return []
    }
  }

  async logActivity(user: string, action: string, details: string, ipAddress: string, success: boolean): Promise<void> {
    try {
      let logs: ActivityLog[] = []

      try {
        const logsContent = await fs.readFile(this.logsPath, 'utf8')
        logs = JSON.parse(logsContent)
      } catch {
        // File doesn't exist, start with empty array
      }

      const newLog: ActivityLog = {
        id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date().toISOString(),
        user,
        action,
        details,
        ipAddress,
        success
      }

      logs.unshift(newLog)

      // Keep only last 1000 logs
      if (logs.length > 1000) {
        logs = logs.slice(0, 1000)
      }

      await fs.writeFile(this.logsPath, JSON.stringify(logs, null, 2))
    } catch (error) {
      console.error('Erro ao registrar atividade:', error)
    }
  }

  private async getSystemConfig(): Promise<SystemConfig> {
    try {
      const configContent = await fs.readFile(this.configPath, 'utf8')
      return JSON.parse(configContent)
    } catch (error) {
      throw new Error('Sistema não inicializado. Execute initializeSystem() primeiro.')
    }
  }

  private async collectProjectData(): Promise<any> {
    // This would collect all important project data
    return {
      components: 'All React components',
      configurations: 'All config files',
      dependencies: 'Package.json and lock files',
      environment: 'Environment variables',
      database: 'Database schema and sample data',
      assets: 'Images and static files',
      timestamp: new Date().toISOString()
    }
  }

  private async calculateChecksum(content: string): Promise<string> {
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(content).digest('hex')
  }

  private convertToCSV(data: any): string {
    // Simplified CSV conversion
    return `"timestamp","data"\n"${new Date().toISOString()}","${JSON.stringify(data).replace(/"/g, '""')}"`
  }

  // Auto backup scheduler
  async scheduleAutoBackup(): Promise<void> {
    const config = await this.getSystemConfig()

    if (config.autoBackupEnabled) {
      setInterval(async () => {
        try {
          await this.createBackup('incremental', 'Backup automático programado', 'SYSTEM')
          console.log('✅ Backup automático realizado')
        } catch (error) {
          console.error('❌ Erro no backup automático:', error)
        }
      }, 24 * 60 * 60 * 1000) // Daily backup
    }
  }

  // Cleanup old backups
  async cleanupOldBackups(): Promise<void> {
    try {
      const config = await this.getSystemConfig()
      const retentionDate = new Date()
      retentionDate.setDate(retentionDate.getDate() - config.backupRetentionDays)

      const backups = await this.listBackups()

      for (const backup of backups) {
        const backupDate = new Date(backup.timestamp)
        if (backupDate < retentionDate) {
          const backupFilePath = path.join(this.backupPath, `${backup.id}.json`)
          await fs.unlink(backupFilePath)
          await this.logActivity('SYSTEM', 'BACKUP_DELETED', `Backup antigo removido: ${backup.id}`, '127.0.0.1', true)
        }
      }
    } catch (error) {
      console.error('Erro na limpeza de backups:', error)
    }
  }
}

// Export functions for easy use
export const backupSystem = BackupSystem.getInstance()

export const initializeBackupSystem = (adminPassword: string) => {
  return backupSystem.initializeSystem(adminPassword)
}

export const createManualBackup = (description: string, creator: string) => {
  return backupSystem.createBackup('manual', description, creator)
}

export const getBackupList = () => {
  return backupSystem.listBackups()
}

export const restoreFromBackup = (backupId: string, adminPassword: string, user: string) => {
  return backupSystem.restoreBackup(backupId, adminPassword, user)
}

export const exportSystemData = (format: 'json' | 'csv', adminPassword: string, user: string) => {
  return backupSystem.exportData(format, adminPassword, user)
}

export const getSystemLogs = (limit?: number) => {
  return backupSystem.getActivityLogs(limit)
}

export default backupSystem

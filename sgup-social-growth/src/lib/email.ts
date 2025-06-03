import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number.parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'contato@sgup.com',
    pass: process.env.SMTP_PASS || 'demo_password'
  }
})

interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

interface OrderData {
  orderId: string
  customerName: string
  customerEmail: string
  platform: string
  tier: string
  amount: number
  transactionId: string
}

interface ProgressData {
  orderId: string
  customerName: string
  platform: string
  currentFollowers: number
  targetFollowers: number
  progress: number
}

export const sendPaymentConfirmation = async (orderData: OrderData) => {
  const template: EmailTemplate = {
    to: orderData.customerEmail,
    subject: `✅ Pagamento Confirmado - SGup #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #9333ea, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SGup - Social Growth Up</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Pagamento Confirmado com Sucesso!</p>
        </div>

        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Olá ${orderData.customerName}!</h2>

          <p style="color: #475569; line-height: 1.6;">
            Seu pagamento foi processado com sucesso e nossa IA já começou a trabalhar no crescimento
            do seu perfil <strong>${orderData.platform}</strong>.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 15px 0;">Detalhes do Pedido</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">ID do Pedido:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${orderData.orderId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Plataforma:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1e293b; border-bottom: 1px solid #e2e8f0; text-transform: capitalize;">${orderData.platform}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Escalão:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${orderData.tier}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Valor Pago:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #059669; border-bottom: 1px solid #e2e8f0;">CHF ${orderData.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">ID da Transação:</td>
                <td style="padding: 8px 0; font-family: monospace; color: #1e293b; font-size: 12px;">${orderData.transactionId}</td>
              </tr>
            </table>
          </div>

          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1d4ed8; margin: 0 0 15px 0;">📈 Próximos Passos</h3>
            <ul style="color: #475569; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Nossa IA iniciará o trabalho em até <strong>1 hora</strong></li>
              <li>Você receberá atualizações de progresso por email</li>
              <li>Acompanhe em tempo real no seu dashboard</li>
              <li>Resultados visíveis em 24-48 horas</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
               style="background: linear-gradient(135deg, #9333ea, #3b82f6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Acessar Dashboard
            </a>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              💬 <strong>Precisa de ajuda?</strong> Nossa equipe está disponível 24/7<br>
              📧 Email: suporte@sgup.com | 📱 WhatsApp: +41 XX XXX XX XX
            </p>
          </div>
        </div>

        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            © 2025 SGup - Social Growth Up | Zürich, Switzerland<br>
            Você está recebendo este email porque fez um pedido em nosso site.
          </p>
        </div>
      </div>
    `,
    text: `
SGup - Pagamento Confirmado!

Olá ${orderData.customerName}!

Seu pagamento foi processado com sucesso.

Detalhes do Pedido:
- ID: ${orderData.orderId}
- Plataforma: ${orderData.platform}
- Escalão: ${orderData.tier}
- Valor: CHF ${orderData.amount.toFixed(2)}
- Transação: ${orderData.transactionId}

Nossa IA já começou a trabalhar no crescimento do seu perfil.

Acompanhe o progresso em: ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard

Suporte: suporte@sgup.com
    `
  }

  try {
    await transporter.sendMail(template)
    console.log(`Payment confirmation email sent to ${orderData.customerEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

export const sendProgressUpdate = async (progressData: ProgressData) => {
  const template: EmailTemplate = {
    to: progressData.customerEmail,
    subject: `📈 Progresso ${progressData.progress}% - SGup #${progressData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SGup - Progress Update</h1>
          <div style="color: white; font-size: 36px; font-weight: bold; margin-top: 10px;">
            ${progressData.progress}%
          </div>
        </div>

        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Olá ${progressData.customerName}!</h2>

          <p style="color: #475569; line-height: 1.6;">
            Ótimas notícias! Seu perfil ${progressData.platform} está crescendo conforme planejado.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #059669; margin: 0 0 15px 0;">Progresso Atual</h3>

            <div style="background: #f1f5f9; border-radius: 8px; height: 20px; margin: 15px 0; position: relative; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #10b981, #059669); height: 100%; width: ${progressData.progress}%; border-radius: 8px; transition: width 0.3s ease;"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; font-weight: bold; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                ${progressData.progress}%
              </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Seguidores Atuais:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #10b981; border-bottom: 1px solid #e2e8f0;">${progressData.currentFollowers.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">Meta Final:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${progressData.targetFollowers.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Faltam:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #f59e0b;">${(progressData.targetFollowers - progressData.currentFollowers).toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
               style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Ver Detalhes Completos
            </a>
          </div>
        </div>

        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            © 2025 SGup - Social Growth Up | Continuamos trabalhando para você!
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(template)
    console.log(`Progress update email sent to ${progressData.customerEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Progress email error:', error)
    return { success: false, error }
  }
}

export const sendCompletionNotification = async (orderData: OrderData & { finalFollowers: number }) => {
  const template: EmailTemplate = {
    to: orderData.customerEmail,
    subject: `🎉 Objetivo Alcançado! - SGup #${orderData.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Missão Cumprida!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Seu objetivo foi alcançado com sucesso</p>
        </div>

        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Parabéns ${orderData.customerName}!</h2>

          <p style="color: #475569; line-height: 1.6;">
            É com grande satisfação que informamos que seu pedido foi <strong>100% concluído</strong>!
            Seu perfil ${orderData.platform} agora tem <strong>${orderData.finalFollowers.toLocaleString()} seguidores</strong>.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin: 0 0 15px 0;">Resultados Finais</h3>
            <div style="text-align: center; margin: 20px 0;">
              <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; padding: 20px; border-radius: 12px; display: inline-block;">
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 5px;">
                  ${orderData.finalFollowers.toLocaleString()}
                </div>
                <div style="font-size: 14px; opacity: 0.9;">Seguidores Totais</div>
              </div>
            </div>
          </div>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin: 0 0 15px 0;">💡 Dicas para Manter o Crescimento</h3>
            <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Publique conteúdo regularmente e de qualidade</li>
              <li>Interaja com seus novos seguidores</li>
              <li>Use hashtags relevantes para seu nicho</li>
              <li>Mantenha consistência no seu estilo</li>
              <li>Considere novos pacotes SGup para crescimento contínuo</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
               style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">
              Ver Dashboard
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/"
               style="background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Novo Pedido
            </a>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px; margin: 0; text-align: center;">
              ⭐ <strong>Gostou do nosso serviço?</strong><br>
              Nos avalie e compartilhe sua experiência!
            </p>
          </div>
        </div>

        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            © 2025 SGup - Social Growth Up | Obrigado pela confiança!
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(template)
    console.log(`Completion email sent to ${orderData.customerEmail}`)
    return { success: true }
  } catch (error) {
    console.error('Completion email error:', error)
    return { success: false, error }
  }
}

export default { sendPaymentConfirmation, sendProgressUpdate, sendCompletionNotification }

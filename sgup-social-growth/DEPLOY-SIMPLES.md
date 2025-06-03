# 🚀 GUIA ULTRA-SIMPLES: Como Colocar o SGup Online

## ⚡ RESUMO RÁPIDO (5 passos)

### 1️⃣ BAIXAR O PROJETO
- ✅ Baixe o arquivo `sgup-social-growth-complete.zip`
- ✅ Extraia em uma pasta no seu computador

### 2️⃣ CRIAR CONTA GITHUB
- 🌐 Vá em: https://github.com
- 📝 Crie uma conta gratuita
- ➕ Clique "New" para criar repositório
- 📛 Nome: `sgup-social-growth`
- 📤 Faça upload de TODOS os arquivos do projeto

### 3️⃣ CRIAR CONTA NETLIFY
- 🌐 Vá em: https://netlify.com
- 🔗 Faça login com sua conta GitHub
- ➕ Clique "Add new site" → "Import from GitHub"
- 📂 Selecione seu repositório `sgup-social-growth`

### 4️⃣ CONFIGURAR BUILD
No Netlify, configure:
```
Build command: npm run build
Publish directory: out
```

### 5️⃣ ADICIONAR VARIÁVEIS
Em "Environment variables" adicione:
```
NEXT_PUBLIC_BASE_URL = https://seu-site.netlify.app
NODE_ENV = production
```

## 🎯 PRONTO! SEU SITE ESTÁ ONLINE!

### 📱 Para pagamentos funcionarem:
- **Stripe:** Cadastre-se em stripe.com e adicione as chaves
- **PayPal:** Cadastre-se em developer.paypal.com e adicione as chaves

---

## 🆘 PROBLEMAS COMUNS

❌ **"Build failed"**
→ Verifique se adicionou todas as variáveis de ambiente

❌ **"Site não carrega"**
→ Aguarde 5-10 minutos após o deploy

❌ **"Pagamentos não funcionam"**
→ Configure as chaves do Stripe e PayPal

---

## 📞 AJUDA RÁPIDA

1. **GitHub não aceita upload:** Use GitHub Desktop
2. **Netlify dá erro:** Verifique variáveis de ambiente
3. **Site lento:** Normal nas primeiras horas

**🎉 EM 30 MINUTOS SEU SGUP ESTARÁ ONLINE!**

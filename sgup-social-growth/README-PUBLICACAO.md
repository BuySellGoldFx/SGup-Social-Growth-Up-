# 🚀 Como Publicar o SGup Online - Guia Simples

## 📋 Pré-requisitos
- Arquivo do projeto baixado e extraído
- Uma conta no GitHub (gratuita)
- Uma conta no Netlify (gratuita)

## 🔧 Passo 1: Preparar os Arquivos

1. **Extrair o projeto:**
   - Descompacte o arquivo `sgup-social-growth-complete.zip`
   - Você terá uma pasta chamada `sgup-social-growth`

2. **Configurações necessárias:**
   - Abra a pasta do projeto
   - Encontre o arquivo `package.json`
   - Certifique-se que existe

## 🌐 Passo 2: Publicar no GitHub

### A. Criar conta no GitHub (se não tiver)
1. Acesse: https://github.com
2. Clique em "Sign up"
3. Crie sua conta gratuita

### B. Criar repositório
1. No GitHub, clique no botão verde "New" ou "+"
2. Nome do repositório: `sgup-social-growth`
3. Marque "Public"
4. Clique "Create repository"

### C. Upload dos arquivos
1. Na página do repositório criado
2. Clique "uploading an existing file"
3. Arraste TODA a pasta do projeto
4. Escreva: "Initial commit - SGup project"
5. Clique "Commit changes"

## 🚀 Passo 3: Publicar no Netlify

### A. Criar conta no Netlify
1. Acesse: https://netlify.com
2. Clique "Sign up"
3. Escolha "Sign up with GitHub"
4. Autorize a conexão

### B. Conectar o projeto
1. No dashboard Netlify, clique "Add new site"
2. Escolha "Import an existing project"
3. Conecte com GitHub
4. Selecione o repositório `sgup-social-growth`

### C. Configurar o build
```
Build command: npm run build
Publish directory: out
```

### D. Variáveis de ambiente
No Netlify, vá em:
1. Site settings > Environment variables
2. Adicione estas variáveis:

```
NEXT_PUBLIC_BASE_URL = https://seu-site.netlify.app
NODE_ENV = production
STRIPE_SECRET_KEY = sua_chave_stripe_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = sua_chave_publica_stripe
PAYPAL_CLIENT_ID = seu_client_id_paypal
PAYPAL_CLIENT_SECRET = seu_secret_paypal
```

## 🔑 Passo 4: Configurar Chaves de API

### Stripe (Para pagamentos)
1. Acesse: https://stripe.com
2. Crie uma conta
3. Vá em Developers > API keys
4. Copie as chaves e adicione no Netlify

### PayPal (Para pagamentos)
1. Acesse: https://developer.paypal.com
2. Crie uma conta de desenvolvedor
3. Crie uma nova aplicação
4. Copie Client ID e Secret

## ⚡ Passo 5: Deploy Automático

1. Após configurar tudo no Netlify
2. Clique "Deploy site"
3. Aguarde o build completar (5-10 minutos)
4. Seu site estará online!

## 🎯 URLs do Seu Site

Após a publicação, você terá:

- **Site principal:** `https://seu-nome.netlify.app`
- **Dashboard:** `https://seu-nome.netlify.app/dashboard`
- **Admin:** `https://seu-nome.netlify.app/admin`
- **Checkout:** `https://seu-nome.netlify.app/checkout`

## 🔧 Personalizações Básicas

### Alterar nome do site
1. No Netlify: Site settings > General > Site details
2. Clique "Change site name"
3. Escolha: `sgup-social-growth` ou outro nome

### Domínio personalizado (opcional)
1. Compre um domínio (ex: sgup.com)
2. No Netlify: Domain settings > Add custom domain
3. Configure DNS conforme instruções

## 📞 Suporte

### Se der erro no build:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Vá em Deploys > Deploy log para ver o erro
3. Geralmente é falta de variável de ambiente

### Se o site não carregar:
1. Verifique se o deploy foi bem-sucedido
2. Teste as URLs individualmente
3. Verifique o console do navegador (F12)

## ✅ Checklist Final

- [ ] Projeto baixado e extraído
- [ ] Repositório GitHub criado
- [ ] Arquivos enviados para GitHub
- [ ] Conta Netlify criada
- [ ] Site conectado ao GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Chaves Stripe configuradas
- [ ] Chaves PayPal configuradas
- [ ] Deploy realizado com sucesso
- [ ] Site funcionando online

## 🎉 Parabéns!

Seu SGup está agora online e funcionando!

**Próximos passos:**
1. Teste todas as funcionalidades
2. Configure emails (opcional)
3. Personalize conteúdo
4. Promova seu serviço

---

**💡 Dica:** Salve este arquivo como referência futura!

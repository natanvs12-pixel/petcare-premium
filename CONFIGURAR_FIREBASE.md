# PetCare+ Premium — Configuração do Firebase

## 1. Criar projeto Firebase
1. Acesse https://console.firebase.google.com → **Adicionar projeto**
2. Dê um nome (ex: "petcare-premium") e siga até concluir.

## 2. Ativar Authentication (Login)
1. No menu esquerdo: **Build → Authentication**
2. Clique em **Get started**
3. Em **Sign-in method**, ative **Email/Password** → Save

## 3. Criar Firestore Database
1. No menu: **Build → Firestore Database**
2. Clique em **Create database**
3. Escolha região (ex: `southamerica-east1` para Brasil) → Next
4. Modo: **Production mode** → Enable

## 4. Aplicar regras de segurança
1. Em **Firestore → Rules**
2. Cole o conteúdo de `firestore.rules` (que está nesta pasta)
3. Clique em **Publish**

## 5. Pegar as credenciais e colar no `index.html`
1. No menu: **Project settings (engrenagem)**
2. Role até **Your apps** → clique em `</>` (Web)
3. Dê um apelido ao app → **Register app**
4. Copie o objeto `firebaseConfig` exibido — algo como:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "petcare-xxx.firebaseapp.com",
     projectId: "petcare-xxx",
     storageBucket: "petcare-xxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc..."
   };
   ```
5. **Abra `index.html`**, procure pelo bloco `// 👇 COLOQUE AQUI AS CREDENCIAIS` (perto da linha 200) e substitua os 6 valores `"COLOCAR_AQUI"` pelos seus.

## 6. Autorizar domínios (importante)
1. **Authentication → Settings → Authorized domains**
2. Adicione o domínio onde o app vai rodar (ex: `petcare.vercel.app`).
   Localhost já vem autorizado.

## 7. Subir
- **Vercel**: arrasta a pasta inteira ou conecta o repositório do GitHub.
- **GitHub Pages**: sobe os arquivos na raiz e ativa Pages.
- **Cloudflare Pages / Netlify**: idem.

Todos os hosts gratuitos já dão HTTPS automático — é requisito do PWA.

## Pronto
- Login real, recuperação de senha, criação de conta — tudo via Firebase.
- Cada usuário só vê os próprios dados (regra acima).
- Sincronização automática entre dispositivos (Firestore).
- Funciona offline (Firestore guarda no IndexedDB e sincroniza ao voltar a internet).

<div align="center">

<!-- ▦ Coloque sua logo em docs/logo.png (ou use o caminho direto do repo) -->
<img src="public/brand/SHORTA_logo_name.png" alt="Shorta" width="340" />

# Shorta

**Encurte seus links. Acompanhe seus acessos.**

Um encurtador de URLs full-stack — moderno, direto e com métricas em tempo real.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/status-ativo-brightgreen?style=flat-square)](https://github.com/Anthonyysm/shorta-web)

</div>

---

## Demo

<!-- ▦ Coloque o link do deploy (Vercel, Netlify, Render...) quando publicar -->
> 🔗 **[Deploy em breve]** — acesse em breve para experimentar ao vivo.

---

## Telas

<!-- ▦ Crie uma pasta docs/screenshots/ e salve as imagens abaixo com esses nomes -->

<div align="center">

### Home — encurtar um link
<img src="docs/screenshots/home.png" alt="Tela inicial do Shorta" width="800" />

### Painel — busca, resumo e ordenação
<img src="docs/screenshots/dashboard.png" alt="Painel com lista de links" width="800" />

### Métricas — cliques por link
<img src="docs/screenshots/metrics.png" alt="Tela de métricas" width="800" />

### Login / Cadastro
<img src="docs/screenshots/login.png" alt="Tela de login" width="380" />
<img src="docs/screenshots/register.png" alt="Tela de cadastro" width="380" />

</div>

---

## O que tem aqui

- ✂️ **Encurtador de URLs** — cole um link longo e receba um curto em segundos
- 📋 **Cópia com um clique** — botão de copiar com feedback visual e toast de confirmação
- 📊 **Métricas por link** — total de cliques, histórico de acessos, IP e dispositivo
- 🔍 **Busca e ordenação** — filtre por código ou destino; ordene por data ou cliques
- 🔐 **Autenticação** — cadastro e login com JWT, painel protegido
- 🗑️ **Exclusão segura** — confirmação antes de apagar qualquer link
- 🎨 **Tema neutro claro/escuro** — paleta em tons de cinza, acessível e confortável
- 📱 **Mobile-first** — responsivo de 360px a desktop
- ♿️ **Acessível** — contraste WCAG AA, labels, foco visível e respeito a `prefers-reduced-motion`

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Front-end | React 19, Vite 8, React Router 7 |
| Estilo | Tailwind CSS 3.4, tokens shadcn |
| Componentes | Base UI, lucide-react, Sonner |
| Estado | Context API + hooks customizados |
| HTTP | Axios |
| Back-end | FastAPI (Python) — [Anthonyysm/shorta-api](https://github.com/Anthonyysm/shorta-api) |

---

## Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/Anthonyysm/shorta-web.git
cd shorta-web

# 2. Configure o ambiente
cp .env.example .env
# Edite .env apontando para a URL da sua API

# 3. Instale as dependências e inicie
npm install
npm run dev
```

O front-end sobe em `http://localhost:5173` e se conecta à API definida em `VITE_API_URL`. O back-end está em [Anthonyysm/shorta-api](https://github.com/Anthonyysm/shorta-api).

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Verifica o código com ESLint |

---

## Estrutura do projeto

```
shorta-web/
├── public/brand/          # Logo e ícones da marca
├── src/
│   ├── components/        # Navbar, Logo e primitivos ui/ (shadcn)
│   ├── contexts/          # AuthContext (token JWT)
│   ├── lib/               # Utilitários (cn, config, theme)
│   ├── pages/             # Home, Dashboard, Metrics, Login, Register
│   │   └── */use*.js      # Lógica extraída em custom hooks
│   ├── routes/            # Rotas protegidas e públicas
│   └── services/          # Instância Axios interceptada
├── .env.example           # Variáveis de ambiente documentadas
└── tailwind.config.js     # Tokens de tema (claro/escuro)
```

---

## Layout e design

- **Tipografia** — Inter (interface) + Barlow Condensed (wordmark)
- **Paleta** — cinza neutro dual-theme via tokens CSS shadcn (`:root` / `.dark`)
- **Componentes** — primitivos Base UI customizados com classes Tailwind
- **Motion** — transições curtas (150ms), skeleton em carregamentos e toast para feedback

---

## Autor

<div align="center">

Feito com 💜 por **[Anthonyysm](https://github.com/Anthonyysm)**

<img src="https://github-readme-stats.vercel.app/api?username=Anthonyysm&show_icons=true&theme=transparent&hide_border=true&rank_icon=github" alt="GitHub stats de Anthonyysm" />

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Anthonyysm&layout=compact&theme=transparent&hide_border=true" alt="Linguagens mais usadas" />

</div>

---

<div align="center">

Se esse projeto te ajudou, deixe uma ⭐ no repositório!

</div>

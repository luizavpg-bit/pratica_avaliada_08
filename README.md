<table>
<tr>
<td width="35%" align="center">
<img src="https://github.com/user-attachments/assets/63ee3613-1b48-47f9-9dcc-9ca8973deb81" width="280"/>
</td>
<td width="65%">

# ✨ Loja de Games: Autenticação e CRUD de Categorias

<img src="https://img.shields.io/badge/React-CDB4FF?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-B8C0FF?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCSS-FFC8DD?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Vite-BDE0FE?style=for-the-badge&logoColor=white">

Este repositório contém a resolução da atividade prática avaliada 08, sobre consumo de API com autenticação e CRUD sem relacionamento, proposta pela Generation Brasil

</td>
</tr>
</table>

---

## 🌸 Sobre o projeto

Aplicação frontend da **Loja de Games**, construída em React + TypeScript + Vite, consumindo a API desenvolvida no Bloco 02. O projeto implementa cadastro e autenticação de usuários, além do CRUD completo do recurso **Categoria**, com controle de acesso a rotas internas.

## 🌸 Habilidades trabalhadas

- Modelagem de dados com interfaces TypeScript
- Consumo de API REST com Axios
- Autenticação via Context API (estado em memória)
- Roteamento com React Router DOM
- CRUD completo (criar, listar, atualizar, excluir)
- Formulários controlados com validação
- Tratamento de erros e feedback ao usuário (loaders e alerts)
- Controle de acesso a rotas protegidas
- Estilização responsiva com Tailwind CSS

## 🌸 Estrutura do projeto

```
src/
├── assets/
├── components/
│   ├── categorias/
│   │   ├── cardcategorias/CardCategorias.tsx
│   │   ├── deletarcategorias/DeletarCategoria.tsx
│   │   ├── formcategoria/FormCategoria.tsx
│   │   └── listarcategorias/ListarCategorias.tsx
│   ├── footer/Footer.tsx
│   ├── navbar/
│   │   ├── Navbar.tsx
│   │   └── SearchForm.tsx
│   └── rotaprotegida/RotaProtegida.tsx
├── contexts/
│   └── AuthContext.tsx
├── models/
│   ├── Categoria.ts
│   ├── Usuario.ts
│   └── UsuarioLogin.ts
├── pages/
│   ├── cadastro/Cadastro.tsx
│   ├── home/Home.tsx
│   └── login/Login.tsx
├── services/
│   └── Service.ts
├── App.tsx
└── main.tsx
```

## 🌸 Funcionalidades

**Cadastro de usuário**
- Validação de senha (mínimo de 8 caracteres) e confirmação de senha
- Validação de maioridade (18 anos) a partir da data de nascimento, com `dayjs`
- Redirecionamento para o Login após cadastro bem-sucedido

**Login**
- Autenticação via API com token
- Indicador de carregamento durante a requisição
- Redirecionamento automático para a Home após autenticação

**CRUD de Categoria**
- Listagem de categorias cadastradas
- Cadastro de nova categoria
- Edição de categoria existente (pré-carregando os dados)
- Exclusão de categoria com tela de confirmação

**Controle de acesso**
- Usuários não autenticados são redirecionados para o Login ao tentar acessar rotas internas
- Navbar e Footer exibidos apenas quando há usuário autenticado

## 🌸 Rotas da aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Login | Autenticação do usuário |
| `/cadastro` | Cadastro | Cadastro de novo usuário |
| `/home` | Home | Página inicial da loja |
| `/categorias` | ListarCategorias | Listagem de categorias |
| `/cadastrarcategoria` | FormCategoria | Cadastro de categoria |
| `/editarcategoria/:id` | FormCategoria | Edição de categoria |
| `/deletarcategoria/:id` | DeletarCategoria | Exclusão de categoria |

## 🌸 Como executar

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173` no navegador

## 🌸 Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Day.js
- React Spinners

## 👤 Feito por:

Luiza Paolinelli
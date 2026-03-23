# E-commerce API

![Node](https://img.shields.io/badge/node-20-green)
![NestJS](https://img.shields.io/badge/nestjs-backend-red)
![PostgreSQL](https://img.shields.io/badge/postgres-db-blue)

API REST de e-commerce completa, desenvolvida com NestJS, Prisma e PostgreSQL, seguindo arquitetura modular e boas práticas de desenvolvimento backend.

A aplicação implementa autenticação JWT, login social com Google, recuperação de senha, gestão de produtos, carrinho, pedidos, pagamentos e cálculo de frete.

---

## 🧠 Boas práticas aplicadas

Este projeto foi desenvolvido seguindo princípios de arquitetura e boas práticas de engenharia de software:

- Aplicação de princípios SOLID
- Separação de responsabilidades (Controllers, Services, Modules)
- Uso de injeção de dependência (NestJS)
- Organização modular e escalável
- Validação e estruturação de dados com DTOs
- Testes automatizados com Jest (unitários e E2E)

## 🚀 Visão geral

Esta API fornece endpoints para:

- Autenticação de usuários com JWT
- Login social com Google OAuth
- Recuperação de senha via e-mail
- Gerenciamento de usuários e endereços
- Cadastro e listagem de categorias e produtos
- Operações de carrinho de compras
- Criação e gerenciamento de pedidos
- Registro e consulta de pagamentos
- Cálculo de frete via Google Distance Matrix

---

## 🧱 Arquitetura

O projeto segue uma arquitetura modular baseada no NestJS, separando responsabilidades por domínio:

- **Controllers** → gerenciamento das rotas HTTP  
- **Services** → regras de negócio  
- **Modules** → organização por contexto (auth, users, orders, etc.)  
- **Prisma ORM** → acesso ao banco de dados  

A aplicação foi estruturada com foco em escalabilidade, organização e manutenção, aplicando princípios de Clean Code.

---

## 🔐 Segurança

- Autenticação via JWT  
- Hash de senhas com bcrypt  
- Login social com Google OAuth  
- Recuperação de senha com envio de e-mail  
- Proteção de rotas com `JwtAuthGuard`  

---

## 🛠️ Stack

- NestJS  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Passport + JWT  
- Nodemailer  
- Swagger  
- Jest  

---

## 📁 Estrutura do projeto

src/
├── auth/
├── users/
├── products/
├── category/
├── shopping-cart/
├── orders/
├── payment/
└── services/


---

## 🧩 Modelos principais

O schema Prisma inclui os seguintes domínios:

- `User`
- `Address`
- `PasswordReset`
- `Category`
- `Product`
- `ProductAttribute`
- `ProductImage`
- `Cart`
- `CartItem`
- `Order`
- `OrderItem`
- `Payment`
- `Shipment`
- `Notification`

---

## ⚙️ Pré-requisitos

- Node.js 20+
- npm
- PostgreSQL

Opcionalmente, você pode subir o banco com Docker:

```bash
docker compose up -d

📦 Instalação
git clone https://github.com/eliseu-modan/ecommerce
cd ecommerce
npm install
🔑 Variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://admin:admin@localhost:5432/nestdb?schema=public"
JWT_SECRET="sua_chave_jwt"
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
API_GOOGLE_KEY="sua_chave_google_distance_matrix"
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="sua_senha_ou_app_password"
PORT=3000
⚠️ Observações de ambiente
API_GOOGLE_KEY é obrigatória para a aplicação iniciar
Callback Google OAuth: 
http://localhost:3000/auth/google/callback
Redirect após login Google:
http://localhost:9000/auth/googleAuth
Envio de e-mail via Gmail (Nodemailer)

🗄️ Banco de dados

Execute as migrations:

npx prisma generate
npx prisma migrate deploy

Para desenvolvimento:

npx prisma migrate dev
▶️ Executando o projeto
npm run start:dev

A aplicação estará disponível em:

API: http://localhost:3000
Swagger: http://localhost:3000/api-docs
📡 Como consumir a API

Após iniciar o servidor, utilize o Swagger para testar os endpoints:

http://localhost:3000/api-docs

🔐 Autenticação
Faça login em /auth/login
Copie o token JWT retornado
Utilize no header das requisições:
Authorization: Bearer <token>


🔗 Endpoints principais
Auth
POST /auth/login
GET /auth/google
GET /auth/google/callback

Users
POST /users
PATCH /users/update-user
POST /users/forgot-password
POST /users/reset-password
GET /users/user-profile
POST /users/add-address
PATCH /users/update-address/:id
GET /users/addresses

Category
POST /category/create
GET /category
PATCH /category/update/:id
DELETE /category/delete/:id

Product
POST /product/create
GET /product/getAll
PATCH /product/update/:id
DELETE /product/delete/:id

Shopping Cart
POST /shopping-cart/add-item-to-cart
GET /shopping-cart/get-cart
PATCH /shopping-cart/update-item-quantity
DELETE /shopping-cart/remove-item/:cartId/:productId
POST /shopping-cart/calculate-shipping

Orders
POST /order/create
GET /order/all

Payment
POST /payment/make-payment
GET /payment/get-payment/:id


📜 Scripts úteis
npm run start
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm run test
npm run test:e2e
🧪 Testes

O projeto possui testes unitários e E2E utilizando Jest:
npm run test
npm run test:e2e

🚧 Melhorias futuras
Integração com gateway de pagamento (Stripe, Mercado Pago, etc.)
Configuração dinâmica de URLs de OAuth
Cache para cálculo de frete
Deploy em ambiente cloud (AWS, Docker, etc.)

👨‍💻 Autor
Eliseu Modanesi
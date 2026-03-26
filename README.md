# E-commerce API

![Node](https://img.shields.io/badge/node-20-green)
![NestJS](https://img.shields.io/badge/nestjs-backend-red)
![PostgreSQL](https://img.shields.io/badge/postgres-db-blue)

API REST de e-commerce desenvolvida com NestJS, Prisma e PostgreSQL, com autenticação JWT, login social com Google, recuperação de senha, catálogo de produtos, carrinho, pedidos, pagamentos e cálculo de frete.

## Visão geral

Esta API fornece endpoints para:

- Autenticação com JWT
- Login social com Google OAuth
- Recuperação de senha por e-mail
- Gestão de usuários e endereços
- Cadastro e listagem de categorias e produtos
- Operações de carrinho de compras
- Criação e consulta de pedidos
- Registro e consulta de pagamentos
- Cálculo de frete via Google Distance Matrix

## Arquitetura

O projeto está organizado como um monólito modular em NestJS, com separação por domínio e responsabilidades bem definidas:

- `controller`: recebe a requisição HTTP e delega o fluxo
- `use-case`: concentra a regra de negócio de cada ação
- `repository`: centraliza o acesso a dados do domínio
- `database`: expõe o `PrismaService` compartilhado
- `lib` e `services`: concentram infraestrutura compartilhada, como JWT, mail e integrações externas

Fluxo principal:

```text
Controller -> Use Case -> Repository -> PrismaService -> PostgreSQL
```

### Camadas atuais

- `auth`, `users`, `orders`, `payment`, `products`, `shopping-cart` e `category` seguem o padrão `controller -> use-case -> repository`
- `src/database/database.module.ts` centraliza o acesso ao Prisma
- `src/lib/jwt` centraliza a configuração e assinatura de tokens JWT

## Boas práticas aplicadas

- Separação de responsabilidades por camada
- Organização modular por domínio
- Injeção de dependência com NestJS
- DTOs para validação de entrada
- Repositories por módulo para reduzir acoplamento com Prisma
- Use-cases para isolar regras de negócio

## Segurança

- Autenticação via JWT
- Hash de senha com bcrypt/bcryptjs
- Login social com Google OAuth
- Recuperação de senha com envio de e-mail
- Proteção de rotas com `JwtAuthGuard`

## Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport + JWT
- Nodemailer
- Swagger
- Jest

## Estrutura do projeto

```text
src/
├── app.module.ts
├── database/
│   └── database.module.ts
├── lib/
│   └── jwt/
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   └── use-cases/
├── users/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
├── products/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
├── category/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
├── shopping-cart/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
├── orders/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
├── payment/
│   ├── dto/
│   ├── repositories/
│   └── use-cases/
└── services/
```

## Modelos principais

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

## Pré-requisitos

- Node.js 20+
- npm
- PostgreSQL

Opcionalmente, você pode subir o banco com Docker:

```bash
docker compose up -d
```

## Instalação

```bash
git clone https://github.com/eliseu-modan/ecommerce
cd ecommerce
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/nestdb?schema=public"
JWT_SECRET="sua_chave_jwt"
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
API_GOOGLE_KEY="sua_chave_google_distance_matrix"
EMAIL_USER="seu_email@gmail.com"
EMAIL_PASS="sua_senha_ou_app_password"
PORT=3000
```

## Observações de ambiente

- `API_GOOGLE_KEY` é obrigatória para a aplicação iniciar
- Callback Google OAuth: `http://localhost:3000/auth/google/callback`
- Redirect após login Google: `http://localhost:9000/auth/googleAuth`
- O envio de e-mail utiliza Gmail via Nodemailer

## Banco de dados

Execute as migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Para desenvolvimento:

```bash
npx prisma migrate dev
```

## Executando o projeto

```bash
npm run start:dev
```

A aplicação estará disponível em:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

## Como consumir a API

Após iniciar o servidor, utilize o Swagger para testar os endpoints:

`http://localhost:3000/api-docs`

### Autenticação

1. Faça login em `POST /auth/login`
2. Copie o token JWT retornado
3. Envie no header:

```http
Authorization: Bearer <token>
```

## Endpoints principais

### Auth

- `POST /auth/login`
- `GET /auth/google`
- `GET /auth/google/callback`

### Users

- `POST /users`
- `PATCH /users/update-user`
- `POST /users/forgot-password`
- `POST /users/reset-password`
- `GET /users/user-profile`
- `POST /users/add-address`
- `PATCH /users/update-address/:id`
- `GET /users/addresses`

### Category

- `POST /category/create`
- `GET /category`
- `PATCH /category/update/:id`
- `DELETE /category/delete/:id`

### Product

- `POST /product/create`
- `GET /product/getAll`
- `PATCH /product/update/:id`
- `DELETE /product/delete/:id`

### Shopping Cart

- `POST /shopping-cart/add-item-to-cart`
- `GET /shopping-cart/get-cart`
- `PATCH /shopping-cart/update-item-quantity`
- `DELETE /shopping-cart/remove-item/:cartId/:productId`
- `POST /shopping-cart/calculate-shipping`

### Orders

- `POST /order/create`
- `GET /order/all`

### Payment

- `POST /payment/make-payment`
- `GET /payment/get-payment/:id`

## Scripts úteis

```bash
npm run start
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm run test
npm run test:e2e
```

## Testes

O projeto possui testes unitários e E2E utilizando Jest:

```bash
npm run test
npm run test:e2e
```

## Melhorias futuras

- Integração com gateway de pagamento real
- Configuração dinâmica das URLs de OAuth
- Cache para cálculo de frete
- Testes por `use-case`
- Tipagem mais forte para payloads, autenticação e fluxos de domínio

## Autor

Eliseu Modanesi

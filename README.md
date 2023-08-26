# [Project Name](http://localhost:3000)

> **Warning**
> This project is still in development and is not ready for production use.

#

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **ORM:** [Prisma ORM](https://www.prisma.io)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com)
- **Authentification:** [Clerk](https://clerk.com)
- **Testing:** [Playwright](https://playwright.dev)

## Running Locally

### 1. Install PNPM

```bash
npm i pnpm -g
```

### 2. Clone the repository

```bash
git clone https://github.com/Marian1309/Nextjs
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.

### 5. Push database

```bash
pnpm run db:push
```

### 6. Run the application

```bash
pnpm run dev
```

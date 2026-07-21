# Al Mehrab — ERP Progress Dashboard

A full-stack, animated ERP implementation tracker built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts, and a Node.js Express API.

## Project Demo
![Al Mehrab Dashboard Demo](https://github.com/sufyan4508/Al-Mehrab-Dashboard/issues/4#issue-4942563220)

## Folder Structure

```text
Al_Mehrab-dashboard/
├── frontend/                  # Next.js Application
│   ├── app/                   # App router, layout & global styles
│   ├── components/            # Animated UI, Charts & Dashboard Layout
│   ├── lib/                   # API integration & TS types
│   └── public/                # Assets & Project Video (demo.mp4)
│
└── backend/                   # Node/Express API
    ├── src/                   # Server, Routes, Controllers & Data
    └── .env.example           # Environment configuration template
```

## Running it Locally

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Running at: http://localhost:4000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Running at: http://localhost:3000
```

*Note: The frontend automatically falls back to bundled sample data if the backend API is unreachable.*

## Production Features
- **Secure Architecture:** Sensitive endpoints and keys are fully isolated via environment variables.
- **Design Tokens:** Customized color palette (maroon & gold) tailored around the client's corporate brand identity.
- **Data Decoupling:** Fully modular structure; database changes only require updating the backend data query layer.

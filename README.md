# AI-First ERP Platform

This is a next-generation Enterprise Resource Planning (ERP) platform designed with AI at its core. It integrates standard ERP modules (Finance, Procurement, Sales, Inventory, Manufacturing, HR) with an intelligent AI Copilot that acts as a business partner.

## Tech Stack
- **Monorepo**: Managed with npm workspaces.
- **Frontend**: Next.js, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: NestJS (Node.js framework).
- **Architecture**: Microservices-ready, Event-driven.
- **Design**: Premium glassmorphism UI with dark mode support.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Apps
- **Web App**: `npm run dev:web`
- **API (Backend)**: `npm run dev:api`

## Current Progress (Phase 1 & 2)
- [x] Initialized monorepo structure.
- [x] Premium Dashboard UI implementation.
- [x] AI Copilot interface & Backend API.
- [x] Sidebar navigation for all modules.
- [x] Core design tokens and glassmorphism utilities.
- [x] Finance (FI) Module - UI & Backend API.
- [x] Sales (O2C) Module - UI & Backend API.
- [x] Inventory Module - UI & Stock Tracking.
- [x] Real-time AI chat integration between Frontend and Backend.

## Next Steps
- [ ] Implement Auth & RBAC.
- [ ] Connect Backend to PostgreSQL.
- [ ] Integrate real LLM for the AI Copilot.
- [ ] Implement Finance and Sales modules database schemas.

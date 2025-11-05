# Labor-Contractor Marketplace Platform

## Project Structure
- `client/` - React frontend with TypeScript
- `server/` - Node.js backend with Express and TypeScript

## Setup Instructions
1. Clone the repository
2. Install dependencies:
```bash
   cd client && npm install
   cd ../server && npm install
```
3. Configure environment variables (see .env.example)
4. Start development servers:
```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm run dev
```

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript, MongoDB
- Real-time: Socket.io
- Payments: Razorpay
- Authentication: JWT + OTP
EOF
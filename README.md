# CoachUJ

## Application Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/michalharasim/CoachUJ.git
```

### 2. Install dependencies and start each service
**Authorization Service**
```bash
cd {path-to-repo}/backend/Authorization
npm install
node index.js
```
Runs on port 2000

--------
**Client-Trainer Service**
```bash
cd {path-to-repo}/backend/client-trainer
npm install
node index.js
```
Runs on port 2137

--------
**Plans and Exercises Service**
```bash
cd {path-to-repo}/backend/plans-and-exercises
npm install
node index.js
```
Runs on port 8080

--------
**Frontend application**
```bash
cd {path-to-repo}/frontend
npm install
npm run dev
```
Runs on port 5173

--------
_If you encounter issues, make sure you are using the latest version of Node.js
Recommended: v24.7.0_
Before running the application, configure a .env file in each backend service (Authorization, client-trainer, plans-and-exercises).

Required variables:
```bash
ENCRYPTION_KEY=your_custom_key
JWT_SECRET=your_custom_secret
JWT_EXPIRES_IN=1h
```

_Important:
The values of JWT_SECRET, ENCRYPTION_KEY, and JWT_EXPIRES_IN must be identical across all backend services for authentication and encryption to work properly._

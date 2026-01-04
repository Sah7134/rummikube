# Rummikube Deployment Guide

## Deploying to Render.com (Free)

### Step 1: Create Render Account
1. Go to https://render.com and sign up
2. Connect your GitHub account

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/rummikube.git
git push -u origin main
```

### Step 3: Deploy Backend

1. On Render, click **New +** → **Web Service**
2. Select your GitHub repository
3. Configure:
   - **Name**: rummikube-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build --workspaces`
   - **Start Command**: `cd packages/backend && node dist/index.js`
   - **Publish directory**: (leave blank)

4. Add Environment Variables:
   - `PORT=4000`
   - `CLIENT_URL=https://your-frontend-url.onrender.com`
   - `NODE_ENV=production`

5. Click **Create Web Service**

6. Copy the deployed URL (e.g., `https://rummikube-backend.onrender.com`)

### Step 4: Deploy Frontend

1. On Render, click **New +** → **Static Site**
2. Select your GitHub repository
3. Configure:
   - **Name**: rummikube-frontend
   - **Build Command**: `npm install && npm run build --workspaces && npm run build --prefix packages/frontend`
   - **Publish directory**: `packages/frontend/dist`

4. Add Environment Variable:
   - `VITE_SERVER_URL=https://rummikube-backend.onrender.com` (from Step 3)

5. Click **Create Static Site**

6. Your frontend will be available at the provided URL

### Step 5: Share with Friends
- Share the frontend URL with friends
- Each player can join the same game room

## Alternative: Docker Deployment

Create `docker-compose.yml` for local testing before deploying:

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: packages/backend/Dockerfile
    ports:
      - "4000:4000"
    environment:
      - CLIENT_URL=http://localhost:3000
      - NODE_ENV=development
  
  frontend:
    build:
      context: .
      dockerfile: packages/frontend/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_SERVER_URL=http://localhost:4000
```

## Troubleshooting

**WebSocket Connection Issues:**
- Ensure `CLIENT_URL` in backend matches frontend domain
- Check browser console for connection errors
- Verify CORS settings in backend

**Build Failures:**
- Check build logs in Render dashboard
- Ensure all dependencies are listed in package.json files
- Verify Node version compatibility

**Game Doesn't Work:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for WebSocket connections

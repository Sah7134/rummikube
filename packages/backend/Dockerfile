FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/game-logic ./packages/game-logic
COPY packages/backend ./packages/backend

RUN npm install
RUN npm run build --workspaces

EXPOSE 4000

CMD ["node", "packages/backend/dist/index.js"]

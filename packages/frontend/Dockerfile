FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/game-logic ./packages/game-logic
COPY packages/frontend ./packages/frontend

RUN npm install
RUN npm run build --workspaces

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/packages/frontend/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

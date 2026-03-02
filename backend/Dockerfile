FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Serve pre-built React static files from /app/public
RUN mkdir -p /app/public

EXPOSE 8000

CMD ["node", "server.js"]

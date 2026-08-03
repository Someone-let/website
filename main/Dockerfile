FROM node:20-alpine AS base
WORKDIR /app

ARG BUILD_AUTH_SECRET=build-time-auth-secret
ENV AUTH_SECRET=$BUILD_AUTH_SECRET
ENV NEXTAUTH_SECRET=$BUILD_AUTH_SECRET

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN mkdir -p public
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

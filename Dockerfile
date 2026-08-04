# 1. Base image for building
FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_API_URL=http://api.supersheldon.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Next.js
RUN npm run build


# 2. Production image
FROM node:20-alpine AS runner
ARG NEXT_PUBLIC_API_URL=http://api.supersheldon.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

CMD ["npm", "start"]

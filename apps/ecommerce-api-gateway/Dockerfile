# Build stage
FROM node:lts-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copy libs (shared contracts)
COPY libs ./libs

# Copy the specific app
COPY apps/ecommerce-api-gateway ./apps/ecommerce-api-gateway

# Install dependencies
RUN npm ci

# Build the app
RUN npm run build -- ecommerce-api-gateway

# Production stage
FROM node:lts-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the application
CMD ["node", "dist/apps/ecommerce-api-gateway/main.js"]

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
COPY apps/orders ./apps/orders

# Install dependencies
RUN npm ci

# Build the app
RUN npm run build -- orders

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
ENV PORT=3003

EXPOSE 3003

# Start the application
CMD ["node", "dist/apps/orders/main.js"]

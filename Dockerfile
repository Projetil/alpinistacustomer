FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXTAUTH_SECRET=ce6831ee-3950-43aa-abf2-d6b1ac3521c4
ENV NEXTAUTH_URL=https://asm.alpinistas.io
ENV NEXT_URL_API=https://api.alpinistas.io
RUN npm run build
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
ENTRYPOINT ["npm", "start"]

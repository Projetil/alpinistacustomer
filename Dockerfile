FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXTAUTH_SECRET=bcMDZBCWxEFUXdqKG10wPqwKwsjim/zFz24AeAXq+t8=
ENV NEXTAUTH_URL=https://www.adm.bloxtrade.com.br
ENV NEXT_URL_API=https://www.api.bloxtrade.com.br
ENV NEXT_SIGNALR_URL=https://www.api.bloxtrade.com.br/notificationHub
RUN npm run build
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
ENTRYPOINT ["npm", "start"]

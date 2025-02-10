# Usa una imagen base de Node.js
FROM node:18-alpine

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente al contenedor
COPY . .

# Expone el puerto en el que correrá el frontend (ejemplo: 5173 para Vite, 3000 para React)
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]

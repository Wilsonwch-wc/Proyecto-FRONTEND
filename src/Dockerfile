# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios y instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Servir la aplicación con un servidor web
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]

# Exponer el puerto en el que corre el frontend
EXPOSE 3000

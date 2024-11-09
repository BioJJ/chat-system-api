# Usando a imagem base do Node.js
FROM node:16

# Define o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copia os arquivos de pacote e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Transpila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a sua aplicação
CMD ["npm", "run", "start:prod"]

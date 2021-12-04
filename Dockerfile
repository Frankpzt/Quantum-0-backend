FROM node:12
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG mongodb=mongodb://localhost:27017/quantum
ARG port=8080 
ARG jwt=secret
ENV CONNECTION_STRING=${mongodb}
ENV PORT=${port}
ENV JWT_KEY=${jwt}
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
# EXPOSE [8080, 27017] # mongodb port
CMD [ "npm", "run", "dev" ]

# docker build -t quantum_backend:0.1 .
# docker run -p 8080:8080 --name app_quantum quantum_backend:0.1
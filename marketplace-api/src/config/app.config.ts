export default{

  PORT: process.env.PORT||8080,
  HOST: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",

  DATABASE:{
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'market'
  },
  API:{
    PREFIX: "/api"
  },

  CLIENT_URL: process.env.CORS_ORIGIN || 'http://localhost:3000',
  DEV_URL: process.env.NODE_ENV !=='production' ? 'http://localhost:3000': '',
  
}
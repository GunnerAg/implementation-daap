import 'reflect-metadata'
import express from 'express'
import { appConfig } from './config'
import loaders from './loaders'

async function startServer(): Promise<any> {
  const app = express()
  await loaders({app})

  app.listen(Number(appConfig.PORT|| 8080), appConfig.HOST, ()=>{
    console.info(`
      ################################################
      🛡️  Server listening on port: ${appConfig.PORT} 🛡️
      ################################################
    `)
  })
  .on('error', err =>{
    console.log(err)
    process.exit(1)
  })
}

startServer();
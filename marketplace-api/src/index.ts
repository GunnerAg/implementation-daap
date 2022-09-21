import 'reflect-metadata' // We need this in order to use @Decorators
import express from 'express'
import { appConfig } from './config'
import loader from './loaders'
/**
 * Start app server
 */
async function startServer (): Promise<any> {
  const app = express()
  await loader({ expressApp: app })

  app
    .listen(Number(appConfig.PORT), appConfig.HOST, () => {
      console.info(`
      ################################################
      🛡️  Server listening on port: ${appConfig.PORT} 🛡️
      ################################################
    `)
    })
    .on('error', err => {
      console.error(err)
      process.exit(1)
    })
}

startServer()

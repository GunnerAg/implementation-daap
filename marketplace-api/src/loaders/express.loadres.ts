import express, {NextFunction} from 'express'
import cors from 'cors'
import {appConfig} from '../config'
import routes from '../api'

interface IExpress {
  app: express.Router
}

export default ({ app }:IExpress): void => {

  app.get('/status', (req,res)=>{
    res.status(200).end()
  })

  app.use(
    cors({
      origin: [appConfig.CLIENT_URL, appConfig.DEV_URL],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )

  app.use(express.json())

  app.use(appConfig.API.PREFIX, routes())

  app.use((req,res,next:NextFunction) =>{
    next({
      message: "Not Found",
      status: 404
    })
  })

  app.use((err:any, req:any, res:any, next:NextFunction)=>{

    if(err.name === "UnauthorizedError"){
      return res.status(err.status).send({message: err.message}).end()
    }
    return next(err)
  })

  app.use((err: any, req: any, res: any, next: NextFunction) => {
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message
      }
    })
  })
}
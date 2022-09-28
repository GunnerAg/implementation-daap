import express from 'express'
import expressLoadres from './express.loadres'
import mysqlLoader from './mysql.loader'

interface IExpress {
  app: express.Router
}

export default async({ app }: IExpress): Promise<any> => {
  await mysqlLoader() ? console.info('✅ Connected to database') : console.info('🚫 Database error connection')

  expressLoadres({app: app})
  console.info('✅ Express loaded!') 
}
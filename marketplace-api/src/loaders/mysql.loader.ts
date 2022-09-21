/* eslint-disable max-len */
import mysql from 'mysql'
import { appConfig } from '../config'

export default (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const session = mysql.createConnection(appConfig.DATABASE)

    session.connect(err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })

    session.end()
  })
}

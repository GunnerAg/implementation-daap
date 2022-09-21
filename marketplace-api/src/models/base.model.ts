import mysql, { OkPacket } from 'mysql'
import { appConfig } from './../config'
import { Service } from 'typedi'

@Service()
export default class BaseModel {
  private table: string;
  private id: string;

  /**
   * Constructor
   * @param _table Table name
   * @param _id Row id
   */
  constructor (_table: string, _id: string) {
    this.table = _table
    this.id = _id
  }

  /**
   * Make query DB
   * @param query Query string
   * @returns Result Type
   */
  public executeQuery (query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const session = mysql.createConnection(appConfig.DATABASE)

      session.query(query, function (error, results, fields) {
        if (error) {
          console.error(`queryDB ==> ${error}`)
          reject(error)
        } else {
          resolve(results)
        }
      })

      session.end()
    })
  }

  /**
   * Update
   * @param id Row id
   * @param data Row data
   * @returns Mysql OkPacket
   */
  public async Put<Type> (id: number, data: Type): Promise<OkPacket> {
    const dataKeys = Object.keys(data)
    let setData = ''

    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i]

      setData += typeof data[key] === 'string' ? `${key} = '${data[key]}'` : `${key} = ` + data[key]

      if (i !== dataKeys.length - 1) {
        setData += ' ,'
      }
    }

    return await this.executeQuery(`UPDATE ${this.table} SET ${setData} WHERE ${this.id} = ${id}`)
  }

  /**
   * Get
   * @param id Row id
   * @returns Data
   */
  public async Get<Type> (id: number): Promise<Type[]> {
    return await this.executeQuery(`SELECT * FROM ${this.table} WHERE ${this.id} = ${id} ORDER BY ${this.id} DESC`)
  }

  /**
   * GetAll
   * @returns Data
   */
  public async GetAll<Type> (): Promise<Type[]> {
    console.log(this.table)
    return await this.executeQuery(`SELECT * FROM ${this.table}`)
  }

  /**
   * Delete
   * @param id Row id
   * @returns Mysql OkPacket
   */
  public async Delete (id: number): Promise<OkPacket> {
    return await this.executeQuery(`DELETE FROM ${this.table} WHERE ${this.id} = '${id}'`)
  }

  /**
   * Logic delete
   * @param id Row id
   * @returns Mysql OkPacket
   */
  async LogicDelete (id: number): Promise<OkPacket> {
    return await this.Put<{deleted: boolean}>(id, { deleted: true })
  }

  /**
   * Get employee documents
   * @param idEmployee Employee id
   * @returns Document list
   */
  async geByEmployee<Type> (idEmployee: number): Promise<Type[]> {
    return await this.executeQuery(`SELECT * FROM ${this.table} WHERE idEmployee = ${idEmployee}`)
  }
}

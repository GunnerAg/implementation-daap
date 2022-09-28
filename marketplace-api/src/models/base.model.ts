import mysql, {OkPacket} from 'mysql'
import {appConfig} from './../config'
import {Service} from 'typedi'

@Service()
export default class BaseModel {
  private table: string;
  private id: string;


  constructor(_table: string, _id: string){
    this.table = _table
    this.id = _id
  }

  public executeQuery(query:string) : Promise<any> {
    return new Promise ((resolve, reject)=>{
      const session = mysql.createConnection(appConfig.DATABASE)

      session.query(query, function(error ,results) {
        if(error){
          console.error(`queryDB => ${error}`)
          reject(error);
        }
        else {
          resolve(results);
        }
      })

      session.end()
    })
  }

  public async Get<Type> (id:number): Promise<Type[]> {
    return await this.executeQuery(`SELECT * FROM ${this.table} WHERE ${this.id} = ${id} ORDER BY ${this.id} DESC`)
  }

  public async GetAll<Type>(): Promise<Type[]> {
    return await this.executeQuery(`SELECT * FROM ${this.table} ORDER BY ${this.id} DESC`)
  }

  public async Put<Type> (id: number, data: Type): Promise<OkPacket> {
    const dataKeys = Object.keys(data);
    let setData = ""

    for (let i=0; i< dataKeys.length; i++) {
      const key = dataKeys[i];

      setData += typeof data[key] === "string"? `${key} = '${data[key]}'` : `${key} = ` + data[key]

      if( i !== dataKeys.length -1){
        setData += ' ,'
      }
    }

    return await this.executeQuery(`UPDATE ${this.table} SET ${setData} WHERE ${this.id} = ${id}`)

  }

  public async Delete(id: number): Promise<OkPacket> {
    return await this.executeQuery(`DELETE FROM ${this.table} WHERE ${this.id} = '${id}'`)

  }

}
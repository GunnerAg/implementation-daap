import { OkPacket } from 'mysql'
import { Service } from 'typedi'
import BaseModel from './base.model'



@Service()
export class TokenModel extends BaseModel {

  constructor() {
    super('tokens', 'idToken')
  }

  async CreateToken(name: string, imgUrl: string, rarity: number, id: number): Promise<OkPacket> {
    return await this.executeQuery(
      `INSERT INTO tokens (rarity, name, imgUrl, id)
       VALUES(${rarity}, '${name}', '${imgUrl}', ${id})`
    )
  }

}
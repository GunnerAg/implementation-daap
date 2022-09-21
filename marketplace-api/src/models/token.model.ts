import { OkPacket } from 'mysql'
import { Service } from 'typedi'
import BaseModel from './base.model'

@Service()
export class TokenModel extends BaseModel {
  /**
   * A constructor function that calls the super function.
   */
  constructor() {
    super('tokens', 'idToken')
  }

  /**
   * This function takes in a name, imgURL, and rarity, and inserts them into the token table.
   * @param name - string
   * @param imgURL - https://i.imgur.com/QQQQQQQ.png
   * @param rarity - 1-5
   * @returns The result of the query.
   */
  async CreateToken (name, imgURL, rarity, id): Promise<OkPacket> {
    console.log('CREATE', name, imgURL, rarity, id)
    return await this.executeQuery(
      `
        INSERT INTO tokens (rarity, name, imgURL, id)
        VALUES(${rarity}, '${name}', '${imgURL}', ${id})
      `
    )
  }
}

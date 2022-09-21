import { OkPacket } from 'mysql'
import { Service } from 'typedi'
import BaseModel from './base.model'

@Service()
export class OrderModel extends BaseModel {
  /**
   * The constructor function is a special function that is called when an object is created from a
   * class
   */
  constructor() {
    super('orders', 'idOrder')
  }

  /**
   * It takes in an address, idToken, amount, name, imgURL, and rarity, and inserts them into the order
   * table
   * @param address - The address of the user who is making the order
   * @param idToken - The user's idToken from Firebase
   * @param amount - The amount of ETH the user is sending to the contract.
   * @param name - The name of the item
   * @param imgURL - The URL of the image that will be used to create the NFT.
   * @param rarity - 1-5
   * @returns The result of the query.
   */
  async CreateOrder(address, idToken, amount): Promise<OkPacket> {
    return await this.executeQuery(
      `INSERT INTO orders (address, idToken, amount)
       VALUES('${address}', ${idToken}, ${amount})`
    )
  }

  /**
   * It updates the amount of an order in the database
   * @param address - The address of the user who is placing the order.
   * @param idToken - The id of the token that the user wants to buy.
   * @param amount - The amount of the order.
   * @returns The result of the query.
   */
  async UpdateOrder(address, idToken, amount): Promise<OkPacket> {
    return await this.executeQuery(
      `UPDATE orders
      SET amount=${amount} WHERE address='${address}' AND idToken=${idToken}`
    )
  }

  /**
   * It deletes an order from the database
   * @param address - The address of the user who is placing the order.
   * @param idToken - The idToken of the user who is making the order.
   * @returns The result of the query.
   */
  async DeleteOrder(address, idToken): Promise<OkPacket> {
    return await this.executeQuery(
      `DELETE FROM orders 
      WHERE orders.address='${address}' AND orders.idToken=${idToken}`
    )
  }
}

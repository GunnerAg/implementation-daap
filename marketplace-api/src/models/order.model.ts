import { OkPacket } from 'mysql'
import { Service } from 'typedi'
import BaseModel from './base.model'



@Service()
export class OrderModel extends BaseModel {

  constructor(){
    super('orders', 'idOrder')
  }

  async CreateOrder(address: string, idToken: number, amount: number): Promise<OkPacket> {
    return await this.executeQuery(
      `INSERT INTO orders (address, idToken, amount)
       VALUES('${address}', ${idToken}, ${amount})`
    )
  }

  async UpdateOrder(address: string, idToken: number, amount: number): Promise<OkPacket> {
    return await this.executeQuery(
      `UPDATE orders
       SET amount=${amount} WHERE address='${address}' AND idToken=${idToken}`
    )
  }

  async DeleteOrder(address: string, idToken: number): Promise<OkPacket> {
    return await this.executeQuery(
      `DELETE FROM orders
       WHERE address ='${address}' AND idToken=${idToken}`
    )
  } 

}
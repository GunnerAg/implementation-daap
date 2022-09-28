import { OrderModel } from './../models/order.model';
import { TokenModel } from "./../models/token.model";
import { Service, Token } from "typedi";
import { nftScData } from '../smart-contracts'
@Service()
export class OrderService {

  constructor(
    private orderModel: OrderModel,
    private tokenModel: TokenModel
  ) { }

  async CreateOrder (idToken:number, amount: number): Promise<boolean> {
    try {
      nftScData.address
      const { insertId } = await this.orderModel.CreateOrder(nftScData.address, idToken, amount)
      if(!insertId){
        throw new Error("No se ha creado el registro")
      }
      return !!insertId;

    } catch (error) {
      throw new Error("Item not listed: " + error)
    }
  }

  async UpdateOrder(address: string, idToken:number, amount:number): Promise<boolean> {
    try {
      const { affectedRows } = await this.orderModel.UpdateOrder(address, idToken, amount)

      if(!affectedRows){
        throw new Error("Order not updated")
      }

      return !!affectedRows;
      
    } catch (error) {
      throw new Error("Order not updated: " + error)
    }
  } 

  async DeleteOrder(idToken:number): Promise<boolean> {
    try {
      const { affectedRows } = await this.orderModel.DeleteOrder(nftScData.address, idToken)

      if (!affectedRows) {
        throw new Error("Order not deleted")
      }

      return !!affectedRows;

    } catch (error) {
      throw new Error("Order not deleted" + error)
    }
  }

  async GetAllOrders() {
    const response = []
    const orders:any[] = await this.orderModel.GetAll()
    const tokens: any[] = await this.tokenModel.GetAll()
    tokens.forEach(token => {
      orders.forEach(order =>{
        if(order.idToken === token.id) response.push({...token, ...order})
      });
    });

    return response;

  }
}
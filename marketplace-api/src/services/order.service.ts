import { TokenModel } from '../models/token.model';
import { OrderModel } from '../models/order.model'
import { Service } from 'typedi'
// import { listItem } from '../helpers/web3'
const json = require('../smart-contracts/build/Nft.json');

@Service()
export class OrderService {
  /**
     * The constructor function is a special function that is called when a new instance of the class is
     * created
     * @param {OrderModel} orderModel - This is the model that we created in the previous step.
     */
  constructor (
    private orderModel: OrderModel,
    private tokenModel: TokenModel
  ) { }

  /**
   * It creates an order in the database and returns a boolean value
   * @param address - The address of the user who is making the order.
   * @param idToken - The user's idToken.
   * @param amount - The amount of the transaction in ETH.
   * @param name - The name of the item
   * @param imgURL - The URL of the image that will be displayed in the order.
   * @param rarity - 1 = common, 2 = rare, 3 = epic, 4 = legendary
   * @returns The insertId is being returned.
   */
  async CreateOrder ( idToken:number, amount:number): Promise<boolean> {
    console.log(idToken, amount, typeof idToken, typeof amount);
    try {
        // await listItem(idToken, amount);
        const networkId = Object.keys(json.networks)[0];
        const address = json.networks[networkId].address;
        const { insertId } = await this.orderModel.CreateOrder(address, idToken, amount)

        if (!insertId) {
          throw new Error('No se ha creado el registro')
        }

        return !!insertId;
    } catch (error) {
      throw new Error("item not listed" + error)
    }
  }

  /**
   * It updates the order in the database
   * @param address - The address of the user who is making the order.
   * @param idToken - The user's idToken.
   * @param amount - The amount of tokens to be purchased.
   * @returns The number of affected rows.
   */
  async UpdateOrder (address: string, idToken: number, amount: number): Promise<boolean> {
    const { affectedRows } = await this.orderModel.UpdateOrder(address, idToken, amount)

    if (!affectedRows) {
      throw new Error('No se ha modificado el registro')
    }

    return !!affectedRows;
  }

  /**
   * It deletes an order from the database
   * @param address - The address of the user who is making the request.
   * @param idToken - The user's idToken.
   * @returns A boolean value.
   */
  async DeleteOrder (idToken: number): Promise<boolean> {
    const networkId = Object.keys(json.networks)[0];
    const address = json.networks[networkId].address
    console.log('DELETE', idToken, address)
    const { affectedRows } = await this.orderModel.DeleteOrder(address, idToken)

    if (!affectedRows) {
      throw new Error('No se ha eliminado el registro')
    }

    return !!affectedRows;
  }

  /**
   * Get all breaks
   * @returns Sign list
   */
  async GetAllOrders (): Promise<any> {
    const response =[]
    const orders:any[] = await this.orderModel.GetAll()
    const tokens: any[] = await this.tokenModel.GetAll()
    tokens.forEach(token => {
        orders.forEach(order => {
          if (order.idToken === token.id) response.push({...token, ...order})
        });
    });

    // console.log(tokens)
    // console.log('')
    // console.log(orders)

    return response;
  }
}

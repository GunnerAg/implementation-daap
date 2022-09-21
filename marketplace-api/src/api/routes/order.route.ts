import { OrderService } from '../../services/order.service'
import { NextFunction, Router } from 'express'
import Container from 'typedi'
import { isValidOrderCreate, isValidOrderUpdate, isValidOrderDelete } from '../middlewares/validation.middleware'
const contractJson = require("../../smart-contracts/build/Marketplace.json") 

const route = Router()

export default (app: Router): void => {
  app.use(route)
  
  app.post('/create_order', isValidOrderCreate, async (req: any, res, next: NextFunction) => {
    try {
      const orderService = Container.get(OrderService)
      const { idToken, amount } = req.body
      console.log('NEW ORDER:', idToken, amount)
      const result = await orderService.CreateOrder(idToken, amount)
      console.log('set order result', result)
      if (!result) {
        return next({ status: 400, message: 'La orden de venta no se ha creado correctamente' })
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.get('/orders', async (req: any, res, next: NextFunction) => {
    try {
      const orderService = Container.get(OrderService)
      const result = await orderService.GetAllOrders()
      console.log('ORDERS!!', result)
      if (!result) {
        return next({ status: 400, message: 'Error al obtener datos del marketplace' })
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.put('/update_order', isValidOrderUpdate, async (req: any, res, next: NextFunction) => {
    try {
      const orderService = Container.get(OrderService)
      const { address, idToken, amount } = req.body
      const result = await orderService.UpdateOrder(address, idToken, amount)
      if (!result) {
        return next('Sell order not updated')
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.put('/delete_order', async (req: any, res, next: NextFunction) => {
    try {
      const orderService = Container.get(OrderService)
      const { idToken } = req.body
      console.log('delete :',idToken)
      const result = await orderService.DeleteOrder(idToken)
      if (!result) {
        return next('Sell order not deleted')
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.get('/orders_contract', async (req: any, res, next: NextFunction) => {
    try {
      const networkId = Object.keys(contractJson.networks)[0];
      return res.json({
        abi: contractJson.abi,
        address: contractJson.networks[networkId].address
      }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })
}

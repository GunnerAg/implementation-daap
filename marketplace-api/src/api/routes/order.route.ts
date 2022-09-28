import { OrderService } from './../../services/order.service';
import { NextFunction, Router } from "express";
import Container from "typedi";
import { isValidOrderCreate, isValidUpdateOrder } from '../middlewares/validation.middleware'
import { marketScData } from '../../smart-contracts'

const route = Router()

export default (app: Router): void => {
  app.use(route)

  // POST-PUT-GET-DELETE
  app.post('/create_order', isValidOrderCreate, async (req: any, res, next: NextFunction) => {
    try {
      const { idToken, amount } = req.body;
      const orderService = Container.get(OrderService)
      const result = await orderService.CreateOrder(idToken, amount)
      if (!result) {
        return next({ status: 400, message: "La orden de venta no se ha creado correctamente" })
      }
      return res.json({ result }).status(200)

    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })

  app.get('/orders', async (req: any, res, next: NextFunction) => {
    try {
      const orderService = Container.get(OrderService)
      const result = await orderService.GetAllOrders()
      if (!result) {
        return next({ status: 400, message: "Error al obtener datos del marketplace" })
      }
      return res.json({ result }).status(200)

    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })


  app.put('/update_order', isValidUpdateOrder, async (req: any, res, next: NextFunction) => {
    try {
      const { address, idToken, amount } = req.body;
      const orderService = Container.get(OrderService)
      const result = await orderService.UpdateOrder(address, idToken, amount)
      if (!result) {
        return next({ status: 400, message: "Sell order not updated" })
      }
      return res.json({ result }).status(200)

    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })

  app.put('/delete_order', async (req: any, res, next: NextFunction) => {
    try {
      const { idToken } = req.body;
      const orderService = Container.get(OrderService)
      const result = await orderService.DeleteOrder(idToken)
      if (!result) {
        return next({ status: 400, message: "Sell order not deleted" })
      }
      return res.json({ result }).status(200)

    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })


  app.get('/orders_contract', async (req: any, res, next: NextFunction) => {
    try {
      return res.json(marketScData).status(200)

    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })
}
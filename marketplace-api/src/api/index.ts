import { Router } from "express";
import orderRoute from "./routes/order.route";
import tokenRoute from "./routes/token.route";


export default (): Router => {
  const app = Router()

  orderRoute(app)
  tokenRoute(app)

  return app
}
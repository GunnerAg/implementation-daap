import { TokenService } from '../../services/token.service'
import { NextFunction, Router } from 'express'
import Container from 'typedi'
import { isValidTokenCreate } from '../middlewares/validation.middleware'
const contractJson = require("../../smart-contracts/build/Nft.json");

const route = Router()

export default (app: Router): void => {
  app.use(route)

  app.post('/create_nft', isValidTokenCreate, async (req: any, res, next: NextFunction) => {
    try {
      const tokenService = Container.get(TokenService)
      const { name, imgURL, rarity, id } = req.body;
      console.log('MINT', name, imgURL, rarity, id)
      const result = await tokenService.CreateToken(name, imgURL, rarity, id)
      console.log('MINTED', result)

      if (!result) {
        return next({ status: 400, message: 'La orden de venta no se ha creado correctamente' })
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.get('/all', async (req: any, res, next: NextFunction) => {
    try {
      const tokenService = Container.get(TokenService)
      const result = await tokenService.GetAllTokens()
      if (!result) {
        return next({ status: 400, message: 'Error al obtener datos del marketplace' })
      }
      return res.json({ result }).status(200)
    } catch (e) {
      console.error('🔥 error: %o', e)
      return next(e)
    }
  })

  app.get('/token_contract', async (req: any, res, next: NextFunction) => {
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

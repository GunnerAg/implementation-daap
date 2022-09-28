import { TokenService } from './../../services/token.service';
import { Router, NextFunction } from 'express';
import { isValidTokenCreate } from '../middlewares/validation.middleware'
import Container from 'typedi';
import { nftScData } from '../../smart-contracts'

const route = Router()

export default (app: Router): void => {
  app.use(route)

  app.post('/create_nft', isValidTokenCreate, 
  async(req:any, res:any, next:NextFunction)=>{
    try {
      const { name, imgUrl, rarity, id } = req.body;
      const tokenService = Container.get(TokenService)
      const result = await tokenService.CreateToken(name, imgUrl, rarity, id)

      if (!result) {
        return next({ status: 400, message: 'El token no se ha añadido correctamente' })
      }
      return res.json({ result }).status(200)
    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })

  app.get('/all', async (req: any, res: any, next: NextFunction) => {
    try {
      const tokenService = Container.get(TokenService)
      const result = await tokenService.GetAllTokens()

      if (!result) {
        return next({ status: 400, message: 'Error al obtener datos del marketplace' })
      }
      return res.json({ result }).status(200)
    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })

  app.get('/token_contract', async (req: any, res, next: NextFunction) => {
    try {
      return res.json(nftScData).status(200)
      
    } catch (error) {
      console.error('🔥Error', error);
      return next(error)
    }
  })
}
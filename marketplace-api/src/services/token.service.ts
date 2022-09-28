import { TokenModel } from "../models/token.model";
import { Service, Token } from "typedi";

@Service()
export class TokenService {

  constructor(
    private tokenModel: TokenModel
  ) { }

  async CreateToken(name: string, imgUrl:string, rarity:number, id:number): Promise<boolean> {
    try {
      const { insertId } = await this.tokenModel.CreateToken(name, imgUrl, rarity, id)

      if (!insertId) {
        throw new Error('El token no se ha añadido correctamente')
      }

      return !!insertId;

    } catch (error) { 
      throw new Error('El token no se ha añadido correctamente' + error)
    }

  }

  async GetAllTokens(): Promise<any> {
    return await this.tokenModel.GetAll()
  }
}
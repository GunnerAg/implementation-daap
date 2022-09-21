import { TokenModel } from '../models/token.model'
import { Service } from 'typedi'

@Service()
export class TokenService {
  /**
   * A constructor function.
   * @param {TokenModel} tokenModel - TokenModel
   */
  constructor (
    private tokenModel: TokenModel
  ) { }

  /**
   * Create a token and return true if the token was created, otherwise throw an error.
   * @param name - string
   * @param imgURL - https://i.imgur.com/QQQQQQQ.png
   * @param rarity - 1, 2, 3, 4, 5
   * @returns The insertId is being returned.
   */
  async CreateToken (name, imgURL, rarity, id): Promise<boolean> {
    const { insertId } = await this.tokenModel.CreateToken(name, imgURL, rarity, id)

    if (!insertId) {
      throw new Error('No se ha creado el registro')
    }
    console.log('Token created:', insertId);

    return !!insertId;
  }

  /**
   * GetAllTokens() returns a promise that resolves to the result of calling GetAll() on the tokenModel
   * object.
   * @returns The result of the GetAll() function.
   */
  async GetAllTokens (): Promise<any> {
    return await this.tokenModel.GetAll()
  }
}

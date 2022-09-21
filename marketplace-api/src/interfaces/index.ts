
export interface IOrder {
  idOrder: number;
  address:string;
  idToken: number;
  amount: number;
}

export interface IToken {
  idToken?: number;
  id: number;
  name: string;
  rarity: number;
  imgURL: string;
}

import { Service } from 'typedi'

@Service()
export class UserHelper {
  /**
   * Create username
   * @param name Name
   * @param surname Surname
   */
  createUsername (name: string, surname: string): string {
    return `${name.toLowerCase().trim().slice(0, 1)}${surname.toLowerCase().trim()}.`
  }

  /**
   * Create username
   */
  createPassword (): string {
    return Math.random().toString(35).slice(2)
  }
}

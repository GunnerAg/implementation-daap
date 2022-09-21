import { celebrate, Joi } from 'celebrate'

const isValidOrderCreate = celebrate({
  body: Joi.object({
    idToken: Joi.number().required(),
    amount: Joi.number().required()
  })
})

const isValidTokenCreate = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    imgURL: Joi.string().required(),
    rarity: Joi.number().required(),
    id: Joi.number().required()
  })
})

const isValidOrderUpdate = celebrate({
  body: Joi.object({
    address: Joi.string().required(),
    idToken: Joi.number().required(),
    amount: Joi.number().required(),
  })
})

const isValidOrderDelete = celebrate({
  body: Joi.object({
    idToken: Joi.number().required(),
  })
})

export {
  isValidOrderCreate,
  isValidOrderUpdate,
  isValidOrderDelete,
  isValidTokenCreate
}

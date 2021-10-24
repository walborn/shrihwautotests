import {
  CartState,
  CheckoutResponse,
  Product,
  ProductShortInfo,
} from 'src/common/types'


export const product = (id: number): Product => ({
  id,
  name: 'Сырный сыр',
  price: 123,
  description: 'Сыром кашу не испортишь',
  material: 'cheese',
  color: 'yellow',
})

export const shortProduct = (id: number): ProductShortInfo => {
  const { name, price } = product(id)
  return { id, name, price }
}

export const products = (length: number): ProductShortInfo[] => Array
  .from({ length }, (_, i: number) => product(i))

export const checkout = (id: number): CheckoutResponse => ({ id })

export const cart = (id: number): CartState => ({
  [id]: {
    name: 'Чеддер',
    price: 256 + id ** 2,
    count: 1 + id % 3,
  }
})

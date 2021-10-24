import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render, RenderResult } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import events from '@testing-library/user-event'

import { CartItem } from 'src/common/types'
import { CartApi } from 'src/client/api'
import { Cart } from 'src/client/pages/Cart'

import * as stubs from 'test/unit/stubs'

import { StoreProvider } from 'test/unit/utils/StoreProvider'
import { Root } from 'test/unit/utils/Root'


const renderCart = () => render(
  <StoreProvider>
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  </StoreProvider>
)

const count = (container: HTMLElement): number => container
  .querySelectorAll('.Cart-Table .Cart-Index').length


const append = (id: number): RenderResult => {
  const cartApi = new CartApi()
  cartApi.setState(stubs.cart(id))
  const container = renderCart()
  cartApi.setState({})

  return container
}

describe('Корзина', () => {
  it('Изначально пустая', () => {
    const { container } = render(<Root path='/cart' />)
    expect(count(container)).toBe(0)
  })

  it('В пустой корзине отображается ссылка на каталог товаров', async () => {
    const { container } = render(<Root path='/cart' />)

    const n = Array
      .from(container.querySelectorAll('.Cart a'))
      .filter(i => i.getAttribute('href').endsWith('/catalog'))
    expect(n.length).toBe(1)
  })

  it('Можно добавить товар', () => {
    append(123)
    screen.getByTestId(123)
  })

  it('Отображается сумма заказа', () => {
    const cart = new CartApi()
    const itemsCart = { ...stubs.cart(0), ...stubs.cart(1) }
    const totalPrice = Object.values(itemsCart)
      .reduce((acc: number, itemCart: CartItem) =>  acc + (itemCart.price * itemCart.count), 0)

    cart.setState(itemsCart)
    renderCart()
    screen.getByText(`$${totalPrice}`)
    cart.setState({})
  })

  it('Очищается', async () => {
    const cart = new CartApi()
    const { container } = append(123)
    const buttonSubmit = screen.getByRole('button', { name: 'Clear shopping cart' })

    await events.click(buttonSubmit)

    expect(count(container)).toBe(0)
    cart.setState({})
  })
})

describe('Заказ', () => {
  it('есть возможность оформления', async () => {
    const { container } = append(3)
    expect(container.querySelector('.Form')).toBeDefined()
  })

  it('C пустой формой не сабмитится', async () => {
    const cart = new CartApi()
    const {container} = append(3)
    const buttonSubmit = screen.getByRole('button', { name: 'Checkout' })

    await events.click(buttonSubmit)

    const issetNoValidInput = !!container.querySelector('.Form .Form-Field.is-invalid')

    expect(issetNoValidInput).toBeTruthy()
    cart.setState({})
  })

  it('Оформляется', async () => {
    const cart = new CartApi()
    const { container } = append(3)
    const inputName = screen.getByRole('textbox', {name: /name/i})
    const inputPhone = screen.getByRole('textbox', {name: /phone/i})
    const inputAddress = screen.getByRole('textbox', {name: /address/i})
    const buttonSubmit = screen.getByRole('button', {name: /Checkout/i})

    events.type(inputName, 'Ivan Pupkin')
    events.type(inputPhone, '89251234567')
    events.type(inputAddress, 'Москва, ул. Мира, кв. 123')
    await events.click(buttonSubmit)

    const issetSuccessMessage = !!container.querySelector('.Cart-SuccessMessage')

    expect(container.querySelector('.Cart-SuccessMessage')).toBeDefined()
    cart.setState({})
  })
})

describe('Атрибуты', () => {
  it('Название', async () => {
    const productId = 3
    const cart = new CartApi()
    const dataCart = stubs.cart(productId)
    const product = dataCart[productId]

    cart.setState(dataCart)
    renderCart()

    const elItemCart = screen.getByTestId(productId)
    const valueOnCell = elItemCart.querySelector('.Cart-Name').innerHTML

    expect(valueOnCell).toBe(product.name)
    cart.setState({})
  })

  it('Цена', async () => {
    const productId = 3
    const cart = new CartApi()
    const dataCart = stubs.cart(productId)
    const product = dataCart[productId]

    cart.setState(dataCart)
    renderCart()


    const elItemCart = screen.getByTestId(productId)
    const valueOnCell = elItemCart.querySelector('.Cart-Price').innerHTML

    expect(valueOnCell).toBe(`$${product.price}`)
    cart.setState({})
  })

  it('Количество', async () => {
    const productId = 3
    const cart = new CartApi()
    const dataCart = stubs.cart(productId)
    const product = dataCart[productId]

    cart.setState(dataCart)
    renderCart()

    const elItemCart = screen.getByTestId(productId)
    const valueOnCell = elItemCart.querySelector('.Cart-Count').innerHTML

    expect(valueOnCell).toBe(product.count.toString())
    cart.setState({})
  })

  it('Сумма заказа', async () => {
    const productId = 3
    const cart = new CartApi()
    const dataCart = stubs.cart(productId)
    const product = dataCart[productId]

    cart.setState(dataCart)
    renderCart()

    const elItemCart = screen.getByTestId(productId)
    const valueOnCell = elItemCart.querySelector('.Cart-Total').innerHTML

    expect(valueOnCell).toBe(`$${product.price * product.count}`)
    cart.setState({})
  })
})
import React from 'react'

import { render, RenderResult } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import events from '@testing-library/user-event'

import { CartApi } from 'src/client/api'
import { Product } from 'src/common/types'
import { ProductDetails } from 'src/client/components/ProductDetails'

import * as stubs from 'test/unit/stubs'
// import {stubs.cart, stubs.product} from "../../../../stubs"
import { StoreProvider } from 'test/unit/utils/StoreProvider'


const renderProduct = (product: Product): RenderResult => render(
    <StoreProvider>
      <ProductDetails product={product} />
    </StoreProvider>
  )
  
describe('На странице товара', () => {
  it('отображается название', () => {
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const value = container.querySelector('.ProductDetails-Name').innerHTML

    expect(value).toBe(product.name)
  })

  it('отображается описание', () => {
    
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const value = container.querySelector('.ProductDetails-Description').innerHTML

    expect(value).toBe(product.description)
  })

  it('отображается цена', () => {
    
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const value = container.querySelector('.ProductDetails-Price').innerHTML

    expect(value).toBe(`$${product.price}`)
  })

  it('отображается цвет', () => {
    
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const value = container.querySelector('.ProductDetails-Color').innerHTML

    expect(value).toBe(product.color)
  })

  it('отображается материал', () => {
    
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const value = container.querySelector('.ProductDetails-Material').innerHTML

    expect(value).toBe(product.material)
  })

  it('отображается кнопка добавления в корзину', () => {
    
    const product = stubs.product(3)
    const {container} = renderProduct(product)
    const issetButton = !!container.querySelector('.ProductDetails-AddToCart')

    expect(issetButton).toBeTruthy()
  })

  it('добавляется в корзину', () => {
    const productId = 3
    const product = stubs.product(productId)
    const cart = new CartApi()

    cart.setState(stubs.cart(productId))
    renderProduct(product)

    const cartState = cart.getState()

    expect(cartState).toHaveProperty(productId.toString())
    cart.setState({})
  })

  it('отображается сообщение о наличии товара в корзине, если он добавлен в корзину', () => {
    const productId = 3
    
    const product = stubs.product(productId)
    const cart = new CartApi()

    cart.setState(stubs.cart(productId))
    renderProduct(product)
    screen.getByText('Item in cart')
    cart.setState({})
  })

  it('Повторное нажатие кнопки "добавить в корзину" должно увеличивать количество данного товара в корзине', async () => {
    const productId = 3
    const product = stubs.product(productId)
    const cart = new CartApi()

    renderProduct(product)

    const buttonSubmit = screen.getByRole('button', { name: 'Add to Cart' })

    await events.click(buttonSubmit)

    let countCurProductInCart = cart.getState()?.[productId]?.count

    expect(countCurProductInCart).toBe(1)
    await events.click(buttonSubmit)
    countCurProductInCart = cart.getState()?.[productId]?.count
    expect(countCurProductInCart).toBe(2)
    cart.setState({})
  })
})
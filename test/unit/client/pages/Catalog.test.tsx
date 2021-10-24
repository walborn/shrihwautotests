
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {render, RenderResult, within} from "@testing-library/react"
import { screen } from '@testing-library/dom'
import events from '@testing-library/user-event'

import { CartApi } from 'src/client/api'
import { Catalog } from 'src/client/pages/Catalog'

import { MockApi } from 'test/unit/mock/api'
import * as stubs from 'test/unit/stubs'
import { StoreProvider } from 'test/unit/utils/StoreProvider'
import { Root } from 'test/unit/utils/Root'


const CatalogRender = (): RenderResult => render(
  <StoreProvider>
    <BrowserRouter>
      <Catalog />
    </BrowserRouter>
  </StoreProvider>
)

describe('Каталог', () => {
    it('Отображаются товары, список которых приходит с сервера', async () => {
        const mockApi = new MockApi('/')
        const products = await mockApi.getProducts()
        const productsId = products?.data?.map((product) => product.id)

        await CatalogRender()
        productsId.forEach((id) => screen.getAllByTestId(id))
    })

    it('для каждого товара отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const mockApi = new MockApi('/')
        const products = await mockApi.getProducts()
        await CatalogRender()

        products.data.forEach(({ id, name, price }) => {
            const $product = screen.getAllByTestId(id)?.[0]
            within($product).getByRole('heading', { name, level: 5 })
            within($product).getByText(`$${price}`)
            within($product).getByRole('link', { name: 'Details' })
        })
    })

    it('ссылка ведет на страницу с подробной информацией о товаре', async () => {
        const mockApi = new MockApi('/')
        const products = await mockApi.getProducts()
        const product = products.data[0]

        await render(<Root path="/catalog" />)

        const elProduct = screen.getAllByTestId(product.id)?.[0]
        const link = within(elProduct).getByRole('link', { name: 'Details' })

        await events.click(link)
        screen.getByRole('heading', { name: product.name, level: 1 })
    })

    it('У товара, добавленного в корзину, отображается сообщение, что он уже положен туда', async () => {
        const productId = 0
        const cart = new CartApi()

        cart.setState(stubs.cart(productId))
        await CatalogRender()

        const elProduct = screen.getAllByTestId(productId)?.[0]

        within(elProduct).getByText('Item in cart')
        cart.setState({})
    })
})
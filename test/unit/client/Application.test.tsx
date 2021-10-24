import React from 'react'

import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import events from '@testing-library/user-event'

import { Root } from 'test/unit/utils/Root'


describe('Страницы. Проверка наличия', () => {
  it('Example store', () => {
    render(<Root path='/' />)
    screen.getByText('Welcome to Example store!')
  })
  it('Catalog', () => {
    render(<Root path='/catalog' />)
    screen.getByRole('heading', { name: 'Catalog', level: 1 })
  })
  it('Delivery', () => {
    render(<Root path='/delivery' />)
    screen.getByRole('heading', { name: 'Delivery', level: 1 })
  })
  it('Contacts', () => {
    render(<Root path='/contacts' />)
    screen.getByRole('heading', { name: 'Contacts', level: 1 })
  })
  it('Shopping cart', () => {
    render(<Root path='/cart' />)
    screen.getByRole('heading', { name: 'Shopping cart', level: 1 })
  })
})
 
describe('В шапке есть ссылки на', () => {
  it('главную страницу', async () => {
    render(<Root path='/' />)
    const link = screen.getByRole('link', { name: 'Example store' })
    expect(link.getAttribute('href')).toBe('/')
  })

  it('catalog', () => {
    render(<Root path='/catalog' />)
    const link = screen.getByRole('link', { name: 'Catalog' })
    expect(link.classList.contains('active')).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/catalog')
  })

  it('delivery', () => {
    render(<Root path='/delivery' />)
    const link = screen.getByRole('link', { name: 'Delivery' })
    expect(link.classList.contains('active')).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/delivery')
  })

  it('contacts', () => {
    render(<Root path='/contacts' />)
    const link = screen.getByRole('link', { name: 'Contacts' })
    expect(link.classList.contains('active')).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/contacts')
  })

  it('cart', () => {
    render(<Root path='/cart' />)
    const link = screen.getByRole('link', { name: 'Cart' })
    expect(link.classList.contains('active')).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/cart')
  })
})
 
describe('General', () => {
  it('Название магазина в шапке является ссылкой на главную страницу', async () => {
    render(<Root path='/cart' />)
    const link = {
      home: screen.getByRole('link', { name: 'Example store' }),
      cart: screen.getByRole('link', { name: 'Cart' }),
    }
    await events.click(link.home)
    expect(link.cart.classList.contains('active')).toBeFalsy
  })
 
  it('При выборе элемента из меню "гамбургера" оно закрывается', async () => {
    render(<Root path='/' />)
 
    const link = screen.getByRole('link', { name: 'Cart' })
    const navbar = screen.getByRole('navigation', { name: '' })
    
    await events.click(link)
    expect(navbar.querySelector('.navbar-collapse.collapse')).toBeTruthy()
  })
})
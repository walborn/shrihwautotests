describe('Корзина', async function() {
  it('Сохранение состояние корзины после обновления страницы', async function() {
    await this.browser.url('/hw/store/catalog')
    await this.browser.$('.ProductItem-DetailsLink').click()
    await this.browser.$('.ProductDetails-AddToCart').click()
    await this.browser.url('/hw/store/cart')
    await this.browser.url('/hw/store/cart')

    await this.browser.assertView('plain', '.Cart', {
      compositeImage: true,
    })

    await this.browser.$('.Cart-Clear').click()
  })
})

describe('Главная страница', async function() {
  it('проверка скриншотом', async function() {
    await this.browser.url('/hw/store/')

    await this.browser.assertView('plain', '.Home', {
      compositeImage: true,
    })
  })
})

describe('Страница доставки', async function() {
  it('проверка скриншотом', async function() {
    await this.browser.url('/hw/store/delivery')

    await this.browser.assertView('plain', '.Delivery', {
      compositeImage: true,
    })
  })
})

describe('Контакты', async function() {
  it('проверка скриншотом', async function() {
    await this.browser.url('/hw/store/contacts')

    await this.browser.assertView('plain', '.Contacts', {
      compositeImage: true,
    })
  })
})

describe('Каталог', async function() {
  it('проверка скриншотом', async function() {
    await this.browser.url('/hw/store/catalog')

    await this.browser.assertView('plain', '.Catalog', {
      compositeImage: true,
    })
  })
})

// describe('[H] Страница товара', async function() {
//   it('проверка скриншотом', async function() {
//     await this.browser.url('/hw/store/catalog')
//     await this.browser.$('.ProductItem-DetailsLink').click()
//
//     await this.browser.assertView('plain', '.Product', {
//       compositeImage: true,
//     })
//   })
// })

// this.browser.setWindowSize(1380, 1024)
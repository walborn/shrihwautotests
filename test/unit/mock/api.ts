import { AxiosResponse } from 'axios'
   
import {
  CartState,
  CheckoutFormData,
  CheckoutResponse,
  Product,
  ProductShortInfo
} from 'src/common/types'
import { ExampleApi } from 'src/client/api'

import * as stubs from 'test/unit/stubs'  

class MockApi extends ExampleApi {
  async getProducts() {
    return { data: stubs.products(3) } as AxiosResponse<ProductShortInfo[]>  
  }

  async getProductById(id: number) {
    return { data: stubs.product(id) } as AxiosResponse<Product>  
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    return { data: stubs.checkout(33) } as AxiosResponse<CheckoutResponse>  
  }
}



export { MockApi }  
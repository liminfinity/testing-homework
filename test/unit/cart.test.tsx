import React from "react"
import { Cart } from "../../src/client/pages/Cart"
import { renderApp } from "../utils"
import { CartApi } from "../../src/client/api"
import { CartState } from "../../src/common/types"
import {screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Application } from "../../src/client/Application"


const cart: CartState = {
    1: { name: 'Product 1', count: 1, price: 1000 },
    2: { name: 'Product 2', count: 2, price: 2000 },
    3: { name: 'Product 3', count: 3, price: 3000 },
}

const cartLength = Object.keys(cart).length
const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.count, 0)


describe('Корзина', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    describe('Корзина с товарами', () => {
        beforeAll(() => {
            jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
        })
        it('Отображается таблица с добавленными в корзину товарами', async () => {
            const {container} = renderApp(<Cart/>)
            const cartBody = await waitFor(() => container.querySelectorAll('tbody tr'));
            expect(cartBody).toHaveLength(cartLength);
        })
        it('В корзине отображается кнопка "очистить корзину", если в ней есть хотя бы один элемент', async () => {
            
            const {findByText} = renderApp(<Cart/>)
            
            const clearCartBtn = await findByText('Clear shopping cart');
            expect(clearCartBtn).toBeInTheDocument();
        })
        it('При нажатии на кнопку "очистить корзину", все товары удаляются', async () => {
            
            const {findByText, container} = renderApp(<Cart/>)
            
            const clearCartBtn = await findByText('Clear shopping cart');
    
            await userEvent.click(clearCartBtn);
    
            const cartBody = await waitFor(() => container.querySelectorAll('tbody tr'));
            expect(cartBody).toHaveLength(0);
        })
        it('Для каждого товара отображается название, цена, количество и стоимость', async () => {
            
            const {container} = renderApp(<Cart/>)
            
            const cartBody = await waitFor(() => container.querySelectorAll('tbody tr'));
    
            for (let i = 0; i < cartBody.length; i++) {
                const product = cartBody[i];
                const productCart = cart[i + 1];
                
                waitFor(() => {
                    expect(product.querySelector('td:nth-child(1)').textContent).toEqual(productCart.name);
                    expect(product.querySelector('td:nth-child(2)').textContent).toEqual('$' + productCart.price);
                    expect(product.querySelector('td:nth-child(3)').textContent).toEqual(productCart.count)
                    expect(product.querySelector('td:nth-child(4)').textContent).toEqual('$' + productCart.price * productCart.count);
                })
            }
        })
        it('Отображается общая стоимость заказа', async () => {
            
            const {container} = renderApp(<Cart/>)
            
            const orderPrice = await waitFor(() => container.querySelector('tfoot tr td:nth-child(2)'));
    
            expect(orderPrice.textContent).toEqual('$' + totalPrice);
    
        })
    })
    describe('Пустая корзина', () => {
        beforeAll(() => {
            jest.spyOn(CartApi.prototype, 'getState').mockReturnValue({});
        })
        it('Отображается ссылка на каталог товаров', async () => {
            
            const {findByRole} = renderApp(<Cart/>)
    
            const link = await findByRole('link');
    
            expect(link).toHaveAttribute('href', '/catalog');
        })
    }) 
    describe('Ссылка на корзину', () => {
        beforeAll(() => {
            jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
        })
        it('В шапке рядом со ссылкой на корзину отображается количество не повторяющихся товаров в ней', async () => {
            
            const {container} = renderApp(<Application/>);

            const cartLink = await waitFor(() => container.querySelector('[href="/cart"]'));

            expect(cartLink.textContent).toBe(new RegExp(`Cart (${cartLength})`).source);

        })
    })
})



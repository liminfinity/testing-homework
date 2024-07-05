import React from "react";
import { Cart } from "../../src/client/pages/Cart";
import { renderApp } from "../utils";
import { CartApi } from "../../src/client/api";
import { CartState, CheckoutResponse } from "../../src/common/types";
import userEvent from "@testing-library/user-event";
import { waitFor, screen, getByText } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import axios from "axios";

const cart: CartState = {
    1: { name: 'Product 1', count: 1, price: 1000 },
    2: { name: 'Product 2', count: 2, price: 2000 },
    3: { name: 'Product 3', count: 3, price: 3000 },
}

const checkoutResponse: {data: CheckoutResponse} = {
    data: {
        id: 1,
    }
} 


describe('Форма оформления заказа', () => {

    beforeAll(() => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
        jest.spyOn(axios, 'post').mockResolvedValue(checkoutResponse);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('Отображается при наличии товара в корзине', async () => {
        const {container} = renderApp(<Cart/>);

        const cartBody = await waitFor(() => container.querySelector('.Form'));

        expect(cartBody).toBeInTheDocument();
    })
    it('После отправления формы появляется сообщение об успешной отправке и ссылка на каталог товаров', async () => {
        const {findByText, container} = renderApp(<Cart/>);

        const inputName = await waitFor(() => container.querySelector('#f-name'));
        await userEvent.type(inputName, faker.person.fullName());
        
        const inputPhone = await waitFor(() => container.querySelector('#f-phone'));
        await userEvent.type(inputPhone, faker.phone.number());

        const inputAddress = await waitFor(() => container.querySelector('#f-address'));
        await userEvent.type(inputAddress, faker.location.streetAddress());

        const submitBtn = await waitFor(() => container.querySelector('.Form-Submit'));
        await userEvent.click(submitBtn);

        waitFor(async () => {
            expect(container.querySelector('.Cart-SuccessMessage')).toBeInTheDocument();
            expect(await findByText('catalog')).toHaveAttribute('href', '/catalog');

        });
        
    })
    it('В случае невалидного ввода имени появляется ошибка', async () => {

        const {findByText} = renderApp(<Cart/>);

        const submitBtn = await findByText('Checkout');
        await userEvent.click(submitBtn);
        const error = await findByText('Please provide your name');

        expect(error).toBeInTheDocument();
    })
    it('В случае невалидного ввода телефона появляется ошибка', async () => {

        const {findByText, container} = renderApp(<Cart/>);

        const inputPhone = await waitFor(() => container.querySelector('input#f-phone'));
        await userEvent.type(inputPhone, '123');
        const submitBtn = await findByText('Checkout');
        await userEvent.click(submitBtn);
        const error = await findByText('Please provide a valid phone');

        expect(error).toBeInTheDocument();
    })
    it('В случае невалидного ввода адреса появляется ошибка', async () => {

        const {findByText} = renderApp(<Cart/>);

        const submitBtn = await findByText('Checkout');
        await userEvent.click(submitBtn);
        const error = await findByText('Please provide a valid address');

        expect(error).toBeInTheDocument();
        
    })
})
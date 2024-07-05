import axios from "axios";
import { renderApp } from "../utils";
import { Catalog } from "../../src/client/pages/Catalog";
import React from "react";
import { CartState, ProductShortInfo } from "../../src/common/types";
import { waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { ProductItem } from "../../src/client/components/ProductItem";
import { CartApi } from "../../src/client/api";

const ReceivedProductCnt = 5;

const response: {data: ProductShortInfo[]} = {
    data: Array.from({length: ReceivedProductCnt}, (_, i) => {
        return {
            id: i + 1,
            name: faker.commerce.productName(),
            price: +faker.commerce.price()
        }
    })
}

const cart: CartState = {
    1: { ...response.data[0], count: 1 },
}

describe('Каталог всех товаров', () => {
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockResolvedValue(response);
    })
    afterAll(() => {
        jest.clearAllMocks();
    })
    it('Отображаются все товары, которые вернул api', async () => {

        const {container} = renderApp(<Catalog/>);

        await waitFor(() => {
            expect(container.querySelectorAll('.ProductItem')).toHaveLength(ReceivedProductCnt);
        })
    })
    
    it('Для каждого товара отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const product = response.data[0]
        const {getByText, getByRole} = renderApp(<ProductItem product={product}/>);
        const name = getByText(product.name);
        const price = getByText(`$${product.price}`);
        const link = getByRole('link');

        expect(name).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `/catalog/${product.id}`);
    })

    it('Если товар уже добавлен в корзину, в каталоге отображается сообщение об этом', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

        const {container} = renderApp(<Catalog/>);

        await waitFor(() => {
            expect(container.querySelector('.ProductItem .CartBadge')).toBeInTheDocument();
        })

    })
})
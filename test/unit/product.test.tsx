import axios from "axios";
import { Product as IProduct } from "../../src/common/types";
import {faker} from "@faker-js/faker";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { renderApp } from "../utils";
import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { Product } from "../../src/client/pages/Product";

const product: IProduct = {
    id: 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    color: faker.color.human(),
    material: faker.commerce.productMaterial(),
}

describe('Товар', () => {

    it('Отображается название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
        const {getByText} = renderApp(<ProductDetails product={product}/>);
        const name = getByText(product.name);
        const description = getByText(product.description);
        const price = getByText(`$${product.price}`);
        const color = getByText(product.color);
        const material = getByText(product.material);
        const addToCartBtn = getByText('Add to Cart');

        expect(name).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(material).toBeInTheDocument();
        expect(addToCartBtn).toBeInTheDocument();
    })
    it('Если товар добавлен в корзину, на странице отображается сообщение об этом', async () => {
        const {getByText, findByText} = renderApp(<ProductDetails product={product}/>);
        const addToCartBtn = getByText('Add to Cart');

        await userEvent.click(addToCartBtn);
        const badge = await findByText('Item in cart');

        expect(badge).toBeInTheDocument();
    })
})
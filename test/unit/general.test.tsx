import React from "react";
import { Application } from "../../src/client/Application";
import { renderApp } from "../utils";
import { waitFor } from "@testing-library/react";


describe('Главная страница', () => {
    it('Название магазина в шапке является ссылкой на главную страницу', async () => {

        const {container} = renderApp(<Application/>);

        waitFor(() => {
            expect(container.querySelector('[href="/"]')).toBeInTheDocument();
        });

    })
    it('В навигации отображаются ссылки на каталог, условия доставки, контакты и корзину', async () => {

        const {container} = renderApp(<Application/>);

        waitFor(() => {
            expect(container.querySelector("[href='/catalog']")).toBeInTheDocument();
            expect(container.querySelector("[href='/delivery']")).toBeInTheDocument();
            expect(container.querySelector("[href='/contacts']")).toBeInTheDocument();
            expect(container.querySelector("[href='/cart']")).toBeInTheDocument();
        });

    })
})


describe('Статические страницы', () => {
    it('Главная страница статическая', async () => {

        const {container} = renderApp(<Application/>, ['/']);

        expect(container).toMatchSnapshot('Главная страница');

    })
    it('Страница условий доставки статическая', async () => {

        const {container} = renderApp(<Application/>, ['/delivery']);

        expect(container).toMatchSnapshot('Страница условий доставки');

    })
    it('Страница контактов статическая', async () => {

        const {container} = renderApp(<Application/>, ['/contacts']);

        expect(container).toMatchSnapshot('Страница контактов');

    })
})
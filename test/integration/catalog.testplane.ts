describe('Каталог всех товаров', () => {

    //! Данный тест проверяет bug_id = 1, но не является описанием продуктового сценария. Для правильного написания теста без привязки к bug_id нужно писать unit тест для сервера
    it('Для каждого товара отображается название, цена и ссылка на страницу с подробной информацией о товаре', async ({browser}) => {
        await browser.url('/hw/store/catalog');
        const products = await browser.$$('.ProductItem');
        for (const product of products) {
            const name = await product.$('.ProductItem-Name');
            const price = await product.$('.ProductItem-Price');
            const link = await product.$('.ProductItem-DetailsLink');
            const nameText = await name.getText();
            const priceText = await price.getText();
            const linkHref = await link.getAttribute('href');
            expect(nameText).toBeTruthy();
            expect(priceText).toBeTruthy();
            expect(linkHref).toBeTruthy()
        }
    })
    it('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');

        await addToCartBtn.click();
        await browser.url('/hw/store/catalog');
        const badge = await browser.$('.ProductItem .CartBadge');
        
        expect(badge).toExist()
    })
})
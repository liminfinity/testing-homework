describe('Каталог всех товаров', () => {
    it('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');

        await addToCartBtn.click();
        await browser.url('/hw/store/catalog');
        const badge = await browser.$('.ProductItem .CartBadge');
        
        expect(badge).toExist()
    })
})
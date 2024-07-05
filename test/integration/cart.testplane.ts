describe('Корзина', () => {
    it('Содержимое корзины сохраняется между перезагрузками страницы', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');

        await addToCartBtn.click();
        await browser.url('/hw/store/cart');
        await browser.url('/hw/store/cart');
        const cartTable = await browser.$('.Cart-Table');
        await cartTable.waitForExist()

        expect(cartTable).toExist()
    })
})
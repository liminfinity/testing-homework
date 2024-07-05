describe('Товар', () => {
    it('При добавлении товара в корзину, увеличивается индикатор количества товаров рядом со ссылкой на корзину', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');

        await addToCartBtn.click();
        const cartLink1 = await browser.$('[href="/hw/store/cart"]');
        const cartLinkText1 = await cartLink1.getText();
        await browser.url('/hw/store/catalog/1');
        await addToCartBtn.click();
        const cartLink2 = await browser.$('[href="/hw/store/cart"]');
        const cartLinkText2 = await cartLink2.getText();

        expect(cartLinkText1).toEqual('Cart (1)')
        expect(cartLinkText2).toEqual('Cart (2)')
    })
    it('При повторном добавлении товара в корзину, не увеличивается индикатор количества товаров рядом со ссылкой на корзину', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');
        
        await addToCartBtn.click();
        await addToCartBtn.click();
        const cartLink = await browser.$('[href="/hw/store/cart"]');
        const cartLinkText = await cartLink.getText();

        expect(cartLinkText).toEqual('Cart (1)')
    })
    it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" увеличивает его количество и стоимость', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');
        const productPrice = await browser.$('.ProductDetails-Price');
        const productPriceText = (await productPrice.getText()).slice(1);
        await addToCartBtn.click();
        await addToCartBtn.click();

        await browser.url('/hw/store/cart');

        const productCnt = await browser.$('.Cart-Count');
        const productTotal = await browser.$('.Cart-Total');
        const productCntText = await productCnt.getText();
        const productTotalText = await productTotal.getText();

        expect(productCntText).toEqual('2')
        expect(productTotalText).toEqual('$' + +productPriceText * 2)

    })
})
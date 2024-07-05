describe('Адаптивность', () => {
    it('На ширине меньше 576px навигационное меню скрывается за "гамбургер"', async ({browser}) => {
        await browser.url('/hw/store');
        await browser.setWindowSize(575, 713);

        const toggler = await browser.$('.Application-Toggler.navbar-toggler');
        const menu = await browser.$('.Application-Menu.collapse');
        const isTogglerDisplayed = await toggler.getCSSProperty('display');
        const isMenuDisplayed = await menu.getCSSProperty('display');

        expect(isTogglerDisplayed.value).toEqual('block');
        expect(isMenuDisplayed.value).toEqual('none');
    })
    it('При нажатии на "гамбургер", меню открывается', async ({browser}) => {
        await browser.url('/hw/store');
        await browser.setWindowSize(575, 713);

        const toggler = await browser.$('.Application-Toggler.navbar-toggler');
        await toggler.click()
        const menu = await browser.$('.Application-Menu');

        const isMenuDisplayed = await menu.getCSSProperty('display');

        expect(isMenuDisplayed.value).toEqual('block');
    })
    
    it('При выборе элемента из меню "гамбургера", меню закрывается', async ({browser}) => {
        await browser.url('/hw/store');
        await browser.setWindowSize(575, 713);

        const toggler = await browser.$('.Application-Toggler.navbar-toggler');
        await toggler.click();
        const deliveryLink = await browser.$('[href="/hw/store/delivery"]');
        await deliveryLink.click();
        const menu = await browser.$('.Application-Menu.collapse');
        const isMenuDisplayed = await menu.getCSSProperty('display');

        expect(isMenuDisplayed.value).toEqual('none');
    })
    
})
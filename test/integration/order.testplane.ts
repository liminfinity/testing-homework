import { Faker, ru } from "@faker-js/faker";

const faker = new Faker({
   locale: [ru]
})

describe('Форма оформления заказа', () => {

    //! Данный тест проверяет bug_id = 2, 5, 8, 10, но не является описанием продуктового сценария. Для правильного написания теста без привязки к bug_id нужно писать unit тест для сервера
     it('После отправления формы появляется сообщение с id нового заказа', async ({browser}) => {
        await browser.url('/hw/store/catalog/0');
        const addToCartBtn = await browser.$('.ProductDetails-AddToCart');

        await addToCartBtn.click();
        await browser.url('/hw/store/cart');
        const orderForm = await browser.$('.Form');
        
        const inputName = await orderForm.$('input#f-name');
        await inputName.setValue(faker.person.fullName());

        const inputPhone = await orderForm.$('input#f-phone');
        await inputPhone.setValue('89133241212');

        const inputAddress = await orderForm.$('textarea#f-address');
        await inputAddress.setValue(faker.location.streetAddress());

        const sendBtn = await orderForm.$('.Form-Submit');
        await sendBtn.click();
        const successMessage = await browser.$('.Cart-SuccessMessage.alert-success');
        await successMessage.waitForExist();
        const orderId = await browser.$('.Cart-Number');
        const orderIdText = await orderId.getText();

        expect(successMessage).toExist();
        expect(orderIdText).toEqual("1");

     })
})
import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart',() => {
  it('add an existing product to the cart',() => {
    spyOn(localStorage, 'setItem');                   //(object we want to mock,(string)method we want to mock)

    spyOn(localStorage, 'getItem').and.callFake(() => {    //mock method
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);                           //Flaky test(sometimes passes, sometimes fails) fails bcoz it uses value from local storage to overcome we use mock
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //onlyworks when this method is spyOn
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('add an new product to the cart',() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);      //onlyworks when this method is spyOn
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
})
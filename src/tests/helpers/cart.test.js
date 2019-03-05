import { addProductToCart, removeCartProduct, removeAllProducts } from '../../helpers/cart';
import { getFormattedTime } from '../../helpers/time';

global.localStorage = {
  getItem: key => {
    return this.store[key] || null;
  },
  setItem: (key, value) => {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
};

describe('HELPERS TEST SUITE', () => {
  describe('Cart Helpers Test Suite', () => {
    it('should add product object to cart for supplied user', () => {
      addProductToCart('email@gmail.com', {
        product_id: 23
      });
      const addedItem = localStorage.getItem('email@gmail.com');
      expect(addedItem).toEqual('{"products":[{"product_id":23}]}');
    });

    it('should remove product from cart for supplied user', () => {
      removeCartProduct('email@gmail.com', 23);
      const userObject = localStorage.getItem('email@gmail.com');
      expect(userObject).toEqual('{"products":[]}');
    });

    it('should remove all the supplied user\'s product from cart', () => {
      removeAllProducts('email@gmail.com');
      const userObject = localStorage.getItem('email@gmail.com');
      expect(userObject).toEqual('{"products":[]}');
    });
  })

  describe('Time Converter Test Suite', () => {
      it('should convert timestamp to date/time', () => {
          const time = getFormattedTime(1551712339);
          expect(time).toEqual('Jan-19-1970 0:01');
      });
  });
});

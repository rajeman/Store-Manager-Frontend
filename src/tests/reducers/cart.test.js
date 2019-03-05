import cartReducer from '../../reducers/cart';
import {
  setAddCartModal,
  setCheckoutState,
  setCheckoutError,
} from '../../actions/cart';

describe('CART REDUCERS TEST SUITE', () => {
  it('should set the cart modal state', () => {
      const state = cartReducer(undefined, setAddCartModal('STATE_VISIBLE'));
      expect(state.cartAddModalState).toEqual('STATE_VISIBLE');
  });

  it('should set the cart modal state', () => {
      const state = cartReducer(undefined, setCheckoutState('STATE_CHECKED_OUT'));
      expect(state.checkoutState).toEqual('STATE_CHECKED_OUT');
  });

  it('should set the checkout error', () => {
      const state = cartReducer(undefined, setCheckoutError('error checking out items'));
      expect(state.checkoutError).toEqual('error checking out items');
  });

  it('should set the default reducer value', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      cartAddModalState: '',
      checkoutState: '',
      checkoutError: ''
    }
    );
  });
})

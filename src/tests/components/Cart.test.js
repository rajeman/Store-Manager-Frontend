import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Cart from '../../components/Cart';
import CartRemoveModal from '../../components/CartRemoveModal';
import CartAddModal from '../../components/CartAddModal';
import * as CartHelpers from '../../helpers/cart';

jest.mock('axios');
jest.mock('../../helpers/cart');

describe('CART TEST SUITE', () => {
  describe('CART COMPONENT TEST SUITE', () => {
    it('should render cart component', () => {
      const initialState = {
        auth: {
          userDetails: {
            email: 'attendant@attendant.com'
          }
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
      expect(component).toMatchSnapshot();
    });
  });

  it('should checkout cart items if checkout button is clicked', () => {
    const initialState = {
      auth: {
        userDetails: {
          email: 'attendant@attendant.com'
        },
      },
    };
    CartHelpers.fetchCartProducts.mockImplementation(() => [{
      product_id: 12,
      product_name: 'Arduino Mega'
    }]);
    const response = {
      data:
      {
        message: 'successfully modified product'
      }
    };
    axios.post.mockImplementation(() => Promise.resolve(response));
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    component.find('input[type="button"]').simulate('click', {});
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].checkoutState).toEqual('STATE_CHECKING_OUT');
  });

  it('should render the deleteProduct modal', () => {
      const component = mount(<CartRemoveModal />);
      expect(component.exists()).toBe(true);
  });

  it('should render the addProduct modal', () => {
      const component = mount(<CartAddModal />);
      const spy = jest.spyOn(component.instance(), 'handleQuantityChange');
      component.find('input[type="number"]').simulate('change', {});
      expect(spy).toHaveBeenCalled();
  });
});



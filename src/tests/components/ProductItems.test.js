import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import ProductItems from '../../components/ProductItems';

jest.mock('axios');

describe('PRODUCT TEST SUITE', () => {
  it('should render the product items when component mounts', () => {
    const response = {
      data:
      {
        message: 'successfully fetched user info',
      }
    };
    axios.get.mockResolvedValue(response);
    const initialState = {
      products: {
        products: [{
          product_id: 7
        }]
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <ProductItems />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should navigate to the single product page when a product is selected', () => {
    const response = {
      data:
      {
        message: 'successfully fetched user info',
      }
    };
    axios.get.mockResolvedValue(response);
    const initialState = {
      products: {
        products: [{
          product_id: 7
        }]
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <ProductItems />
      </Provider>
    );
    component.find('div[className="item"]').simulate('click');
  });
});

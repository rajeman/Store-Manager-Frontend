import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import OrderDetails from '../../components/OrderDetails';

jest.mock('axios');

describe('ORDER DETAILS TEST SUITE', () => {
  it('should render the OrderDetails component', () => {
    const response = {
      data:
      {
        message: 'successfully fetched user info',
      }
    };
    axios.get.mockResolvedValue(response);
    const initialState = {
      sales: {
          sale: [{order_id: 25}]
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <OrderDetails />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

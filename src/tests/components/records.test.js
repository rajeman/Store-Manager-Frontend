import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import Records from '../../components/Records';

jest.mock('axios');

describe('RECORDS TEST SUITE', () => {
  it('should render the record component', () => {
    const response = {
      data:
      {
        message: 'successfully fetched user info',
      }
    };
    axios.get.mockResolvedValue(response);
    const initialState = {
      sales: {
          sales: [{order_id: 25}]
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Records />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

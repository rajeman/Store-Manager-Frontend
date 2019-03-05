import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import CreateAttendant from '../../components/CreateAttendant';

jest.mock('axios');
jest.mock('../../helpers/cart');

describe('ATTENDANT CREATE TEST SUITE', () => {
  it('should render the form for creating attendant', () => {
    const initialState = {
      products: {
        productCreate: 'STATE_CREATE_FAILED',
        productCreateError: ''
      },
      auth: {
        userDetails: {
          level: 2
        }
      },
      attendants: {
        attendantCreateState: 'STATE_CREATING'
      }
    };
    const response = {
        data:
        {
          message: ''
        }
      };
    axios.get.mockResolvedValue(response);
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateAttendant />
        </MemoryRouter>
      </Provider>
    );
    expect(component.exists()).toBe(true);
  });

  it('should dispatch the create attendant action when attendant account is being created', () => {
    const initialState = {
      products: {
        productCreate: '',
        productCreateError: ''
      },
      auth: {
        userDetails: {
          level: 2
        }
      },
      attendants: {
        attendantCreateState: 'STATE_CREATING'
      }
    };
    const response = {
      data:
      {
        message: 'successfully created attendant'
      }
    };
    axios.post.mockImplementation(() => Promise.resolve(response));
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateAttendant />
        </MemoryRouter>
      </Provider>
    );
    component.find('form').simulate('submit', {});
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].state).toEqual('STATE_CREATING');
  });

  it('should dispatch the \'create attendant error\' if create fails', () => {
    const initialState = {
      products: {
        productCreate: 'STATE_CREATE_FAILED',
        productCreateError: ''
      },
      auth: {
        userDetails: {
          level: 2
        }
      },
      attendants: {
        attendantCreateState: 'STATE_CREATING'
      }
    };
    const response = {
      data:
      {
        message: 'successfully created attendant'
      }
    };
    axios.post.mockImplementation(() => Promise.reject(response));
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateAttendant />
        </MemoryRouter>
      </Provider>
    );
    component.find('form').simulate('submit', {});
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0].state).toEqual('STATE_CREATING');
  });
});


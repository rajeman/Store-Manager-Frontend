import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import ProductModifyForm from '../../components/ProductModifyForm';
import CreateProduct from '../../components/CreateProduct';

jest.mock('axios');

describe('PRODUCT FORMS TEST SUITE', () => {
  describe('PRODUCT MODIFY FORM TEST SUITE', () => {
    it('should render the ProductModify form', () => {
      const response = {
        data:
        {
          message: ''
        }
      };
      axios.get.mockResolvedValue(response);
      const initialState = {
        products: {
          product: []
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <ProductModifyForm />
        </Provider>
      );
      expect(component).toMatchSnapshot();
    });

    it('should make request to modify product when form is submitted', () => {
      const response = {
        data:
        {
          message: 'successfully modified product'
        }
      };
      axios.put.mockImplementation(() => Promise.resolve(response));
      const initialState = {
        products: {
          product: [{
            id: 34,
            name: "Arduino Uno"
          }]
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <ProductModifyForm />
        </Provider>
      );
      component.find('form').simulate('submit', {});
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[1].type).toEqual('PRODUCT_MODIFY');
    });
  });

  describe('PRODUCT CREATE TEST SUITE', () => {
    it('should render the ProductCreate Form', () => {
      const initialState = {
        products: {
          productCreate: 'STATE_CREATE_FAILED',
          productCreateError: ''
        },
        auth: {
          userDetails: {
            level: 2
          }
        }
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CreateProduct />
          </MemoryRouter>
        </Provider>
      );
      expect(component.exists()).toBe(true);
    });

    it('should make request to create product when form is submitted', () => {
      const response = {
        data:
        {
          message: 'successfully modified product'
        }
      };
      axios.post.mockImplementation(() => Promise.resolve(response));
      const initialState = {
        products: {
          productCreate: 'STATE_CREATING',
          productCreateError: ''
        },
        auth: {
          userDetails: {
            level: 2
          }
        }
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CreateProduct />
          </MemoryRouter>
        </Provider>
      );
      component.find('form').simulate('submit', {});
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[1].productCreate).toEqual('STATE_CREATING');
    });
  });
});



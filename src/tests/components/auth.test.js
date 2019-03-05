import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../../components/Login';
import Signout from '../../components/Signout';
import "../setupTests";

jest.mock('axios');

describe('AUTHENTICATION TEST SUITE', () => {
  describe('Login Authentication', () => {
    it('Login Form should have all expected input fields', () => {
      const initialState = {
        auth: {
          loginState: 'STATE_LOGIN_FAILED',
          loginError: undefined,
          userDetails: {}
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      );
      const emailField = component.find('input[id="email"]').props();
      expect(emailField.id).toBe('email');
      const passwordField = component.find('input[id="password"]').props();
      expect(passwordField.id).toBe('password');
    });

    it('should call the login handler when the login form is submitted', () => {
      const response = { data: { message: 'successfully slogged in' } };
      axios.post.mockResolvedValue(response);
      const preventDefault = jest.fn();
      const initialState = {
        auth: {
          loginState: 'STATE_LOGGING_IN',
          loginError: undefined,
          userDetails: {}
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      );
      component.find('form').simulate('submit', {
        preventDefault,
        target: {
          elements: {
            uname: { value: 'johndoe@joe.com' },
            psw: { value: 'johndoe' },
          },
        },
      });
      expect(preventDefault).toHaveBeenCalled();
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].type).toEqual('SET_LOGIN_STATE');
    });

    it('should display pop-up error message if login fails', () => {
      const response = { response: { data: { error: 'invalid username or password' } } };
      axios.post.mockImplementation(() => Promise.reject(response));
      const preventDefault = jest.fn();
      const initialState = {
        auth: {
          loginState: '',
          loginError: undefined,
          userDetails: {}
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      );
      component.find('form').simulate('submit', {
        preventDefault,
        target: {
          elements: {
            uname: { value: 'johndoe@joe.com' },
            psw: { value: 'johndoe' },
          },
        },
      });
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].type).toEqual('SET_LOGIN_STATE');
    });
  });

  describe('Signout', () => {
    it('should change the auth state to STATE_LOGGED_OUT when user logs out', () => {
      const initialState = {
        auth: {
          loginState: 'STATE_LOGIN_FAILED',
          loginError: undefined,
          userDetails: {}
        },

      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
          <Signout />
        </Provider>);
      component.find('a[href=""]').simulate('click', {});
      const actions = store.getActions();
      expect(actions[0].loginState).toEqual('STATE_LOGGED_OUT');
    });
  });
});

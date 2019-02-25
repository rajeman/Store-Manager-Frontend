import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ProfileInfo from '../../components/ProfileInfo';
import ButtonNewAttendant from '../../components/ButtonNewAttendant';
import "../setupTests";

jest.mock('axios');

describe('PROFILE TEST SUITE', () => {
  it('should not render the createAttendant Button for attendants', () => {
    const response = {
    data:
    {
      message: 'successfully fetched user info',
      userDetails: {
        username: 'mrniceguy'
      }
    }
  };
    axios.get.mockResolvedValue(response);
      const initialState = {
        auth: {
          userDetails: {
            level: 1
          }
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
        <ProfileInfo />
        </Provider>
        );
      const createAttendantButton = component.find(ButtonNewAttendant).first()
      expect(createAttendantButton.exists()).toBe(false);
  });

  it('should render the createAttendant button for admins', () => {
    const response = { response:
    {
      data: { error: 'invalid username or password' } ,
      status: 403
    } };
    axios.get.mockImplementation(() => Promise.reject(response));
      const initialState = {
        auth: {
          userDetails: {
            level: 2
          }
        },
      };
      const mockStore = configureStore([thunk]);
      const store = mockStore(initialState);
      const component = mount(
        <Provider store={store}>
        <ProfileInfo />
        </Provider>
        );
      component.find('input[type="button"]').simulate('click');
      const createAttendantButton = component.find(ButtonNewAttendant).first()
      expect(createAttendantButton.exists()).toBe(true);
  })
})

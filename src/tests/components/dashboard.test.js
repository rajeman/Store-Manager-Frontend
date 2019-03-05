import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import DashboardContent from '../../components/DashboardContent';
import "../setupTests";

describe('DASHBOARD TEST SUITE', () => {
  it('should render the DasboardContent component', () => {
    const component = shallow(<DashboardContent />);
    expect(component.exists()).toBe(true);
  })

  it('should render the Dashboard component', () => {
    const initialState = {
      navigation: {

      },
      auth: {
          loginState: 'STATE_LOGIN_FAILED',
          loginError: undefined,
          userDetails: {}
        },
      match: {
        params: {
          id: ''
        }
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    )
    expect(component.exists()).toBe(true);
  })
});

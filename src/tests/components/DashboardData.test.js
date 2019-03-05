import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardContent from '../../components/DashboardContent';
import "../setupTests";

describe('DASHBOARD DATA TEST SUITE', () => {
    it('should render the DasboardContent component', () => {
      const component = shallow(<DashboardContent />);
      expect(component.exists()).toBe(true);
    })
});

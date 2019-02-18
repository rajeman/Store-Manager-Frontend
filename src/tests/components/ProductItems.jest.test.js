import React from 'react';
import { shallow } from 'enzyme';
import "../setupTests"
import ProductItems from '../../components/ProductItems';

test('should render ProductItems correctly', () => {
    const wrapper = shallow(<ProductItems />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ProductItems with product data', () => {
    const wrapper = shallow(<ProductItems product = {[{id:1}, {id: 2}]}/>);
    expect(wrapper).toMatchSnapshot();
})

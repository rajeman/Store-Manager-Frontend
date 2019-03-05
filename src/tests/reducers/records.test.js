import recordReducer from '../../reducers/records';
import navigationReducer from '../../reducers/navigation';
import { setNavigation } from '../../actions/navigation';
import {
  setSale,
  setSales
} from '../../actions/records';

describe('RECORDS REDUCER TEST SUITE', () => {
  it('should set the sale record', () => {
    const state = recordReducer(undefined, setSale({ product_id: 9 }));
    expect(state.sale).toEqual({ product_id: 9 });
  });

  it('should set the sale records', () => {
    const state = recordReducer(undefined, setSales({ product_id: 9 }));
    expect(state.sales).toEqual({ product_id: 9 });
  });

  it('should set the default reducer state', () => {
    const state = recordReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      sale: [],
      sales: []
    })
  });

  it('should set the default navigation state', () => {
    const state = navigationReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      urlPath: '',
      id: ''
    });
  });

  it('should set the navigation state', () => {
    const state = navigationReducer(undefined, setNavigation({
      path: '/home'
    }));
    expect(state).toEqual({
      path: '/home',
      urlPath: '',
      id: ''
    });
  });
});


import productReducer from '../../reducers/products';
import {
  setProduct,
  setDeleteModal,
  setCreateProduct,
  setCreateError,
  setModifyProduct,
  setModifyError,
  setProducts
} from '../../actions/products';

describe('PRODUCT REDUCERS TEST SUITE', () => {
  it('should set the product object', () => {
    const state = productReducer(undefined, setProduct({
      productName: 'Arduino Uno'
    }));
    expect(state.product).toEqual({
      productName: 'Arduino Uno'
    })
  });

  it('should set the products object', () => {
    const state = productReducer(undefined, setProducts([{
      productName: 'Arduino Uno'
    }, {
      productName: 'Arduino Mega'
    }]));
    expect(state.products).toEqual([{
      productName: 'Arduino Uno'
    }, {
      productName: 'Arduino Mega'
    }])
  });

  it('should set the delete modal', () => {
    const state = productReducer(undefined, setDeleteModal('STATE_VISIBLE'));
    expect(state.deleteModal).toEqual('STATE_VISIBLE');
  });

  it('should set the product create state', () => {
    const state = productReducer(undefined, setCreateProduct('STATE_CREATING'));
    expect(state.productCreate).toEqual('STATE_CREATING');
  });

  it('should set the product modify state', () => {
    const state = productReducer(undefined, setModifyProduct('STATE_MODIFYING'));
    expect(state.productModify).toEqual('STATE_MODIFYING');
  });

  it('should set the product create error', () => {
    const state = productReducer(undefined, setCreateError('STATE_CREATE_FAILED'));
    expect(state.productCreateError).toEqual('STATE_CREATE_FAILED');
  });

  it('should set the product modify error', () => {
    const state = productReducer(undefined, setModifyError('STATE_MODIFY_FAILED'));
    expect(state.productModifyError).toEqual('STATE_MODIFY_FAILED');
  });

  it('should set the default reducer state', () => {
    const state = productReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(
      {
        products: [],
        product: [],
        deleteModal: '',
        productCreate: '',
        productCreateError: '',
        productModify: '',
        productModifyError: ''
      }
    );
  });

});

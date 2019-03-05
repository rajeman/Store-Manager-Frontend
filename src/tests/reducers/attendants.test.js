import attendantReducer from '../../reducers/attendants';
import { setAttendantError, setCreateAttendant } from '../../actions/attendants';

describe('ATTENDANT REDUCER TEST SUITE', () => {
  it('should set the attendant create state', () => {
    const store = attendantReducer(undefined, setCreateAttendant({
      email: 'attendantjoe@gmail.com',
      name: 'Attendant Joe'
    }));
    expect(store.attendantCreateState).toEqual({
      email: 'attendantjoe@gmail.com',
      name: 'Attendant Joe'
    })
  });

  it('should set the attendant create error', () => {
    const store = attendantReducer(undefined, setAttendantError('error creating attendant'));
    expect(store.attendantCreateError).toEqual('error creating attendant');
  });

  it('should set the default reducer state', () => {
    const state = attendantReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      attendantCreateState: '',
      attendantCreateError: ''
    })
  });
});

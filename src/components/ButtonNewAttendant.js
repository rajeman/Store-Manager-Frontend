import React from 'react';
import paths from '../helpers/paths';
import { history } from '../routers/AppRouter';

export default () => 
    <input type="button" class="confirm checkout new-attendant"
        value="New Attendant" onClick={() => history.push(paths.createAttendant)}>
    </input>


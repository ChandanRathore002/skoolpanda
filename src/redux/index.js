import { combineReducers } from 'redux';

import auth from './auth';
import otp from './otp';
import schoolList from './school-list';
import schools from './schools';

export default combineReducers({
  auth,
  otp,
  schoolList,
  schools,
});

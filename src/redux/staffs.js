import  { apiReq, staffs } from "../config/apis";
import {
  STAFF_LIST, STAFF_ERROR,
  STAFF_LOADING,
  STAFF_SUCCESS,
  STAFF_COUNTRY_SUCCESS,
  STAFF_COUNTRY_STATE_SUCCESS
} from "./state-constants";

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  staff: null,
  staffList: [],
  countriesList: [],
  statesList: []
};

function reducer(state = initialState, action = {}) {
  switch(action.type) {
    default:
      return state;
      
    case STAFF_ERROR:
      return {
        ...state,
        error: action.error,
        isError: true,
        isLoading: false
      }

    case STAFF_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case STAFF_SUCCESS:
      return {
        ...state,
        error: null,
        isError: false,
        isLoading: false,
        staff: action.staff,
      }

    case STAFF_COUNTRY_SUCCESS:
      return {
        ...state,
        countriesList: action.countries,
      }

      case STAFF_COUNTRY_STATE_SUCCESS:
        return {
          ...state,
          statesList: action.states,
        }
    
    case STAFF_LIST:
      return {
        ...state,
        error: null,
        isError: false,
        isLoading: false,
        staffList: action.staffList,
      }
  }
}

export default reducer;

const handleErr = (error, dispatch) => {
  console.log('API ERROR: ', error);
  dispatch ({
    type: STAFF_ERROR,
    error: error
  });
};

const handleCatch = (error, dispatch) => {
  console.log('CATCH ERR: ', error);
  dispatch ({
    type: STAFF_ERROR,
    error
  });
};

export const addStaff = (payload) => {
  return ((dispatch, getState) => new Promise((resolve, reject) => {
    try {
      console.log(payload);
      dispatch({ type: STAFF_LOADING });
    apiReq
      .post(staffs.add, payload)
      .then(response => {
        const { data } = response;
        dispatch({
          type: STAFF_SUCCESS,
          staff: data
        });
        resolve(data);
      })
      .catch(error => {
        handleErr(error, dispatch);
        reject(error);
      });
    } catch (error) {
        handleCatch(error, dispatch);
        reject(error);
      }
    })
  );
};

export const getCountries = () => {
  return ((dispatch, getState) => new Promise((resolve, reject) => {
    try {
    apiReq
      .get(staffs.getCountries)
      .then(response => {
        const { data } = response;
        dispatch({
          type: STAFF_COUNTRY_SUCCESS,
          countries: data.records
        });
        resolve(data);
      })
      .catch(error => {
        handleErr(error, dispatch);
        reject(error);
      });
    } catch (error) {
        handleCatch(error, dispatch);
        reject(error);
      }
    })
  );
};

export const getCountryStates = (country) => {
  return ((dispatch, getState) => new Promise((resolve, reject) => {
    try {
    apiReq
      .get(`${staffs.getCountryStates}${country}`)
      .then(response => {
        const { data } = response;
        dispatch({
          type: STAFF_COUNTRY_STATE_SUCCESS,
          states: data.records
        });
        resolve(data);
      })
      .catch(error => {
        handleErr(error, dispatch);
        reject(error);
      });
    } catch (error) {
        handleCatch(error, dispatch);
        reject(error);
      }
    })
  );
};

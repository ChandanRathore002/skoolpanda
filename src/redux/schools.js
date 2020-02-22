import { apiReq, schools } from "../config/apis";
import {
  SCHOOL_LIST, SCHOOL_ERROR,
  SCHOOL_LOADING,
  SCHOOL_SUCCESS,
  SCHOOL_COUNTRY_SUCCESS,
  SCHOOL_COUNTRY_STATE_SUCCESS
} from "./state-constants";

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  school: null,
  schoolList: [],
  countriesList: [],
  statesList: []
};

function reducer(state = initialState, action = {}) {
  switch(action.type) {
    default:
      return state;
      
    case SCHOOL_ERROR:
      return {
        ...state,
        error: action.error,
        isError: true,
        isLoading: false
      }

    case SCHOOL_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case SCHOOL_SUCCESS:
      return {
        ...state,
        error: null,
        isError: false,
        isLoading: false,
        school: action.school,
      }

    case SCHOOL_COUNTRY_SUCCESS:
      return {
        ...state,
        countriesList: action.countries,
      }

      case SCHOOL_COUNTRY_STATE_SUCCESS:
        return {
          ...state,
          statesList: action.states,
        }
    
    case SCHOOL_LIST:
      return {
        ...state,
        error: null,
        isError: false,
        isLoading: false,
        schoolList: action.schoolList,
      }
  }
}

export default reducer;

const handleErr = (error, dispatch) => {
  console.log('API ERROR: ', error);
  dispatch ({
    type: SCHOOL_ERROR,
    error: error
  });
};

const handleCatch = (error, dispatch) => {
  console.log('CATCH ERR: ', error);
  dispatch ({
    type: SCHOOL_ERROR,
    error
  });
};

export const addSchool = (payload) => {
  return ((dispatch, getState) => new Promise((resolve, reject) => {
    try {
      dispatch({ type: SCHOOL_LOADING });
    apiReq
      .post(schools.add, payload)
      .then(response => {
        const { data } = response;
        dispatch({
          type: SCHOOL_SUCCESS,
          school: data
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
      .get(schools.getCountries)
      .then(response => {
        const { data } = response;
        dispatch({
          type: SCHOOL_COUNTRY_SUCCESS,
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
      .get(`${schools.getCountryStates}${country}`)
      .then(response => {
        const { data } = response;
        dispatch({
          type: SCHOOL_COUNTRY_STATE_SUCCESS,
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

import { apiReq, staffList } from "../config/apis";
import {
  CLASS_LIST,
  CHILD_PLACES,
  COUNTRY_LIST,
  SECTIONS_LIST,
  STAFF_LIST,
  STAFF_LIST_LOADING
} from "./state-constants";

const initialState = {
  classList: [],
  childPlaces: [],
  countries: [],
  isLoading: false,
  sectionList: [],
  staffList: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;

    case CHILD_PLACES:
      return {
        ...state,
        childPlaces: action.childPlaces,
        isLoading: false
      };

    case CLASS_LIST:
      return {
        ...state,
        classList: action.classList,
        isLoading: false
      };

    case COUNTRY_LIST:
      return {
        ...state,
        countries: action.countries,
        isLoading: false,
      };

    case SECTIONS_LIST:
      return {
        ...state,
        isLoading: false,
        sectionList: action.sectionList
      };

    case STAFF_LIST_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case STAFF_LIST:
      return {
        ...state,
        isLoading: false,
        staffList: action.staffList
      };
  }
}

export default reducer;

export const fetchStaffList = () => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: STAFF_LIST_LOADING });

        apiReq
          .get(staffList.staffs)
          .then(response => {
            const { data } = response;
            dispatch({ type: STAFF_LIST, staffList: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: STAFF_LIST, staffList: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
  }));
};

export const fetchClassList = staffId => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: STAFF_LIST_LOADING });

        apiReq
          .get(staffList.classes(staffId))
          .then(response => {
            const { data } = response;
            dispatch({ type: CLASS_LIST, classList: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: CLASS_LIST, classList: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
    }));
};

export const fetchSectionList = classId => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: STAFF_LIST_LOADING });

        apiReq
          .get(staffList.sections(classId))
          .then(response => {
            const { data } = response;
            dispatch({ type: SECTIONS_LIST, sectionList: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: SECTIONS_LIST, sectionList: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
    }));
};

export const fetchCountriesList = () => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: STAFF_LIST_LOADING });

        apiReq
          .get(staffList.countries)
          .then(response => {
            const { data } = response;
            dispatch({ type: COUNTRY_LIST, countries: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: COUNTRY_LIST, countries: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
    }));
};

export const fetchChildPlacesList = geoId =>{
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: STAFF_LIST_LOADING });

        apiReq
          .get(`${staffList.childPlaces}/${geoId}`)
          .then(response => {
            const { data } = response;
            dispatch({ type: CHILD_PLACES, childPlaces: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: CHILD_PLACES, childPlaces: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
    }));
};

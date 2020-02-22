import { apiReq, schoolList } from "../config/apis";
import { CLASS_LIST, CHILD_PLACES, COUNTRY_LIST, SECTIONS_LIST, SCHOOL_LIST, SCHOOL_LIST_LOADING } from "./state-constants";

const initialState = {
  classList: [],
  childPlaces: [],
  countries: [],
  isLoading: false,
  sectionList: [],
  schoolList: []
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

    case SCHOOL_LIST_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case SCHOOL_LIST:
      return {
        ...state,
        isLoading: false,
        schoolList: action.schoolList
      };
  }
}

export default reducer;

export const fetchSchoolList = () => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: SCHOOL_LIST_LOADING });

        apiReq
          .get(schoolList.schools)
          .then(response => {
            const { data } = response;
            dispatch({ type: SCHOOL_LIST, schoolList: data.records });
            resolve(data.records);
          })
          .catch(error => { dispatch({ type: SCHOOL_LIST, schoolList: [] }); reject(error); })
      } catch (error) {
        reject(error);
      }
  }));
};

export const fetchClassList = schoolId => {
  return (dispatch =>
    new Promise((resolve, reject) => {
      try {
        dispatch({ type: SCHOOL_LIST_LOADING });

        apiReq
          .get(schoolList.classes(schoolId))
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
        dispatch({ type: SCHOOL_LIST_LOADING });

        apiReq
          .get(schoolList.sections(classId))
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
        dispatch({ type: SCHOOL_LIST_LOADING });

        apiReq
          .get(schoolList.countries)
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
        dispatch({ type: SCHOOL_LIST_LOADING });

        apiReq
          .get(`${schoolList.childPlaces}/${geoId}`)
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

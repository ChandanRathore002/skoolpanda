import { apiReq, auth, otpApis } from "../config/apis";
import {
  AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS,
  RESET_PASSWORD_SEND_OTP, RESET_PASSWORD_VERIFY_OTP,
  USERNAME_AVAILABLE
} from "./state-constants";

const initialState = {
  error: null,
  isAuthVerified: false,
  isError: false,
  isLoading: false,
  isUsernameAvailable: false,
  otpSent: false,
  otpVerified: false,
  resetPasswordSuccess: false,
  user: null
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;

    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isError: true,
        isLoading: false
      };

    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        isError: false,
        isLoading: false,
        isUserVerified: action.isUserVerified,
        user: action.user
      };

    case RESET_PASSWORD_SEND_OTP:
      return {
        ...state,
        isError: false,
        isLoading: false,
        otpSent: true
      };

    case RESET_PASSWORD_VERIFY_OTP:
      return {
        ...state,
        isError: false,
        isLoading: false,
        otpVerified: true
      };

    case USERNAME_AVAILABLE:
      return {
        ...state,
        isError: false,
        isLoading: false,
        isUsernameAvailable: true,
      };
  }
}

export default reducer;

const handleErr = (error, dispatch) => {
  console.log('API ERROR: ', error);
  dispatch ({
    type: AUTH_ERROR,
    error: error
  });
};

const handleCatch = (error, dispatch) => {
  console.log('CATCH ERR: ', error);
  dispatch ({
    type: AUTH_ERROR,
    error
  });
};

export const register = payload => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        const userPayload = {
          school_id: payload.instituteId,
          class_id: payload.classId,
          section_id: payload.sectionId,
          sandbox: true,
          user_login: {
            login: payload.username,
            password: payload.password,
            repeat_password: payload.repeatPassword
          },
          person: {
            fname: payload.firstName,
            mname: payload.middleName,
            lname: payload.lastName,
            dob: payload.dob,
            gender: payload.gender.toUpperCase()
          },
          telecom_number: {
            country_code: 91,
            area_code: 11,
            contact_number: parseInt(payload.mobile)
          },
          postal_address: {
            address: payload.address,
            country: payload.country,
            state: payload.state,
            city: payload.city,
            pincode: payload.pinCode
          }
        };

        apiReq
          .post(auth.register, userPayload)
          .then(({ data }) => {
            dispatch({ type: AUTH_SUCCESS, user: payload, isUserVerified: true });
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

export const checkUsername = username => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        apiReq
          .post(auth.usernameCheck, { username })
          .then(response => {
            const { data } = response;
            dispatch({ type: USERNAME_AVAILABLE });
            resolve(data.apiresponse);
          })
          .catch(error => {
            handleErr(error, dispatch);
            reject(error);
          });
      } catch (error) {
        handleCatch(error, dispatch);
        reject(error);
      }
    }));
};

export const authenticate = (username, password) => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        apiReq
          .post(auth.auth, { user_login: {login: username, password }})
          .then((response) => {
            console.log('AUTH RESPONSE: ', response);
            const {data} = response;
            dispatch({ type: AUTH_SUCCESS, user: {}, isUserVerified: true });
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

export const resetPassword = (password, repeatPassword) => {
  return ((dispatch, getState) => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        apiReq
          .post(auth.reset, {
            password,
            repeat_password: repeatPassword
          })
          .then(({ data }) => {
            dispatch({ type: AUTH_SUCCESS, user: getState().auth.user, isUserVerified: true });
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

export const sendResetPasswordOTP = mobile => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        apiReq
          .post(otpApis.passwordReset, {
            mobile: {
              country_code: 91,
              area_code: 11,
              contact_number: mobile
            }
          })
          .then(({ data }) => {
            dispatch({
              type: RESET_PASSWORD_SEND_OTP
            });
            resolve(data);
          })
          .catch(error => {
            handleErr(error, dispatch);
            reject(error);
          });
      } catch (error) {
        handleErr(error, dispatch);
      }
    })
  );
};

export const verifyResetPassword = otp => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        dispatch({ type: AUTH_LOADING });

        apiReq
          .post(otpApis.verifyPassword, { otp } )
          .then(({ data }) => {
            dispatch({ type: RESET_PASSWORD_VERIFY_OTP, otpVerified: true });
            resolve(data);
          })
          .catch(error => {
            handleErr(error, dispatch);
            reject(error);
          });
      } catch (error) {
        handleErr(error, dispatch);
      }
    })
  );
};

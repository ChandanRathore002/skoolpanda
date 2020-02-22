import { apiReq, otpApis } from "../config/apis";
import { OTP_ERROR, OTP_LOADING, OTP_SENT, OTP_VERIFIED} from './state-constants';

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  otpMessage: null,
  otpSent: false,
  otpVerified: false
};

function reducer (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;

    case OTP_ERROR:
      return {
        ...state,
        error: action.error,
        isError: true,
        isLoading: false
      };

    case OTP_LOADING:
      return {
        isError: false,
        isLoading: true
      };

    case OTP_SENT:
      return {
        ...state,
        isError: false,
        isLoading: false,
        otpMessage: action.msg,
        otpSent: action.sent
      };

    case OTP_VERIFIED:
      return {
        ...state,
        isError: false,
        isLoading: false,
        otpMessage: action.msg,
        otpVerified: action.verified
      };
  }
}

export default reducer;

const handleErr = (error, dispatch) => {
  console.log('API ERROR: ', error);
  dispatch ({
    type: OTP_ERROR,
    error: error.response.data.error
  });
};

const handleCatch = (error, dispatch) => {
  console.log('CATCH ERR: ', error);
  dispatch ({
    type: OTP_ERROR,
    error
  });
};

export const sendOTP = mobile => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        apiReq
          .post(otpApis.send, {
            telecom_number: {
              country_code: 91,
              area_code: 11,
              contact_number: mobile
            }
          })
          .then(({ data }) => {
            dispatch({ type: OTP_SENT, msg: data.apiresponse.message, sent: true });
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
  }));
};

export const verifyOTP = otp => {
  return (dispatch => new Promise((resolve, reject) => {
      try {
        apiReq
          .post(otpApis.verify, { otp })
          .then(({ data }) => {
            dispatch({ type: OTP_SENT, msg: data.message, verified: true });
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
  }));
};

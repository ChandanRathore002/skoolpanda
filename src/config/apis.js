import axios from "axios";
import { tokenKey } from './constants';

export const apiURL = "https://api.skoolpanda.com/api/";

export const apiReq = axios.create({
  baseURL: apiURL,
  timeout: 4000,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  }
});

const requestHandler = request => {
  const token = window.localStorage.getItem(tokenKey);

  if (token) {
    const {headers} = request;
    headers['Cookie'] = token;
    request.headers = headers;
  }

  return request;
};

const responseHandler = response => {
  const {headers} = response;
  const cookie = headers['set-cookie'];
console.log('RESPONSE HEADERS: ', headers);
  if (!!cookie && Array.isArray(cookie)) {
    if (cookie.length) {
      if (cookie.length > 0) {
        const aCookie = cookie[0];
        const aCookieArr = aCookie.split(';');

        if (aCookieArr.length > 0) {
          const cookieToken = aCookieArr[0];
          window.localStorage.setItem(tokenKey, cookieToken);
        }
      }
    }
  }

  return response;
};

apiReq.interceptors.request.use(request => requestHandler(request));
apiReq.interceptors.response.use(response => responseHandler(response));

export const schoolList = {
  childPlaces: "master/child_places",
  countries: "master/countries",
  schools: "schools",
  classes: partyId => { return `schools/${partyId}/classes` },
  sections: partyId => { return `schools/classes/${partyId}/sections` }
};

export const staffList = {
  staffs: "staffs",
  classes: partyId => { return `staffs/${partyId}/classes` },
  sections: partyId => { return `staffs/classes/${partyId}/sections` }
};

export const otpApis = {
  passwordReset: "auth/get_password_reset_otp",
  send: "signup/send_otp",
  verify: "signup/verify_otp",
  verifyPassword: "auth/verify_password_reset_otp"
};

export const auth = {
  auth: "auth/verify_login",
  register: "signup/register_user", //POST
  reset: "auth/reset_password",
  usernameCheck: "user/username_available"
};

export const schools = {
  add: "/schools/add_school",
  get: "/schools",
  getClasses: "/schools/classes",
  getSections: (partyId) => `/schools/classes/${partyId}/sections`,
  getCountries: 'master/countries',
  getCountryStates: 'master/child_places/'
};

export const staffs = {
  add: "/staffs/register_staff",
  get: "/staffs",
  getClasses: "/staffs/classes",
  getSections: (partyId) => `/staffs/classes/${partyId}/sections`,
  getCountries: 'master/countries',
  getCountryStates: 'master/child_places/'
};

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required('Please enter a address'),
  country: Yup.string()
    .required('Please enter a country'),
  state: Yup.string()
    .required('Please enter a state'),
  city: Yup.string()
    .required('Please enter a city'),
  pincode: Yup.string()
    .required('Please enter pincode'),
  firstname: Yup.string()
    .required('Please enter a first name'),
  lastname: Yup.string()
    .required('Please enter a last name'),
  designation: Yup.string()
    .required('Please enter designation'),
  dob: Yup.string()
    .required('Please enter date of birth'),
  gender: Yup.string()
    .required('Please enter gender'),
  countrycode: Yup.string()
    .max(3, "Country code is long!")
    .required('Please enter a country code'),
  areacode: Yup.string()
    .required('Please enter a area code'),
  contact: Yup.string()
    .required('Please enter contact number'),
  login: Yup.string()
    .required('Please enter login detail'),
  password: Yup.string()
    .required('Please enter a password'),
  confirmpassword: Yup.string()
    .required('Password is not matching'),
})

export default {
  validationSchema
};
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Form, Col, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";
import Input from '../../components/Input';
import Header from '../../components/Header';
import Error from './Error';
import { validationSchema } from './ValidationSchema';
import { addSchool, getCountries, getCountryStates } from '../../redux/schools';

import './add-school.scss';

const School = (props) => {
  const history = useHistory();
  const { dispatch } = props;
  const [gender, setGender] = useState('F');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(()=>{
    dispatch(getCountries());    
  }, []);

  const changeCountry = (event) => {
    setSelectedCountry(event.target.value);
    dispatch(getCountryStates(event.target.value));
  }
  
  const handleSubmit = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    const payload = {
      sandbox: 1,
      school_name: values.schoolname
    };
    payload.person = {};
    payload.person.fname = values.firstname;
    payload.person.mname = values.middlename;
    payload.person.lname = values.lastname;
    payload.person.designation = values.designation;
    payload.person.dob = values.dob;
    payload.person.gender = values.gender;

    payload.user_login = {};
    payload.user_login.login = values.login;
    payload.user_login.password = values.password;
    payload.user_login.repeat_password = values.confirmpassword;

    payload.postal_address = {};
    payload.postal_address.address = values.address;
    payload.postal_address.country = values.country;
    payload.postal_address.state = values.state;
    payload.postal_address.city = values.city;
    payload.postal_address.pincode = values.pincode;

    payload.telecom_number = {};
    payload.telecom_number.country_code = values.countrycode;
    payload.telecom_number.area_code = values.areacode;
    payload.telecom_number.contact_number = values.contact;

    console.log(payload, 'PAYLOAD');

    dispatch(addSchool(payload))
    .then(response => {
      const { apiresponse } = response;
      console.log(apiresponse, 'Updated');
      if (apiresponse && apiresponse.type === "OK") {
        setToastMsg(apiresponse.message);
        setShowToast(true);
        setTimeout(() => { history.push("/schools"); }, 3000);
        return;
      }

      setToastMsg('There was some problem. Please check');
      setShowToast(true);
    })
    .catch(error => {
      console.log("Add School error: ", error);
      setToastMsg('Duh ! We got an error. Please report to admin.');
      setShowToast(true);
    });
  };

  const { countriesList, statesList } = props;

  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row>
          <div className="space-row flex-column d-flex justify-content-between w-100">
            <div className="add-school-form">
              <Formik
                initialValues={{
                  schoolname: '',
                  address: '',
                  country: selectedCountry,
                  state: '',
                  city: '',
                  pincode: '',
                  firstname: '',
                  lastname: '',
                  designation: '',
                  dob: '',
                  gender,
                  countrycode: '',
                  areacode: '',
                  contact: '',
                  login: '',
                  password: '',
                  confirmpassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="add-form-box d-flex flex-column mb-4">
                      <Col>
                        <h2 className="mb-5">Add Schools</h2>
                      </Col>
                      <div className="d-flex flex-wrap">
                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicEmail">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>School Name</Form.Label>
                                <Input
                                  id="schoolname"
                                  type="schoolname"
                                  name="schoolname"
                                  placeholder="Enter School Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.schoolname}
                                  className={touched.schoolname && errors.schoolname ? 'form-control has-error' : 'form-control'}
                                />
                            </div>
                            <Error touched={touched.schoolname} message={errors.schoolname} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Address</Form.Label>
                                <Input
                                  type="address"
                                  id="address"
                                  name="address"
                                  placeholder="Enter Address"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.address}
                                  className={touched.address && errors.address ? 'form-control has-error' : 'form-control'}
                                />
                            </div>
                            <Error touched={touched.address} message={errors.address} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Country</Form.Label>
                              <Form.Control
                                as={"select"}
                                name={"country"}
                                onChange={(event) => {changeCountry(event); handleChange(event)}}
                                className={touched.country && errors.country ? 'form-control has-error' : 'form-control'}
                                value={selectedCountry}
                              >
                                <option disabled>Select Country</option>
                                {countriesList.map((country) => {
                                return (<option key={country.geo_id} value={country.geo_id}>{country.geo_name}</option>);
                                })}
                              </Form.Control>
                            </div>
                            <Error touched={touched.country} message={errors.country} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                as={"select"}
                                name={"state"}
                                onChange={handleChange}
                                className={touched.state && errors.state ? 'form-control has-error' : 'form-control'}
                                value={values.state}
                              >
                                <option disabled>Select Country</option>
                                {statesList.map((country) => {
                                return (<option key={country.geo_id} value={country.geo_id}>{country.geo_name}</option>);
                                })}
                              </Form.Control>
                            </div>
                            <Error touched={touched.state} message={errors.state} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>City</Form.Label>
                                <Input
                                  type="city"
                                  id="city"
                                  name="city"
                                  placeholder="Enter City"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.city}
                                  className={touched.city && errors.city ? 'form-control has-error' : 'form-control'}
                                />
                            </div>
                            <Error touched={touched.city} message={errors.city} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Pincode</Form.Label>
                              <Input
                                type="number"
                                id="pincode"
                                name="pincode"
                                placeholder="Enter Pincode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pincode}
                                className={touched.pincode && errors.pincode ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.pincode} message={errors.pincode} />
                          </Form.Group>
                        </Col>
                      </div>
                    </div>

                    <div className="add-form-box d-flex flex-column mb-4">
                      <Col>
                        <h2 className="mb-5">Person Detail</h2>
                      </Col>
                      <div className="d-flex flex-wrap">
                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>First Name</Form.Label>
                                <Input
                                  type="firstname"
                                  id="firstname"
                                  name="firstname"
                                  placeholder="Enter First Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.firstname}
                                  className={touched.firstname && errors.firstname ? 'form-control has-error' : 'form-control'}
                                />
                            </div>
                            <Error touched={touched.firstname} message={errors.firstname} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Middle Name</Form.Label>
                                <Input
                                  type="text"
                                  placeholder="Enter Middle Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.middlename}
                                  className={touched.middlename && errors.middlename ? 'form-control has-error' : 'form-control'}
                                />
                            </div>
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Last Name</Form.Label>
                              <Input
                                type="lastname"
                                id="lastname"
                                disabled    name="lastname"
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                className={touched.lastname && errors.lastname ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.lastname} message={errors.lastname} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Designation</Form.Label>
                              <Input
                                type="text"
                                id="designation"
                                name="designation"
                                placeholder="Enter Designation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                className={touched.designation && errors.designation ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.designation} message={errors.designation} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>D.O.B</Form.Label>
                              <Input
                                type="date"
                                id="dob"
                                name="dob"
                                placeholder="Enter DOB"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dob}
                                className={touched.dob && errors.dob ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.dob} message={errors.dob} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Gender</Form.Label>
                              <Form.Control
                                as={"select"} 
                                name={"gender"}
                                onChange={handleChange}
                                onSelect={(value) => {setGender(value)}}
                                className={touched.gender && errors.gender ? 'form-control has-error' : 'form-control'}
                                value={values.gender}
                              >
                                <option disabled>Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                              </Form.Control>
                            </div>
                            <Error touched={touched.gender} message={errors.gender} />
                          </Form.Group>
                        </Col>
                      </div>
                    </div>

                    <div className="add-form-box d-flex flex-column mb-4">
                      <Col>
                        <h2 className="mb-5">Telecom Number</h2>
                      </Col>
                      <div className="d-flex flex-wrap">
                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Country Code</Form.Label>
                              <Input
                                type="number"
                                id="countrycode"
                                name="countrycode"
                                placeholder="Enter Country Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.countrycode}
                                className={touched.countrycode && errors.countrycode ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.countrycode} message={errors.countrycode} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Area Code</Form.Label>
                              <Input
                                type="number"
                                id="areacode"
                                name="areacode"
                                placeholder="Enter Area Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.areacode}
                                className={touched.areacode && errors.areacode ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.areacode} message={errors.areacode} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Contact No.</Form.Label>
                              <Input
                                type="number"
                                id="contact"
                                name="contact"
                                placeholder="Enter Contact Number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contact}
                                className={touched.contact && errors.contact ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.contact} message={errors.contact} />
                          </Form.Group>
                      </Col>
                    </div>
                  </div>

                  <div className="add-form-box d-flex flex-column mb-5">
                    <Col>
                      <h2 className="mb-5">User Login</h2>
                    </Col>
                    <div className="d-flex flex-wrap">
                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Login</Form.Label>
                            <Input
                              type="text"
                              id="login"
                              name="login"
                              placeholder="Login"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.login}
                              className={touched.login && errors.login ? 'form-control has-error' : 'form-control'}
                            />
                          </div>
                          <Error touched={touched.login} message={errors.login} />
                        </Form.Group>
                      </Col>

                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Password</Form.Label>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className={touched.password && errors.password ? 'form-control has-error' : 'form-control'}
                            />
                          </div>
                          <Error touched={touched.password} message={errors.password} />
                        </Form.Group>
                      </Col>

                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Repeat Pass.</Form.Label>
                            <Input
                              type="password"
                              id="confirmpassword"
                              name="confirmpassword"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmpassword}
                              className={touched.confirmpassword && errors.confirmpassword ? 'form-control has-error' : 'form-control'}
                            />
                          </div>
                          <Error touched={touched.confirmpassword} message={errors.confirmpassword} />
                        </Form.Group>
                      </Col>
                    </div>
                  </div>

                    <div className="submit-col mb-5 mt-5 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>          
        </Row>
        {showToast &&
          <Toast onClose={() => setShowToast(false)} delay={3000} show={showToast} autohide>
            <div className="toast-container">
              <Toast.Header>
                Alert
              </Toast.Header>
              <Toast.Body>
                {toastMsg}
              </Toast.Body>
            </div>
          </Toast>
        }
      </Container>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    error: state.schools.error,
    isLoading: state.schools.isLoading,
    school: state.schools.school,
    countriesList: state.schools.countriesList,
    statesList: state.schools.statesList
  };
}

export default connect(mapStateToProps)(School);

import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Form, Col, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";
import Input from '../../components/Input';
import Header from '../../components/Header';
import ReactUploadFile from '../../components/ReactUploadFile';
import Error from './Error';
import { validationSchema } from './ValidationSchema';
import { addStaff, getCountries, getCountryStates } from '../../redux/staffs';

import './add-school.scss';

const StudentLeaveApply = (props) => {
  const history = useHistory();
  const { dispatch } = props;
  const [gender, setGender] = useState('F');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(()=>{
    dispatch(getCountries());    
  }, [dispatch]);

  const changeCountry = (event) => {
    setSelectedCountry(event.target.value);
    dispatch(getCountryStates(event.target.value));
  }
  
  const handleSubmit = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    const payload = {
      role_type_id: "STAFF",
    };
    payload.person = {};
    payload.person.fname = values.firstname;
    payload.person.lname = values.lastname;
    payload.person.designation = values.designation;
    payload.person.dob = values.dob;
    payload.person.gender = values.gender;

    if (!!values.middlename && values.middlename.trim().length > 0) {
      payload.person.mname = values.middlename;
    }

    if (!!values.emails && values.emails.trim().length > 0) {
      payload.emails = [values.emails];
    }

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

    dispatch(addStaff(payload))
    .then(response => {
      const { apiresponse } = response;
      console.log(apiresponse, 'Updated');
      if (apiresponse && apiresponse.type === "OK") {
        setToastMsg(apiresponse.message);
        setShowToast(true);
        setTimeout(() => { history.push("/staff"); }, 3000);
        return;
      }

      setToastMsg('There was some problem. Please check');
      setShowToast(true);
    })
    .catch(error => {
      console.log("Add Staff error: ", error);
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
                        <h2 className="mb-5">Apply Leaves</h2>
                      </Col>
                      <div className="d-flex flex-wrap">
                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>From Date</Form.Label>
                              <Input
                                type="date"
                                id="leavedate"
                                name="leavedate"
                                placeholder="Enter Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.leavedate}
                                className={touched.leavedate && errors.leavedate ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.leavedate} message={errors.leavedate} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>To Date</Form.Label>
                              <Input
                                type="date"
                                id="to_date"
                                name="to_date"
                                placeholder="Enter Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.to_date}
                                className={touched.to_date && errors.to_date ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.to_date} message={errors.to_date} />
                          </Form.Group>
                        </Col>

                        <Col xs="12" lg="4">
                          <Form.Group controlId="formBasicPassword">
                            <div className="form-col w-100 col-12 p-0">
                              <Form.Label>Leave Title</Form.Label>
                              <Input
                                type="text"
                                id="leave_title"
                                name="leave_title"
                                placeholder="Enter Leave Title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.leave_title}
                                className={touched.leave_title && errors.leave_title ? 'form-control has-error' : 'form-control'}
                              />
                            </div>
                            <Error touched={touched.leave_title} message={errors.leave_title} />
                        </Form.Group>
                      </Col>

                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Leave Type</Form.Label>
                            <Input
                              type="text"
                              id="leave_type"
                              name="leave_type"
                              placeholder="Enter Leave Type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.leave_type}
                              className={touched.leave_type && errors.leave_type ? 'form-control has-error' : 'form-control'}
                            />
                          </div>
                          <Error touched={touched.leave_type} message={errors.leave_type} />
                        </Form.Group>
                      </Col>

                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Leave Reason</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="2" 
                              type="text"
                              id="leave_reason"
                              name="leave_reason"
                              placeholder="Enter Leave Reason"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.leave_reason}
                              className={touched.leave_reason && errors.leave_reason ? 'form-control has-error' : 'form-control'}
                            />
                          </div>
                          <Error touched={touched.leave_reason} message={errors.leave_reason} />
                        </Form.Group>
                      </Col>

                      <Col xs="12" lg="4">
                        <Form.Group controlId="formBasicPassword">
                          <div className="form-col w-100 col-12 p-0">
                            <Form.Label>Upload File Here</Form.Label>
                            <div className="files">
                              <ReactUploadFile />
                            </div>
                          </div>
                          <Error touched={touched.leave_reason} message={errors.leave_reason} />
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
    error: state.staffs.error,
    isLoading: state.staffs.isLoading,
    staff: state.staffs.staff,
    countriesList: state.staffs.countriesList,
    statesList: state.staffs.statesList
  };
}

export default connect(mapStateToProps)(StudentLeaveApply);

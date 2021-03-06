import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchStaffList } from '../../redux/staff-list';
import './school.scss';

const Staff = (props) => {
  const [staffs, setStaff] = useState(props.staffList);

  useEffect(() => {
    const { dispatch } = props;
    dispatch(fetchStaffList())
    .then(response => {
      console.log(response, 'RESPONSE');
      setStaff(response);
    });
  }, []);
 
  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row>
          <div className="space-row d-flex justify-content-between w-100">
            <h2>Staffs</h2>
            <div className="add-school">
              <Button
                variant="outline-secondary"
                href="/add-staff"
              >
               + Add Staff
              </Button>
            </div>
          </div>          
        </Row>
        <Row className="mt-5">
          <div className="table-responsive school-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Staff Name</th>
                  <th>Staff Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  const schoolAddress = staff.postal_address ? 
                    staff.postal_address.formatted_address : '';
                  return (
                    <tr key={index}>
                      <td className="align-middle w-5-per">{index + 1}</td>
                      <td className="align-middle w-25-per">{staff.fname} {staff.lname}</td>
                      <td className="align-middle w-40-per">
                        {schoolAddress}
                      </td>
                      <td className="align-middle w-30-per">
                        <Button variant="outline-success mr-3">Edit</Button>
                        <Button variant="outline-danger">Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    staffList: state.staffList.staffList,
  };
}

export default connect(mapStateToProps)(Staff);

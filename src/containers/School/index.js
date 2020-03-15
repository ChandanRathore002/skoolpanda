import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchSchoolList } from '../../redux/school-list';
import './school.scss';

const School = (props) => {
  const [schools, setSchools] = useState(props.schoolList);

  useEffect(() => {
    const { dispatch } = props;
    dispatch(fetchSchoolList())
    .then(response => {
      console.log(response, 'RESPONSE');
      setSchools(response);
    });
  }, []);
 
  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row>
          <div className="space-row d-flex justify-content-between w-100">
            <h2>Schools</h2>
            <div className="add-school">
              <Button
                variant="outline-secondary"
                href="/add-schools"
              >
               + Add School
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
                  <th>School Name</th>
                  <th>partyID</th>
                  <th>Schoo Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => {
                  const schoolAddress = school.postal_address ? 
                    school.postal_address.formatted_address : '';
                  return (
                    <tr key={index}>
                      <td className="align-middle w-5-per">{index + 1}</td>
                      <td className="align-middle w-25-per">{school.group_name}</td>
                      <td className="align-middle w-5-per">{school.party_id}</td>
                      <td className="align-middle w-25-per">
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
    schoolList: state.schoolList.schoolList,
  };
}

export default connect(mapStateToProps)(School);

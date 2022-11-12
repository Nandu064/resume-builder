import React, { useContext } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { AppContext } from "../../context/AppContext";

const PersonalDetails = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const { personalDetails } = formData;
  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        [event.target.name]: event.target.value,
      },
    });
    let ldata = JSON.parse(localStorage.getItem("details")) ?? {};

    let obj = {
      ...ldata,
      personalDetails: {
        ...ldata?.personalDetails,
        [event.target.name]: event.target.value,
      },
    };
    localStorage.setItem("details", JSON.stringify(obj));
  };

  return (
    <div>
      <Row className="text-center">
        <h5>Personal Details</h5>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="10" xs="12">
          <Form id="personal_form">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="fname">First Name</Label>
                  <Input
                    id="fname"
                    name="first_name"
                    placeholder="Enter your first Name"
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.first_name}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lname">Last Name</Label>
                  <Input
                    id="lName"
                    name="last_name"
                    placeholder="Enter your last name"
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.last_name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="abc@example.com"
                    type="email"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.email}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="mobile">Phone Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.mobile}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                type="textarea"
                onChange={(e) => onChangeHandler(e)}
                value={personalDetails?.address}
              />
            </FormGroup>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="summary">Summary</Label>
                  <Input
                    id="summary"
                    name="summary"
                    placeholder="Some thing about you..."
                    type="textarea"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.summary}
                    maxLength={60}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex.Web Developer"
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.title}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="linkedIn">LinkeIn</Label>
                  <Input
                    id="linkedIn"
                    name="linkedIn"
                    placeholder="LinkedIn URL"
                    type="url"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.linkedIn}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="github">Github URL</Label>
                  <Input
                    id="github"
                    name="github"
                    placeholder="Github URL"
                    type="url"
                    onChange={(e) => onChangeHandler(e)}
                    value={personalDetails?.github}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDetails;

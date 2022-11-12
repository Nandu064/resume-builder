import React, { useContext, useState, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { AppContext } from "../../context/AppContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
const Experience = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const { experienceDetails } = formData;
  // const educationRef = useRef(experienceDetails ?? []);
  const [experience, setExperience] = useState({});
  const [formType, setFormType] = useState("add");
  const [allExperiences, setAllExperiences] = useState(experienceDetails ?? []);
  const [selectedEduction, setSelectedEduction] = useState({});
  const [editingExperience, setEditingExperience] = useState({});

  const onChangeHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "present") {
      value = event.target.checked;
    }
    setExperience({
      ...experience,
      [event.target.name]: value,
    });
  };
  const handleEdit = (experience) => {
    console.log("experience: ", experience);
    setFormType("edit");
    setSelectedEduction(experience);
    setEditingExperience(experience);
  };
  const handleDelete = (experience) => {
    console.log("experience: ", experience);
    let arr = allExperiences.filter((v) => v.id !== experience.id);
    console.log("arr: ", arr);
    setAllExperiences(arr);

    setFormData({
      ...formData,
      experienceDetails: arr,
    });
  };
  const addExperienceHandler = () => {
    console.log("experience: ", experience);
    if (Object.keys(experience).length > 0) {
      let obj = { ...experience, id: experienceDetails.length + 1 };
      if (obj.present) {
        obj.end_date = "present";
      }
      setAllExperiences([...allExperiences, obj]);

      console.log("form experience: ", allExperiences);
      setFormData({
        ...formData,
        experienceDetails: [...allExperiences, obj],
      });
    }
    document.querySelector("#experience_form").reset();
    setExperience({});
    document.querySelector("#description").value = "";
  };
  const onChangeEditHandler = (e) => {
    let value = e.target.value;

    if (e.target.name === "present") {
      value = e.target.checked;
    }
    let updatedObj = { ...selectedEduction, [e.target.name]: value };
    setSelectedEduction(updatedObj);
  };
  const updateExperienceHandler = () => {
    if (Object.keys(selectedEduction).length > 0) {
      console.log("selectedEduction: ", selectedEduction);
      let obj = {
        ...selectedEduction,
        id: selectedEduction.id,
      };
      console.log("obj edit: ", editingExperience);
      if (obj.present) {
        obj.end_date = "present";
      }
      console.log("obj update: ", obj);
      let index = allExperiences.findIndex(
        (element) => element.id === editingExperience.id
      );
      console.log("index: ", index);
      let allEd = allExperiences;
      allEd.splice(index, 1, obj);
      console.log("allEd: ", allEd);

      setAllExperiences(allEd);

      console.log("form experience: ", allExperiences);
      setFormData({
        ...formData,
        experienceDetails: allEd,
      });
      setFormType("add");
      document.querySelector("#education_edit_form").reset();
      document.querySelector("#description").value = "";
    }
  };
  console.log("form educationall: ", allExperiences);
  console.log("form experienceDetails: ", experienceDetails);
  // const getFullYear = (type) => {
  //   let maxYear = "";
  //   let date = new Date();
  //   let year = date.getFullYear();
  //   let month = date.getUTCMonth();
  //   console.log("year: ", year);
  //   if (type === "start") {
  //     maxYear = `${year}-01`;
  //   } else {
  //     maxYear = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}`;
  //   }
  //   return maxYear;
  // };
  return (
    <div>
      <Row className="text-center">
        <h5>Experience</h5>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="10" xs="12">
          {formType === "add" ? (
            <Form id="experience_form">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      placeholder="Enter your Company Name"
                      type="text"
                      onChange={(e) => onChangeHandler(e)}
                      value={experience?.company_name}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Enter your Role"
                      type="text"
                      onChange={(e) => onChangeHandler(e)}
                      value={experience?.role}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="About your role... "
                      type="textarea"
                      onChange={(e) => onChangeHandler(e)}
                      value={experience?.description}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="date placeholder"
                      type="month"
                      // required
                      // min={getFullYear("start")}
                      onChange={(e) => onChangeHandler(e)}
                      value={experience?.start_date}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} xs={6}>
                  <FormGroup>
                    <Label for="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      disabled={experience?.present}
                      name="end_date"
                      placeholder={
                        experience?.present ? "present" : "date placeholder"
                      }
                      type="month"
                      // max={getFullYear("end")}
                      value={experience?.end_date}
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </FormGroup>
                </Col>
                <Col
                  md={3}
                  xs={6}
                  className="d-flex align-items-center mt-3 justify-content-start"
                >
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      name="present"
                      id="present"
                      onChange={(e) => {
                        // setFormData({
                        //   ...formData,
                        //   // educationDetails:
                        // });
                        onChangeHandler(e);
                        //   console.log("e: ", e.target.checked);
                      }}
                    />{" "}
                    <Label check>present</Label>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="d-flex justify-content-start">
                  <Button type="button" onClick={addExperienceHandler}>
                    &#43; Add Experience
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form id="education_edit_form">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      placeholder="Enter your Company Name"
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.company_name}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Enter your Role"
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.role}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="About your role..."
                      type="textarea"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.description}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      placeholder="date placeholder"
                      type="month"
                      // required
                      // min={getFullYear("start")}
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.start_date}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} xs={6}>
                  <FormGroup>
                    <Label for="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      placeholder={
                        selectedEduction?.present
                          ? "present"
                          : "date placeholder"
                      }
                      type="month"
                      // max={getFullYear("end")}
                      onChange={(e) => onChangeEditHandler(e)}
                      value={
                        selectedEduction?.present
                          ? ""
                          : selectedEduction?.end_date
                      }
                      disabled={selectedEduction?.present}
                    />
                  </FormGroup>
                </Col>
                <Col
                  md={3}
                  xs={6}
                  className="d-flex align-items-center mt-3 justify-content-start"
                >
                  <FormGroup check>
                    <Input
                      id="present"
                      name="present"
                      type="checkbox"
                      defaultChecked={selectedEduction?.present}
                      onChange={(e) => onChangeEditHandler(e)}
                    />{" "}
                    <Label check>present</Label>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="d-flex justify-content-start">
                  <Button type="button" onClick={updateExperienceHandler}>
                    <FaEdit className="me-1 pb-1" />
                    Update Experience
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          {allExperiences.map((experience) => (
            <Row className="mt-5">
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="text-capitalize">
                      {experience?.role} - {experience?.company_name}
                    </h4>
                    <small
                      className="text-muted text-capitalize"
                      style={{ fontWeight: "bold" }}
                    >
                      {experience?.start_date} - {experience?.end_date}
                    </small>
                  </div>

                  <div className="d-flex justify-content-end ">
                    <span onClick={() => handleEdit(experience)}>
                      <FaEdit
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span onClick={() => handleDelete(experience)}>
                      <RiDeleteBin4Fill
                        className="ms-2 "
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <p style={{ fontSize: "20 px" }}>{experience?.description}</p>
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Experience;

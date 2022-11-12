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
const EducationDetails = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const { educationDetails } = formData;
  const educationRef = useRef(educationDetails ?? []);
  const [education, setEducation] = useState({});
  const [formType, setFormType] = useState("add");
  const [allEducations, setAllEducations] = useState(educationDetails ?? []);
  const [selectedEduction, setSelectedEduction] = useState({});
  const [editingEducation, setEditingEducation] = useState({});

  const [edArray, setEdArray] = useState([1]);
  const onChangeHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "present") {
      value = event.target.checked;
    }
    setEducation({
      ...education,
      [event.target.name]: value,
    });
  };
  const handleEdit = (education) => {
    console.log("education: ", education);
    setFormType("edit");
    setSelectedEduction(education);
    setEditingEducation(education);
  };
  const handleDelete = (education) => {
    console.log("education: ", education);
    let arr = allEducations.filter((v) => v.id !== education.id);
    console.log("arr: ", arr);
    setAllEducations(arr);

    setFormData({
      ...formData,
      educationDetails: arr,
    });
  };
  const addEducationHandler = () => {
    if (Object.keys(education).length > 0) {
      let obj = { ...education, id: education.program.toLowerCase() };
      if (obj.present) {
        obj.end_date = "present";
      }
      setAllEducations([...allEducations, obj]);

      console.log("form education: ", allEducations);
      setFormData({
        ...formData,
        educationDetails: [...allEducations, obj],
      });
    }
    document.querySelector("#education_form").reset();
    setEducation({});
  };
  const onChangeEditHandler = (e) => {
    let value = e.target.value;

    if (e.target.name === "present") {
      value = e.target.checked;
    }
    let updatedObj = { ...selectedEduction, [e.target.name]: value };
    setSelectedEduction(updatedObj);
  };
  const updateEducationHandler = () => {
    if (Object.keys(selectedEduction).length > 0) {
      console.log("selectedEduction: ", selectedEduction);
      let obj = {
        ...selectedEduction,
        id: selectedEduction.program.toLowerCase(),
      };
      console.log("obj edit: ", editingEducation);
      if (obj.present) {
        obj.end_date = "present";
      }
      console.log("obj update: ", obj);
      let index = allEducations.findIndex(
        (element) => element.id === editingEducation.id
      );
      console.log("index: ", index);
      let allEd = allEducations;
      allEd.splice(index, 1, obj);
      console.log("allEd: ", allEd);

      setAllEducations(allEd);

      console.log("form education: ", allEducations);
      setFormData({
        ...formData,
        educationDetails: allEd,
      });
      setFormType("add");
      document.querySelector("#education_edit_form").reset();
    }
  };
  console.log("form educationall: ", allEducations);
  console.log("form educationDetails: ", educationDetails);
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
        <h5>Education Details</h5>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="10" xs="12">
          {formType === "add" ? (
            <Form id="education_form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="fname">University Name</Label>
                    <Input
                      id="university_name"
                      name="university_name"
                      placeholder="Enter your University Name"
                      type="text"
                      onChange={(e) => onChangeHandler(e)}
                      value={education?.university_name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="start_date">Study Program</Label>
                    <Input
                      id="program"
                      name="program"
                      placeholder="Eg. B.Tech"
                      type="text"
                      onChange={(e) => onChangeHandler(e)}
                      value={education?.program}
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
                      value={education?.start_date}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} xs={6}>
                  <FormGroup>
                    <Label for="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      disabled={education?.present}
                      name="end_date"
                      placeholder={
                        education?.present ? "present" : "date placeholder"
                      }
                      type="month"
                      // max={getFullYear("end")}
                      value={education?.end_date}
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
                  <Button type="button" onClick={addEducationHandler}>
                    &#43; Add Education
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form id="education_edit_form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="fname">University Name</Label>
                    <Input
                      id="university_name"
                      name="university_name"
                      placeholder="Enter your University Name"
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.university_name}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="start_date">Study Program</Label>
                    <Input
                      id="program"
                      name="program"
                      placeholder="Eg. B.Tech"
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedEduction?.program}
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
                  <Button type="button" onClick={updateEducationHandler}>
                    <FaEdit className="me-1 pb-1" />
                    Update Education
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          {allEducations.map((education) => (
            <Row className="mt-5">
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="text-capitalize">
                      {education?.program} - {education?.university_name}
                    </h4>
                    <small>
                      {education?.start_date} - {education?.end_date}
                    </small>
                  </div>
                  <div className="d-flex justify-content-end">
                    <span onClick={() => handleEdit(education)}>
                      <FaEdit
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span onClick={() => handleDelete(education)}>
                      <RiDeleteBin4Fill
                        className="ms-2 "
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default EducationDetails;

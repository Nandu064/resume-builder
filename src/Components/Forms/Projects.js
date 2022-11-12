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
const Projects = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const { projectDetails } = formData;

  const [project, setProject] = useState({});
  const [formType, setFormType] = useState("add");
  const [allProjects, setAllProject] = useState(projectDetails ?? []);
  const [selectedProject, setSelectedProject] = useState({});
  const [editingProject, setEditingProject] = useState({});

  const [edArray, setEdArray] = useState([1]);
  const onChangeHandler = (event) => {
    let value = event.target.value;
    if (event.target.name === "present") {
      value = event.target.checked;
    }
    setProject({
      ...project,
      [event.target.name]: value,
    });
  };
  const handleEdit = (project) => {
    console.log("project: ", project);
    setFormType("edit");
    setSelectedProject(project);
    setEditingProject(project);
  };
  const handleDelete = (project) => {
    console.log("project: ", project);
    let arr = allProjects.filter((v) => v.id !== project.id);
    console.log("arr: ", arr);
    setAllProject(arr);

    setFormData({
      ...formData,
      projectDetails: arr,
    });
  };
  const addProjectHandler = () => {
    if (Object.keys(project).length > 0) {
      let obj = { ...project, id: projectDetails.length + 1 };
      if (obj.present) {
        obj.end_date = "present";
      }
      setAllProject([...allProjects, obj]);

      console.log("form project: ", allProjects);
      setFormData({
        ...formData,
        projectDetails: [...allProjects, obj],
      });
    }
    document.querySelector("#project_form").reset();
    setProject({});
    document.querySelector("#description").value = "";
  };
  const onChangeEditHandler = (e) => {
    let value = e.target.value;

    if (e.target.name === "present") {
      value = e.target.checked;
    }
    let updatedObj = { ...selectedProject, [e.target.name]: value };
    setSelectedProject(updatedObj);
  };
  const updateEducationHandler = () => {
    if (Object.keys(selectedProject).length > 0) {
      console.log("selectedProject: ", selectedProject);
      let obj = {
        ...selectedProject,
        id: selectedProject.id,
      };
      console.log("obj edit: ", editingProject);
      if (obj.present) {
        obj.end_date = "present";
      }
      console.log("obj update: ", obj);
      let index = allProjects.findIndex(
        (element) => element.id === editingProject.id
      );
      console.log("index: ", index);
      let allEd = allProjects;
      allEd.splice(index, 1, obj);
      console.log("allEd: ", allEd);

      setAllProject(allEd);

      console.log("form project: ", allProjects);
      setFormData({
        ...formData,
        projectDetails: allEd,
      });
      setFormType("add");
      document.querySelector("#education_edit_form").reset();
      document.querySelector("#description").value = "";
    }
  };
  console.log("form educationall: ", allProjects);
  console.log("form projectDetails: ", projectDetails);
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
        <h5>Projects</h5>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="10" xs="12">
          {formType === "add" ? (
            <Form id="project_form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="title">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter title of the project"
                      type="text"
                      onChange={(e) => onChangeHandler(e)}
                      value={project?.title}
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
                      placeholder="About project..."
                      type="textarea"
                      onChange={(e) => onChangeHandler(e)}
                      value={project?.description}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                      value={project?.start_date}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} xs={6}>
                  <FormGroup>
                    <Label for="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      disabled={project?.present}
                      name="end_date"
                      placeholder={
                        project?.present ? "present" : "date placeholder"
                      }
                      type="month"
                      // max={getFullYear("end")}
                      value={project?.end_date}
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
                        //   // projectDetails:
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
                  <Button type="button" onClick={addProjectHandler}>
                    &#43; Add Project
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form id="education_edit_form">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="title">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter title of the project"
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedProject?.title}
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
                      placeholder="About Project..."
                      type="text"
                      onChange={(e) => onChangeEditHandler(e)}
                      value={selectedProject?.description}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                      value={selectedProject?.start_date}
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
                        selectedProject?.present
                          ? "present"
                          : "date placeholder"
                      }
                      type="month"
                      // max={getFullYear("end")}
                      onChange={(e) => onChangeEditHandler(e)}
                      value={
                        selectedProject?.present
                          ? ""
                          : selectedProject?.end_date
                      }
                      disabled={selectedProject?.present}
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
                      defaultChecked={selectedProject?.present}
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
                    Update Project
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          {allProjects.map((project) => (
            <Row className="mt-5">
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4>{project?.title}</h4>
                    <small>
                      {project?.start_date} - {project?.end_date}
                    </small>
                  </div>
                  <div className="d-flex justify-content-end">
                    <span onClick={() => handleEdit(project)}>
                      <FaEdit
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span onClick={() => handleDelete(project)}>
                      <RiDeleteBin4Fill
                        className="ms-2 "
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <p>{project.description}</p>
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Projects;

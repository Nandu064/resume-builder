import React, { useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { AppContext } from "../../context/AppContext";
import { FaMobile, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import "./template1.css";
const Template1 = () => {
  const { formData, setFormData } = useContext(AppContext);
  const {
    personalDetails,
    projectDetails,
    educationDetails,
    experienceDetails,
    skills,
    languages,
    hobbies,
  } = formData;
  useEffect(() => {
    let ldata = JSON.parse(localStorage.getItem("details"));
    setFormData({
      ...formData,
      ...ldata,
    });
    console.log("formData: temp1 ", formData);
  }, []);
  return (
    <Row className="mb-5 m-auto template_wrapper ">
      <Col md={12}>
        <Card>
          <CardHeader className="bg-light border-0">
            <div className="w-100 d-flex justify-content-end ">
              <a href="/view-jobs" className="view_jobs">
                View Jobs based on your skills
              </a>
            </div>
          </CardHeader>
          <CardBody className="bg-light">
            <div
              className="back-color p-3"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 2px 5px 0px, rgba(0, 0, 0, 0.19) 0px 2px 12px 0px",
              }}
            >
              <div className="row">
                <div className="col-12">
                  <div className="text-center mt-3">
                    {personalDetails &&
                      Object?.keys(personalDetails).length > 0 && (
                        <>
                          <div className=" p-2 mb-2">
                            <h4 className="text-capitalize">
                              {personalDetails?.first_name}{" "}
                              {personalDetails?.last_name}
                            </h4>
                            <h6 className="text-muted">
                              {" "}
                              {personalDetails?.summary}
                            </h6>
                          </div>
                          <p className="mb-0">
                            <Row>
                              {personalDetails?.mobile && (
                                <Col md={6} style={{ textAlign: "left" }}>
                                  <span>
                                    <FaMobile /> {personalDetails?.mobile}
                                  </span>
                                </Col>
                              )}
                              {personalDetails?.email && (
                                <Col md={6} style={{ textAlign: "left" }}>
                                  <span>
                                    <FaEnvelope /> {personalDetails?.email}
                                  </span>
                                </Col>
                              )}
                            </Row>{" "}
                          </p>
                          <Row className="mt-2">
                            {personalDetails?.linkedIn && (
                              <Col md={6} style={{ textAlign: "left" }}>
                                <span>
                                  <FaLinkedin />
                                  &nbsp;{personalDetails?.linkedIn}
                                </span>
                              </Col>
                            )}
                            {personalDetails?.github && (
                              <Col md={6} style={{ textAlign: "left" }}>
                                <span>
                                  <FaGithub />
                                  &nbsp;{personalDetails?.github}
                                </span>
                              </Col>
                            )}
                          </Row>

                          <hr className="mt-2 line" />
                        </>
                      )}
                    {educationDetails.length > 0 && (
                      <div>
                        <h4 className="mt-3 mb-0">EDUCATION</h4>
                        {educationDetails.map((education) => (
                          <Row className="mt-2" key={education.id}>
                            <Col md={12}>
                              <div className="d-flex justify-content-start">
                                <div>
                                  <h5
                                    style={{ textAlign: "left" }}
                                    className="text-capitalize"
                                  >
                                    {education?.program} -{" "}
                                    {education?.university_name}
                                  </h5>
                                  <p
                                    className="w-100 text-capitalize"
                                    style={{ textAlign: "left" }}
                                  >
                                    {education?.start_date} -{" "}
                                    {education?.end_date}
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
                    {experienceDetails.length > 0 && (
                      <div>
                        <hr className="line" />
                        <h4 className="mt-3 mb-0">Experience</h4>
                        {experienceDetails.map((experience) => (
                          <Row className="mt-2" key={experience.id}>
                            <Col md={12}>
                              <div className="d-flex justify-content-start ">
                                <div>
                                  <h5
                                    style={{ textAlign: "left" }}
                                    className="text-capitalize"
                                  >
                                    {experience?.company_name} -{" "}
                                    {experience?.role}
                                  </h5>
                                  <p
                                    className="w-100 text-capitalize"
                                    style={{ textAlign: "left" }}
                                  >
                                    {experience?.start_date} -{" "}
                                    {experience?.end_date}
                                  </p>
                                </div>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                <p>{experience?.description}</p>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
                    {projectDetails.length > 0 && (
                      <div>
                        <hr className="line" />
                        <h4 className="mt-3 mb-0">Projects</h4>
                        {projectDetails.map((project) => (
                          <Row className="mt-2" key={project.id}>
                            <Col md={12}>
                              <div className="d-flex justify-content-start ">
                                <div>
                                  <h5
                                    style={{ textAlign: "left" }}
                                    className="text-capitalize"
                                  >
                                    {project?.title}
                                  </h5>
                                  <p
                                    className="w-100 text-capitalize"
                                    style={{ textAlign: "left" }}
                                  >
                                    {project?.start_date} - {project?.end_date}
                                  </p>
                                </div>
                              </div>
                              <div style={{ textAlign: "left" }}>
                                <p>{project?.description}</p>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    )}
                    <Row className="mt-2">
                      <hr className="line" />
                      {skills?.length > 0 && (
                        <Col md={6} xs={12}>
                          <div>
                            <h5 style={{ textAlign: "left" }}>Skills</h5>
                            {/* <p>{skills?.join(", ")}</p> */}
                            <ListGroup numbered>
                              {skills.map((skill) => (
                                <ListGroupItem
                                  className="border-0 px-0 text-capitalize"
                                  style={{ textAlign: "left" }}
                                >
                                  {skill}
                                </ListGroupItem>
                              ))}
                            </ListGroup>
                          </div>
                        </Col>
                      )}

                      {languages?.length > 0 && (
                        <Col md={6} xs={12}>
                          <div>
                            <h5 style={{ textAlign: "left" }}>Languages</h5>
                            {/* <p>{languages?.join(", ")}</p> */}
                            <ListGroup numbered>
                              {languages.map((language) => (
                                <ListGroupItem
                                  className="border-0 px-0 text-capitalize"
                                  style={{ textAlign: "left" }}
                                >
                                  {language}
                                </ListGroupItem>
                              ))}
                            </ListGroup>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Template1;

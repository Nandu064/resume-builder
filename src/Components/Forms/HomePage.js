import React, { useContext, useState, useEffect } from "react";

import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import Experience from "./Experience";
import Skills from "./Skills";
import Languages from "./Languages";
import Miscleanous from "./Miscleanous";
import { AppContext } from "../../context/AppContext";
import { json, useNavigate } from "react-router-dom";
import Projects from "./Projects";

const HomePage = () => {
  const navigate = useNavigate("");
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(currentForm);
  const submitHandler = () => {
    localStorage.setItem("details", JSON.stringify(formData));
    navigate("/view-resume");
  };
  useEffect(() => {
    return () => {
      setCurrentPage(0);
    };
  }, []);
  const returnForm = (currentForm) => {
    switch (currentForm) {
      case 0:
        return <PersonalDetails />;
      // break;
      case 1:
        return <EducationDetails />;
      // break;
      case 2:
        return <Experience />;
      case 3:
        return <Projects />;
      // break;
      case 4:
        return <Skills />;
      // break;
      case 5:
        return <Languages />;
      // break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (currentForm <= 5) {
      setCurrentPage(currentForm);
    } else {
      return;
    }
  }, [currentForm]);
  return (
    <div>
      <Card
        body
        className="my-2 border-0 bg-light"
        style={{
          boxShadow:
            " 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 12px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <CardBody>{returnForm(currentPage)}</CardBody>
        <CardFooter className="border-0 bg-transparent">
          <Row className="d-flex justify-content-center">
            <Col xs="12" md="10" className="d-flex justify-content-end">
              <Button
                color="primary"
                onClick={handlePrevPage}
                disabled={currentForm === 0}
                type="button"
              >
                Previous
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={currentForm >= 5 ? submitHandler : handleNextPage}
                className="ms-2"
              >
                {currentForm >= 5 ? "Submit" : "Next"}
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomePage;

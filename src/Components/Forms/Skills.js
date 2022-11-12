import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { AppContext } from "../../context/AppContext";

const Skills = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const inputRef = useRef("");
  const { skills } = formData;

  const addSkillsHandler = () => {
    if (inputRef.current !== "") {
      let array = [...skills, inputRef.current];
      setFormData({ ...formData, skills: [...new Set(array)] });
      document.querySelector("#skill_form").reset();
    }
  };

  return (
    <div>
      <Row className="text-center">
        <h5>Skills</h5>
      </Row>
      <Row>
        <Col md={6}>
          <Form id="skill_form">
            <FormGroup>
              <Label>Add Your Technical Skills</Label>
              <Input
                id="skill"
                name="skill"
                type="text"
                placeholder="Eg. React.js"
                onChange={(e) => {
                  inputRef.current = e.target.value;
                }}
              />
              <Input className="d-none" />
            </FormGroup>
            <Button
              type="button"
              id="skill_submit_btn"
              onClick={(e) => addSkillsHandler(e)}
            >
              &#43; Add Skill
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ListGroup className="border-0" numbered>
            {skills.map((skill, index) => (
              <ListGroupItem
                key={skill + "_" + index}
                className="border-0 text-capitalize"
              >
                {skill}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Skills;

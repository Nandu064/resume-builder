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

const Languages = () => {
  const { formData, setFormData, currentForm, handleNextPage, handlePrevPage } =
    useContext(AppContext);
  const inputRef = useRef("");
  const { languages } = formData;
  const addLanguageHandler = () => {
    if (inputRef.current !== "") {
      let array = [...languages, inputRef.current];
      setFormData({ ...formData, languages: [...new Set(array)] });
      document.querySelector("#language_form").reset();
    }
  };
  return (
    <div>
      <Row className="text-center">
        <h5>Languages</h5>
      </Row>
      <Row>
        <Col md={6}>
          <Form id="language_form">
            <FormGroup>
              <Label>Add Languages</Label>
              <Input
                id="language"
                name="language"
                type="text"
                placeholder="Eg. English"
                onChange={(e) => {
                  inputRef.current = e.target.value;
                }}
              />
              <Input className="d-none" />
            </FormGroup>
            <Button
              type="button"
              id="language_submit_btn"
              onClick={(e) => addLanguageHandler(e)}
            >
              &#43; Add Language
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <ListGroup className="border-0" numbered>
            {languages.map((language, index) => (
              <ListGroupItem
                key={language + "_" + index}
                className="border-0 text-capitalize"
              >
                {language}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Languages;

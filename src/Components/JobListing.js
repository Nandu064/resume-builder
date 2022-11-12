import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "reactstrap";
import { AppContext } from "../context/AppContext";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const JobListing = () => {
  const [loading, setLoading] = useState(true);
  const { formData } = useContext(AppContext);
  const jobsRef = useRef([]);

  useEffect(() => {
    const host = "data.usajobs.gov";
    const userAgent = "Harish861432@gmail.com";
    const authKey = "uaeQPclAUE505cGNBWKJQ0f5AEA/mU2Gy+/Pnin4K8w=";

    let ldata = JSON.parse(localStorage.getItem("details"));
    let skills = ldata?.skills ?? [];

    if (skills.length > 0) {
      skills?.forEach((skill) => {
        const options = {
          method: "GET",
          url: `/api/search?Keyword=${skill}`,
          headers: {
            Host: host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey,
          },
        };

        axios
          .request(options)
          .then(function (response) {
            setLoading(false);
            // console.log(response.data.SearchResult.SearchResultItems);
            let data = response.data.SearchResult.SearchResultItems;
            let jobData = data.map((item) => {
              let obj = {
                jobid: item.MatchedObjectId,
                ...item.MatchedObjectDescriptor,
              };

              return obj;
            });
            jobsRef.current = jobData;
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mb-4">
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader className="text-center bg-light">
              <h5>Jobs based on your skills</h5>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner className="me-3" />
                  loading...
                </div>
              ) : jobsRef.current.length > 0 ? (
                <Row>
                  {jobsRef.current.map(
                    (job, index) =>
                      job?.jobid && (
                        <Col md={4} sm={6} key={job?.jobid + "_" + index}>
                          <a
                            id="job-card"
                            href={`${job.PositionURI}`}
                            target="_blank"
                            // className="text-info"
                            rel="noreferrer"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <Card
                              className="mb-4"
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.2) 0px 2px 5px 0px, rgba(0, 0, 0, 0.19) 0px 2px 12px 0px",
                              }}
                            >
                              <CardBody style={{ height: "120px" }}>
                                <h6
                                  style={{
                                    fontSize: "16px",
                                    color: "#000",
                                  }}
                                  className="card_title"
                                >
                                  {job?.PositionTitle}
                                </h6>
                                <div className="d-flex align-items-start">
                                  <span className="me-2" id="location">
                                    <FaMapMarkerAlt style={{ color: "#000" }} />
                                  </span>
                                  <span style={{ color: "#000" }}>
                                    {job?.PositionLocation?.[0]?.CityName}
                                  </span>
                                </div>
                              </CardBody>
                              <CardFooter
                                className="bg-transparent border-0"
                                id="job-card-footer"
                              >
                                <div>
                                  <span>More details</span>{" "}
                                  <span>
                                    <FaArrowRight />
                                  </span>
                                </div>
                              </CardFooter>
                            </Card>
                          </a>
                        </Col>
                      )
                  )}
                </Row>
              ) : (
                <Row>
                  <Col md={12}>
                    <h6 className="text-center">
                      No jobs based on your skills
                    </h6>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default JobListing;

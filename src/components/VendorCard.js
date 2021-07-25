import { useState, useEffect } from "react";
import image from "../google.png";
import ModalForm from "./ModalForm";
import { Container, Row, Card, CardGroup, ListGroup } from "react-bootstrap";

function VendorCard() {
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [founderValue, setFounderValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const [caseStudyValue, setcaseStudyValue] = useState("");
  const [criteriaValue, setCriteriaValue] = useState("");
  const [modalState, setModalState] = useState("modal" | "close");
  const [modalType, setModalType] = useState();
  const [errorMsg, setErrorMsg] = useState(false);

  const handleModal = (type) => {
    setModalState("modal");
    setModalType(type);
  };

  const handleClose = () => {
    setErrorMsg(false);
    setModalState("close");
  };

  var newField = {
    title: titleValue,
    "Overall Score": scoreValue,
    "Product Description": descValue,
    "Funding History": founderValue,
    Pricing: priceValue,
    Features: featureValue,
    "Customer Case Studies": caseStudyValue,
  };

  const objectDeepKeys = (obj) => {
    return Object.keys(obj)
      .filter((key) => obj[key] instanceof Object)
      .map((key) => objectDeepKeys(obj[key]).map((k) => `${k}`))
      .reduce((x, y) => x.concat(y), Object.keys(obj));
  }

  const getCriterias = () => {
    fields.forEach((a) => {
      Object.keys(a).forEach((b) => {
        rows.forEach((r) => {
          if (!Object.keys(a).includes(r)) {
            a[r] = "edit content";
          }
        });
      });
    });
  };
  useEffect(() => {
    getCriterias();
  }, [getCriterias()]);

  const getRows = () => {
    let updatedFields = objectDeepKeys(newField)
    setRows(updatedFields);
  };

  const addRow = () => {
    if (criteriaValue.length < 1) {
      setErrorMsg(true);
      return;
    }

    setErrorMsg(false);
    Object.keys(newField).forEach((key) => {
      if (!rows.includes(key)) {
        rows.push(key);
      }
      newField[criteriaValue] = "";

      const updatedFields = [...rows, criteriaValue];
      setCriteriaValue("");

      setRows(updatedFields);
    });
    getCriterias();
    handleClose();
  };

  const addColumn = () => {
    if (titleValue.length < 1) {
      setErrorMsg(true);
      return;
    }
    setErrorMsg(false);

    const updatedFields = [...fields];
    updatedFields.push(newField);
    setFields(updatedFields);
    setTitleValue("");
    setScoreValue("");
    setFounderValue("");
    setDescValue("");
    setPriceValue("");
    setFeatureValue("");
    setcaseStudyValue("");

    getRows();
    handleClose();
  };

  const removeColumn = (index) => {
    let filtered = [...fields];
    const del = filtered.filter((_, i) => i !== index);
    filtered = del;
    setFields(filtered);
  };

  const removeRow = (field) => {
    fields.forEach((a) => {
      Object.keys(a).forEach(() => {
        rows.forEach(() => {
          delete a[field];

          let filtered = [...rows];
          const del = filtered.filter((val) => val !== field);
          filtered = del;
          setRows(filtered);

          const updated = [...fields];
          setFields(updated);
        });
      });
    });
  };


  return (
    <>
      <Container fluid>
        <ModalForm
          handleClose={handleClose}
          modalState={modalState}
          type={modalType}
          criteriaValue={criteriaValue}
          setCriteriaValue={setCriteriaValue}
          addRow={addRow}
          setTitleValue={setTitleValue}
          titleValue={titleValue}
          setScoreValue={setScoreValue}
          setFounderValue={setFounderValue}
          setDescValue={setDescValue}
          setPriceValue={setPriceValue}
          setFeatureValue={setFeatureValue}
          setcaseStudyValue={setcaseStudyValue}
          founderValue={founderValue}
          addColumn={addColumn}
          errorMsg={errorMsg}
        />
        <span
          className="btn btn-sm text-secondary"
          onClick={() => handleModal("addCriteria")}
        >
          ADD CRITERIA <i className="fa fa-caret-down" aria-hidden="true"></i>
        </span>
        <Row>
          <CardGroup>
            <Card>
              <Card.Body>
                {fields.length < 4 ? (
                  <div
                    onClick={() => handleModal("addVendor")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-center">
                      <i
                        className="fa fa-plus-circle text-success bg-light p-3"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <p className="text-primary text-center mt-2 mb-0">
                      Add New Vendor
                    </p>
                  </div>
                ) : (
                  <h6>
                    Note: To add more vendors to compare you need to first
                    remove one or more vendors. At a time maximum of 4 vendors
                    are allowed to compare.
                  </h6>
                )}
              </Card.Body>

              <ListGroup variant="flush">
                {Object.values(rows).map((field, index) => {
                  return (
                    <>
                      {index === 1 && (
                        <ListGroup.Item key={index}>
                          <span>{field} </span>
                        </ListGroup.Item>
                      )}
                      {index === 2 && (
                        <ListGroup.Item key={index}>
                          <span className="ml-3">{field} </span>
                        </ListGroup.Item>
                      )}
                      {index === 3 && (
                        <ListGroup.Item
                          key={index}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fa fa-caret-right" aria-hidden="true"></i>
                          <span className="ml-2">{field} </span>
                        </ListGroup.Item>
                      )}
                      {index > 3 && index < 7 && (
                        <ListGroup.Item key={index}>
                          <span className="ml-3">{field} </span>
                        </ListGroup.Item>
                      )}
                      {index > 6 && (
                        <ListGroup.Item
                          key={index}
                          className="d-flex justify-content-between"
                        >
                          <span className="ml-3">{field} </span>

                          <i
                            onClick={() => removeRow(field, index)}
                            style={{ cursor: "pointer" }}
                            class="fa fa-times-circle mt-2 text-danger"
                            aria-hidden="true"
                          ></i>
                        </ListGroup.Item>
                      )}
                    </>
                  );
                })}
              </ListGroup>
            </Card>
            {Object.values(fields).map((field, index) => {
              return (
                <>
                  <Card key={index}>
                    <Card.Body>
                      <span className=" text-right">
                        <i
                          class="fa fa-times text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() => removeColumn(index)}
                          aria-hidden="true"
                        ></i>
                      </span>
                      <Card.Title>
                        <center>
                          <img
                            src={image}
                            width="40"
                            className="img-fluid"
                            alt="productimage"
                          />
                          <p className="mb-0 mt-2"> {field.title}</p>
                        </center>
                      </Card.Title>
                    </Card.Body>

                    <ListGroup variant="flush">
                      {Object.values(field).map((val, index) => {
                        return (
                          <>
                            {index === 1 && (
                              <ListGroup.Item key={index}>
                                <div
                                  class="progress"
                                  data-percentage={val * 10}
                                >
                                  <span class="progress-left">
                                    <span class="progress-bar"></span>
                                  </span>
                                  <span class="progress-right">
                                    <span class="progress-bar"></span>
                                  </span>
                                  <div class="progress-value">
                                    <div>{val}</div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            )}
                            {index > 1 && (
                              <ListGroup.Item
                                contenteditable="true"
                                key={index}
                              >
                                {val}
                              </ListGroup.Item>
                            )}
                          </>
                        );
                      })}
                    </ListGroup>
                 
                  </Card>
                </>
              );
            })}
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}

export default VendorCard;

import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

function ModalForm({
  handleClose,
  modalState,
  type,
  criteriaValue,
  setCriteriaValue,
  addRow,
  setTitleValue,
  titleValue,
  setFounderValue,
  founderValue,
  scoreValue,
  setScoreValue,  
  descValue,
  setDescValue, 
  setPriceValue,
  priceValue,
  featureValue ,
  setFeatureValue,
  caseStudyValue,
  setcaseStudyValue,
  addColumn,
  errorMsg
}) {
  return (
    <div>
      <Modal show={modalState === "modal"} onHide={handleClose}>
          <Modal.Body className="my-3 mx-3">
      {
          errorMsg &&   <Alert  variant="danger">
          Input field cannot be blank!
        </Alert>
      }
        {type === "addCriteria" ? (
            <Form>
            <h4 className="font-weight-bold text-center mb-4 text-primary">Add Criteria!</h4>
              <input
                className="form-control form-control-sm mb-3"
                name="title"
                type="text"
                placeholder="Enter Criteria"
                onChange={(e) => setCriteriaValue(e.target.value)}
                value={criteriaValue}
              />

              <Button onClick={() => addRow()}>
               <i className="fa fa-plus-circle text-white" aria-hidden="true"></i> Add Criteria</Button>
            </Form>
        ) : (
            <Form>
            <h4 className="font-weight-bold text-center mb-4 text-primary">Add New Vendor!</h4>
              <input
                className="form-control form-control-sm mb-2"
                name="title"
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setTitleValue(e.target.value)}
                value={titleValue}
              />
              <input
                className="form-control form-control-sm mb-2"
                type="number"
                min="1"
                max="10"
                placeholder="Overall Score"
                onChange={(e) => setScoreValue(e.target.value)}
                value={scoreValue}
              />
              <input
                className="form-control form-control-sm mb-2"
                name="title"
                type="text"
                placeholder="Product Description"
                onChange={(e) => setDescValue(e.target.value)}
                value={descValue}
              />
              <input
                className="form-control form-control-sm mb-2"
                name="title"
                type="text"
                placeholder="Founders"
                onChange={(e) => setFounderValue(e.target.value)}
                value={founderValue}
              />
              <input
                className="form-control form-control-sm mb-2"
                name="title"
                type="link"
                placeholder="Pricing link"
                onChange={(e) => setPriceValue(e.target.value)}
                value={priceValue}
              />
              <input
                className="form-control form-control-sm mb-2"
                name="title"
                type="text"
                placeholder="Features"
                onChange={(e) => setFeatureValue(e.target.value)}
                value={featureValue}
              />
              <input
                className="form-control form-control-sm mb-3"
                name="title"
                type="text"
                placeholder="Customer Case Studies"
                onChange={(e) => setcaseStudyValue(e.target.value)}
                value={caseStudyValue}
              />

              <Button onClick={() => addColumn()}><i className="fa fa-plus-circle text-white" aria-hidden="true"></i> Add New Vendor</Button>
            </Form>
        )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalForm;

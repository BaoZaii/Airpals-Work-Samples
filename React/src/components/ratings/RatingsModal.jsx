import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import "./ratings.css";

const RatingsModal = (props) => {
  return (
    <React.Fragment>
      <Modal
        className="rating-modal"
        isOpen={props.isOpen}
        toggle={props.toggleModal}
        size="lg"
      >
        <ModalHeader toggle={props.toggleModal}></ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="rating-right">{props.ratings}</div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
RatingsModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  ratings: PropTypes.arrayOf(PropTypes.object),
};
export default RatingsModal;

import React from "react";
import * as ratingsService from "../../services/ratingsService";
import RatingsCard from "./RatingsCard";
import debug from "airpals-debug";
import { Button } from "reactstrap";
import RatingsModal from "./RatingsModal.jsx";
import StarRating from "react-star-ratings";
import "./ratings.css";
import PropTypes from "prop-types";

const _logger = debug.extend("ratingsComponent");

class RatingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  componentDidMount() {
    this.getRatings();
    _logger(this.props.userId, this.props.entityTypeId);
  }
  toggleModal = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  };
  getRatings = () => {
    ratingsService
      .getAllRatings(this.props.userId, this.props.entityTypeId)
      .then(this.onGetRatingsSuccess)
      .catch(this.onGetRatingsError);
  };
  onGetRatingsSuccess = (response) => {
    let allRatings = response.items;
    _logger(response);
    const mappedRatings = allRatings.map(this.mapRatings);
    const mappedRatingsModal = allRatings.map(this.mapRatingsModal);
    this.setState((prevState) => {
      return { ...prevState, mappedRatings, mappedRatingsModal };
    });
  };
  onGetRatingsError = (error) => {
    _logger(error);
  };
  mapRatings = (ratings) => (
    <RatingsCard key={ratings.id} aRating={ratings} isModal={false} />
  );
  mapRatingsModal = (ratings) => (
    <RatingsCard key={ratings.id} aRating={ratings} isModal={true} />
  );
  render() {
    const star =
      "m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0";

    return (
      <React.Fragment>
        <div className="container">
          {this.props.ratingAvg !== 0 && this.props.ratingCount !== 0 && (
            <div className="ratings-contain">
              <div className="row">
                <div className="star">
                  <StarRating
                    rating={1}
                    svgIconViewBox="0 0 500 500"
                    starRatedColor="#FB1350"
                    starSpacing="1px"
                    svgIconPath={star}
                    numberOfStars={1}
                    starDimension={"25px"}
                  />
                </div>
                <h2 className="rating-top">
                  {this.props.ratingAvg / 2} ({this.props.ratingCount} reviews)
                </h2>
              </div>
              <div>
                {this.state.mappedRatings !== undefined && (
                  <div className="row">
                    {this.state.mappedRatings.slice(0, 3)}
                  </div>
                )}
              </div>
              <div>
                {this.state.mappedRatings === undefined && (
                  <div className="row"></div>
                )}
              </div>
              <hr />

              <div>
                <Button outline color="secondary" onClick={this.toggleModal}>
                  Show All {this.props.ratingCount} reviews
                </Button>
                <RatingsModal
                  isOpen={this.state.isOpen}
                  toggleModal={this.toggleModal}
                  title={"Title goes here."}
                  content={"Content for Modal goes here."}
                  ratings={this.state.mappedRatingsModal}
                />
              </div>
            </div>
          )}
          {this.props.ratingAvg === 0 && this.props.ratingCount === 0 && (
            <h2 className="rating-top">
              This messenger does not have any ratings yet
            </h2>
          )}
        </div>
      </React.Fragment>
    );
  }
}
RatingsComponent.propTypes = {
  userId: PropTypes.number,
  entityTypeId: PropTypes.number,
  ratingAvg: PropTypes.number,
  ratingCount: PropTypes.number,
};
export default RatingsComponent;

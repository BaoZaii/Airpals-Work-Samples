import React from "react";
import { Formik, Form, Field } from "formik";
import * as serviceHelper from "../../services/serviceHelpers";
import * as locationService from "../../services/locationService";
import * as lookupService from "../../services/lookupService";
import locationSchemas from "../../schemas/locationSchemas";
import Swal from "sweetalert2";
import debug from "airpals-debug";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const _logger = debug.extend("Locations");

class LocationAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        LocationTypeId: "",
        LineOne: "",
        LineTwo: "",
        City: "",
        Zip: "",
        StateId: "",
        Latitude: 0,
        Longitude: 0,
      },
      ActiveLink: 0,
      containerStyle: {
        width: "400px",
        height: "400px",
      },
      center: {
        lat: 0,
        lng: 0,
      },
    };
  }
  componentDidMount() {
    let lookupTable = "LocationTypes";
    _logger("componentDidMount");
    Geocode.setApiKey(serviceHelper.GOOGLE_APIKEY);
    Geocode.setLanguage("en");
    _logger(this.state.ActiveLink);
    locationService
      .getAllStates()
      .then(this.onGetAllStatesSuccess)
      .catch(this.onGetAllStatesError);
    lookupService
      .getAllTypes(lookupTable)
      .then(this.onGetAllTypesSuccess)
      .catch(this.onGetAllTypesError);
  }
  handleSubmit = (values) => {
    let address = `${values.LineOne} ${values.LineTwo}, ${values.City}, ${values.Zip}`;
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        _logger(lat, lng);
        this.setState(
          {
            formData: {
              LocationTypeId: parseInt(values.LocationTypeId),
              LineOne: values.LineOne,
              LineTwo: values.LineTwo,
              City: values.City,
              Zip: values.Zip,
              StateId: parseInt(values.StateId),
              Latitude: lat,
              Longitude: lng,
            },
            ActiveLink: 1,
            center: {
              lat: lat,
              lng: lng,
            },
          },
          () => _logger(this.state)
        );
      },
      () => {
        //_logger(error);
        Swal.fire("Error!", "Address not found", "error");
      }
    );
  };
  onGetAllTypesSuccess = (response) => {
    _logger("pick ups types listed", response.items);
    const typeInfo = response.items;
    const typeOptions = typeInfo.map((typeInfo) => {
      return (
        <option value={typeInfo.id} key={typeInfo.id}>
          {typeInfo.name}
        </option>
      );
    });
    this.setState(
      (prevState) => {
        return { ...prevState, typeOptions, typeInfo };
      },
      () => {
        _logger(this.state);
      }
    );
  };
  onGetAllTypesError = (error) => {
    _logger(error);
  };
  onGetAllStatesSuccess = (response) => {
    _logger("states successfully loaded", response.items);
    const statesInfo = response.items;
    const stateOptions = statesInfo.map((stateInfo) => {
      return (
        <option value={stateInfo.id} key={stateInfo.id}>
          {stateInfo.name}
        </option>
      );
    });
    this.setState(
      (prevState) => {
        return { ...prevState, stateOptions, statesInfo };
      },
      () => {
        _logger(this.state);
      }
    );
  };
  onGetAllStatesError = (error) => {
    _logger("States could not load", error);
  };
  locationPost = () => {
    const payload = this.state.formData;
    locationService
      .addLocation(payload)
      .then(this.onLocationPostSuccess)
      .catch(this.onLocationPostError);
  };
  onLocationPostSuccess = () => {
    Swal.fire("success", "You successfully added a location", "success");
  };
  onLocationPostError = () => {
    Swal.fire("Error!", "An error occurred, please try again", "error");
  };
  render() {
    return (
      <div className="row">
        <Formik
          enableReinitialize={true}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
          validationSchema={locationSchemas.baseLocationSchema}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
            } = props;
            return (
              <div className="col-lg-6">
                <Form name="formRegister" onSubmit={handleSubmit} action>
                  <div className="card-default card">
                    <div className="card-header">Locations form</div>
                    <div className="card-body">
                      <ul className="nav nav-pills nav-justified">
                        <li
                          className="nav-item"
                          style={{ backgroundColor: "rgb(252, 252, 252)" }}
                        >
                          <div
                            className={
                              this.state.ActiveLink === 0
                                ? "active nav-link"
                                : "nav-link"
                            }
                          >
                            <h4 className="text-left my-3">
                              1. Information
                              <br />
                              <small>
                                Enter in the address and appropriate information
                              </small>
                            </h4>
                          </div>
                        </li>
                        <li
                          className="nav-item"
                          style={{ backgroundColor: "rgb(252, 252, 252)" }}
                        >
                          <div
                            className={
                              this.state.ActiveLink === 1
                                ? "active nav-link"
                                : "nav-link"
                            }
                          >
                            <h4 className="text-left my-3">
                              2. Map
                              <br />
                              <small>Confirm location on GPS</small>
                            </h4>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div
                        id="tabPane1"
                        className={
                          this.state.ActiveLink === 0
                            ? "tab-pane active"
                            : "tab-pane"
                        }
                      >
                        <div className="pt-3 mb-3">
                          <fieldset>
                            <div className="form-group">
                              <label className="col-form-label">
                                Location Type*
                              </label>
                              <Field
                                component="select"
                                name="LocationTypeId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.LocationTypeId &&
                                  touched.LocationTypeId
                                    ? "form-control error"
                                    : "form-control"
                                }
                              >
                                {this.state.typeOptions}
                              </Field>
                              {errors.LocationTypeId &&
                                touched.LocationTypeId && (
                                  <span className="error-feedback">
                                    {errors.LocationTypeId}
                                  </span>
                                )}
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">
                                Address One*
                              </label>
                              <Field
                                placeholder="Enter Line One"
                                type="text"
                                values={values.LineOne}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="LineOne"
                                className={
                                  errors.LineOne && touched.LineOne
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                              />
                              <div className="invalid-feedback">
                                Address is invalid
                              </div>
                              <small className="form-text text-muted">
                                Please enter a valid address
                              </small>
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">
                                Address Two
                              </label>
                              <Field
                                type="text"
                                values={values.LineTwo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="LineTwo"
                                className="form-control"
                              />
                              <div className="invalid-feedback">
                                Address is invalid
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">City*</label>
                              <Field
                                type="text"
                                values={values.City}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="City"
                                className={
                                  errors.City && touched.City
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                              />
                              <div className="invalid-feedback">
                                City is invalid
                              </div>
                              <small className="form-text text-muted">
                                Please enter a City
                              </small>
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">Zip*</label>
                              <Field
                                type="text"
                                values={values.Zip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="Zip"
                                className={
                                  errors.Zip && touched.Zip
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                              />
                              <div className="invalid-feedback">
                                Zip is invalid
                              </div>
                              <small className="form-text text-muted">
                                Please enter a Zip
                              </small>
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">State*</label>
                              <Field
                                component="select"
                                name="StateId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.StateId && touched.StateId
                                    ? "form-control error"
                                    : "form-control"
                                }
                              >
                                {this.state.stateOptions}
                              </Field>
                              {errors.StateId && touched.StateId && (
                                <span className="error-feedback">
                                  {errors.StateId}
                                </span>
                              )}
                            </div>
                          </fieldset>
                        </div>
                        <p>(*) Mandatory</p>
                        <div className="card-footer">
                          <div className="d-flex align-items-center">
                            <div className="ml-auto">
                              <button type="submit" className="btn btn-primary">
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                      <div
                        id="tabPane2"
                        className={
                          this.state.ActiveLink === 1
                            ? "tab-pane active"
                            : "tab-pane"
                        }
                      >
                        <div className="pt-3 mb-3">
                          <div className="row">
                            <div className="col-lg-6">
                              <LoadScript
                                googleMapsApiKey={serviceHelper.GOOGLE_APIKEY}
                              >
                                <GoogleMap
                                  mapContainerStyle={this.state.containerStyle}
                                  center={this.state.center}
                                  zoom={10}
                                >
                                  <Marker position={this.state.center} />
                                  <></>
                                </GoogleMap>
                              </LoadScript>
                            </div>
                            <div className="col-lg-6">
                              <div className="card-body">
                                <h4 className="card-title">Address</h4>
                                <p className="card-text">
                                  {this.state.formData.LineOne}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => this.setState({ ActiveLink: 0 })}
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            className="ml-auto btn btn-primary"
                            onClick={this.locationPost}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}
export default LocationAdd;

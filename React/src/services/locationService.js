import axios from "axios";
import * as serviceHelper from "./serviceHelpers";

const localEndpoint = `${serviceHelper.API_HOST_PREFIX}/api/locations`;

const addLocation = (payload) => {
  const config = {
    method: "POST",
    url: `${localEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .then((response) => {
      response.formData = payload;
      return response;
    })
    .catch(serviceHelper.onGlobalError);
};

const addByContact = (payload) => {
  const config = {
    method: "POST",
    url: `${localEndpoint}/contact`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .then((response) => {
      response.formData = payload;
      return response;
    })
    .catch(serviceHelper.onGlobalError);
};

const addByCustomer = (payload) => {
  const config = {
    method: "POST",
    url: `${localEndpoint}/customer`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .then((response) => {
      response.formData = payload;
      return response;
    })
    .catch(serviceHelper.onGlobalError);
};

const update = (payload) => {
  const config = {
    method: "PUT",
    url: `${localEndpoint}/${payload.id}`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .then((response) => {
      response.formData = payload;
      return response;
    })
    .catch(serviceHelper.onGlobalError);
};

const getLocationById = (id) => {
  const config = {
    method: "GET",
    url: `${localEndpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getByCustomer = (id) => {
  const config = {
    method: "GET",
    url: `${localEndpoint}/customers/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getByContact = (id) => {
  const config = {
    method: "GET",
    url: `${localEndpoint}/contacts/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const getAllStates = () => {
  const config = {
    method: "GET",
    url: `${localEndpoint}/states`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

export {
  getAllStates,
  addLocation,
  addByCustomer,
  addByContact,
  update,
  getLocationById,
  getByCustomer,
  getByContact,
};

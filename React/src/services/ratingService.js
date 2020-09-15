import axios from "axios";
import * as serviceHelper from "./serviceHelpers";
const localEndpoint = `${serviceHelper.API_HOST_PREFIX}/api/ratings`;
const addRating = (payload) => {
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
    .catch(serviceHelper.onGlobalError);
};
const getRating = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${localEndpoint}/current/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
const getAllRatings = () => {
  const config = {
    method: "GET",
    url: `${localEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
const updateRating = (payload, id) => {
  const config = {
    method: "PUT",
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
const deleteRating = (id) => {
  const config = {
    method: "PUT",
    url: `${localEndpoint}/delete/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};
export { addRating, getRating, getAllRatings, updateRating, deleteRating };

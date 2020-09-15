import axios from "axios";
import * as serviceHelper from "./serviceHelpers";

const localEndpoint = `${serviceHelper.API_HOST_PREFIX}/api/comments`;

const addComment = (payload) => {
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
const getComments = (pageIndex, pageSize) => {
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
const getAllComments = () => {
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
const editComments = (payload, id) => {
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
const deleteComments = (id) => {
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
export {
  addComment,
  getComments,
  editComments,
  deleteComments,
  getAllComments,
};

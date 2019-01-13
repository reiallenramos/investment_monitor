import axios from 'axios';
import * as constants from './constants'
import humps from 'humps'

const csrfToken = document.querySelector('[name="csrf-token"]').content;

const myAxios = axios.create({
  baseURL: constants.REQUEST_URL,
  headers: {'X-CSRF-TOKEN': csrfToken},
  transformResponse: [...axios.defaults.transformResponse, (data) => {
    data = humps.camelizeKeys(data);
    return data;
  }]
});

export default myAxios;

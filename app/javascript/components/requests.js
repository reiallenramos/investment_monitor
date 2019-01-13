import axios from 'axios';
import * as constants from './constants'

const csrfToken = document.querySelector('[name="csrf-token"]').content;

const myAxios = axios.create({
  baseURL: constants.REQUEST_URL,
  headers: {'X-CSRF-TOKEN': csrfToken}
});

export default myAxios;

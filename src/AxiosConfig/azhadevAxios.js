import axios from 'axios';

export const azhadevAxios = axios.create({
    baseURL: 'https://authservice.azhadev.ir/api',
    timeout: 3000,
    timeoutErrorMessage: 'خطای سمت سرور',
});
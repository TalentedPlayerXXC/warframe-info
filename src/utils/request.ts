import { extend } from 'umi-request';

const request = extend({
  headers: {
    Authorization: 'Bot 1/MTIzOTA=/sLKLe6y6NcLOC0pXRZA2eA==',
    // 'Content-Type': 'application/json',
    // withCredentials: true,
  },
});

export default request;

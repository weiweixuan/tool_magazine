//全局设置请求URL
axios.defaults.baseURL = 'http://rap2api.taobao.org/';
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log(response, '------------')
  if (response.status === 200 && response.data) {
    return response.data.data || response.data;
  } else {
    return Promise.reject(error);
  }
}, function (error) {
  return Promise.reject(error);
});
function $fetch({ method = 'GET', url, data }) {
  return axios({
    method,
    url,
    data
  })
}
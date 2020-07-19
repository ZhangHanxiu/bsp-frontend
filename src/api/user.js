import request from '../utils/request'

/**
 * 登陆
 * @param query
 * @returns {AxiosPromise}
 * @constructor
 */
export const Login = query => {
  return request({
    url: '/login/checkUser',
    method: 'post',
    params: query
  });
};

export const registerBvo = data => {
  return request({
    url: '/register/bvo',
    method: 'post',
    contentType:"application/json;charset=utf-8",
    // data:JSON.stringify(query),
    data,
    dataType:"json",
  });
};

export const registerMvo = data => {
  return request({
    url: '/register/mvo',
    method: 'post',
    contentType:"application/json;charset=utf-8",
    // data:JSON.stringify(query),
    data,
    dataType:"json",
  });
};

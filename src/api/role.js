import request from '../utils/request'

export const getRole = query => {
  return request({
    url: '/menurole/rolelist',
    method: 'get',
    params: query
  });
};

export const saveRole = data => {
  return request({
    url: '/menurole/addrole',
    method: 'post',
    contentType:"application/json;charset=utf-8",
    // data:JSON.stringify(query),
    data,
    dataType:"json",
  });
};

export const delRoleInfo = id => {
  return request({
    url: '/menurole/deleterole',
    method: 'post',
    params: {role_id:id}
  });
};

export const updateRole = data => {
  return request({
    url: '/menurole/updaterole',
    method: 'post',
    contentType:"application/json;charset=utf-8",
    // data:JSON.stringify(query),
    data,
    dataType:"json",
  });
};

export const echoRoleInfo = id => {
  return request({
    url: '/menurole/getRoleMenuIds',
    method: 'get',
    params: {role_id:id}
  });
};

export const saveRoleAccess = query  => {
  return request({
    url: '/menurole/setrolemenu',
    method: 'post',
    params: query
  });
};

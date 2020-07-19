import request from '../utils/request'


export const getMyInfo = id => {
  return request({
    url: '/manufacturer/getmanufacturerinfo',
    method: 'get',
    params: {userId:id}
  });
};

export const getMvoProduct = query => {
  return request({
    url: '/product/productList',
    method: 'get',
    params: {userId:localStorage.getItem('userId')}
  });
};

export const addGood = data => {
  return request({
    url: '/manufacturer/alterManufacturer',
    method: 'post',
    contentType:"application/json;charset=utf-8",
    // data:JSON.stringify(query),
    data,
    dataType:"json",
    params:{userId:localStorage.getItem('userId')}
  });
};

export const getAllOrder = query => {
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'post',
    params: {userId:localStorage.getItem('userId')}
  });
};

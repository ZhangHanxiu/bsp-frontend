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

export function alterGood(productVo,userId){
  return request({
    url: '/product/alterProduct',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-'
    },
    data:JSON.stringify(productVo),
    params: {userId}
  });
};


export const getAllOrderSON = query => {
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'post',
    params: {userId:localStorage.getItem('userId')}
  });
};

export function alterBrand(brandVo, userId) {
  return request({
    url: 'brand/alterBrand/',
    method: 'post',
    data: JSON.stringify(brandVo),
    params: { userId },
    headers: {
      'Content-Type': 'application/json;charset=utf-'
    }
  })
};

export function deleteBrand(brandVo, userId) {
  return request({
    url: 'brand/deleteBrand/',
    method: 'post',
    data: JSON.stringify(brandVo),
    params: { userId },
    headers: {
      'Content-Type': 'application/json;charset=utf-'
    }
  })
}

export function getProductDetail(userId) {
  return request({
    url: 'product/productDetailList',
    method: 'get',
    params: { userId }
  })
}

export function alterProductDetail(productDetailVo, userId) {
  return request({
    url: 'product/alterProductDetail/',
    method: 'post',
    data: JSON.stringify(productDetailVo),
    params: { userId },
    headers: {
      'Content-Type': 'application/json;charset=utf-'
    }
  })
}


export function  getAwaitingPaymentOrder(userId,orderSts){
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'get',
    params: { userId, orderSts}
  });
};

export function  getAwaitingShipmentOrder(userId,orderSts){
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'get',
    params: { userId, orderSts}
  });
};

export function  getShippedOrder(userId,orderSts){
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'get',
    params: { userId, orderSts}
  });
};

export function  getCompletedOrder(userId,orderSts){
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'get',
    params: { userId, orderSts}
  });
};

export function  getCancelledOrder(userId,orderSts){
  return request({
    url: '/salesOrder/salesOrderList',
    method: 'get',
    params: { userId, orderSts}
  });
};

export function editOrderSts(salesOrderVo){
  return request({
    url: '/salesOrder/alterSalesOrder',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-'
    },
    // data:JSON.stringify(query),
    data:JSON.stringify(salesOrderVo),
    params:{userId:localStorage.getItem('userId')}
  });
};

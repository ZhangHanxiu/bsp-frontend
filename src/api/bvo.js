import request from '../utils/request'


export const getBvoInfo = query => {
    return request({
        url: '/bvo/info/'+localStorage.getItem('dsrId'),
        method: 'get',
        params: query
    });
};

export const getStoreInfo = query => {
    return request({
        url: '/bvo/store/'+localStorage.getItem('dsrId'),
        method: 'get',
        params: query
    });
};

export const editMyInfo = data => {
    return request({
        url: '/bvo/updateInfo/'+localStorage.getItem('dsrId'),
        method: 'put',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const addStore = data => {
    return request({
        url: '/bvo/addstore',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const saveCompanyEdit = data => {
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

export const getBrand = id => {
    return request({
        url: '/brand/brandList',
        method: 'get',
        params: {userId:id}
    });
};


export const getProduct = query => {
    return request({
        url: '/bvo/product',
        method: 'get',
        params: query
    });
};

export const  productDetail = prodId => {
    return request({
        url: '/bvo/product/'+prodId,
        method: 'get',
    });
};

export const  getWish = prodId => {
    return request({
        url: '/bvo/wit/'+localStorage.getItem('userId'),
        method: 'get',
    });
};


export const  addToWish = prodId => {
    return request({
        url: '/bvo/addwit/'+localStorage.getItem('userId')+'/'+prodId,
        method: 'get',
    });
};

export const  deleteWish = ids => {
    return request({
        url: '/bvo/deleteWits/'+ids,
        method: 'delete',
    });
};

export const getAwaitingPaymentOrder = query => {
    return request({
        url: '/bvo/getAllOrderByUserIdAndOrderSts/'+localStorage.getItem('userId')+'/1',
        method: 'get',
    });
};

export const getAwaitingShipmentOrder = query => {
    return request({
        url: '/bvo/getAllOrderByUserIdAndOrderSts/'+localStorage.getItem('userId')+'/2',
        method: 'get',
    });
};

export const getShippedOrder = query => {
    return request({
        url: '/bvo/getAllOrderByUserIdAndOrderSts/'+localStorage.getItem('userId')+'/3',
        method: 'get',
    });
};


export const getCompletedOrder = query => {
    return request({
        url: '/bvo/getAllOrderByUserIdAndOrderSts/'+localStorage.getItem('userId')+'/4',
        method: 'get',
    });
};

export const getCancelledTOrder = query => {
    return request({
        url: '/bvo/getAllOrderByUserIdAndOrderSts/'+localStorage.getItem('userId')+'/5',
        method: 'get',
    });
};

export const pay = paylist => {
    return request({
        url: '/bvo/pay/'+paylist.saoid+'/'+localStorage.getItem('buyerid')+'/'+paylist.amount,
        method: 'get',
    });
};
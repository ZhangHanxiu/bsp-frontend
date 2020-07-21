import request from '../utils/request2'

/**
 * 钱包注册
 * @param query
 * @returns {AxiosPromise}
 */
export const registerWallet = data => {
    return request({
        url: '/wallet/register',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

/**
 * 注册
 * @param data
 * @returns {*}
 */
export const loginWallet = data => {
    console.log(data)
    return request({
        url: '/wallet/login',
        method: 'post',
        // contentType:"application/json;charset=utf-8",
        // // data:JSON.stringify(query),
        // data,
        // dataType:"json",
        params:data,
    });
};

export const getAccountBalance = buyer_id => {
    return request({
        url: '/wallet/fund',
        method: 'post',
        params:{buyer_id:buyer_id},
    });
};

export const withDrawAccount = query => {
    return request({
        url: '/wallet/withdraw',
        method: 'post',
        params:query
    });
};

export const withdrawalSubsidiary = id => {
    return request({
        url: '/transaction/userrecordlist',
        method: 'get',
        params:{buyer_id:id}
    });
};

export const saveAccount = query => {
    return request({
        url: '/wallet/deposit',
        method: 'post',
        params:query
    });
};
export const withdrawalAudit = query => {
    return request({
        url: '/transaction/recordlist',
        method: 'get',
        params:query
    });
};

export const Audit = query => {
    return request({
        url: '/transaction/audit',
        method: 'post',
        params:query
    });
};

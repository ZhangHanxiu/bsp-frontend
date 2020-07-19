import request from '../utils/request'

export const getDictionary = query => {
    return request({
        url: '/cdm/codeList',
        method: 'get',
        params: query
    });
};

export const saveDictionary = data => {
    return request({
        url: '/cdm/addCode',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const updateDictionary = data => {
    return request({
        url: '/cdm/updateCode',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const delDictionaryInfo = id => {
    return request({
        url: '/cdm/deleteCode',
        method: 'post',
        params: {code_id:id}
    });
};

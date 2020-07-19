import request from '../utils/request'


export const getMenuList = query => {
    return request({
        url: '/menurole/menutree',
        method: 'get',
        params: query
    });
};


export const saveMenu = data => {
    return request({
        url: '/menurole/addmenu1',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const saveNextMenu = data => {
    return request({
        url: '/menurole/addmenu2',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const updateMenu = data => {
    return request({
        url: '/menurole/updatemenu',
        method: 'post',
        contentType:"application/json;charset=utf-8",
        // data:JSON.stringify(query),
        data,
        dataType:"json",
    });
};

export const delMenu = id => {
    return request({
        url: '/menurole/deletemenu',
        method: 'post',
        params: {menu_id:id}
    });
};


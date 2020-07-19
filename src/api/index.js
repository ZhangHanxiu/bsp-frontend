import request from '../utils/request';

export const uploadImage = formData => {
    return request({
        url: './common/uploadImage',
        method: 'post',
        data: formData,
        header: {'Content-Type':'multipart/form-data'}
    });
};
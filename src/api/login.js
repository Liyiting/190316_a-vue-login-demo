import * as request from '../utils/request'

export const getCode = (phone) => request.post('/login', {phone})

export const login = (phone, code) => request.post('/getCode', {phone, code})
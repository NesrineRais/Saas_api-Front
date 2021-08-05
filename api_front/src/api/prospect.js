import axios from 'axios';
import {config} from '../config'

export const getAllProspectByUser = (user_id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.get(config.api_url+'/api/v1/prospect/userId/'+user_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}

export const saveProspect = (data)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.post(config.api_url+'/api/v1/prospect/save', data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


export const updateProspect = (data, id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.put(config.api_url+'/api/v1/prospect/update/'+id, data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


export const deleteProspect = (id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.delete(config.api_url+'/api/v1/prospect/'+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


export const detailProspect = (id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.get(config.api_url+'/api/v1/prospect/one/'+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


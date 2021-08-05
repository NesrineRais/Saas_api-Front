import axios from 'axios';
import {config} from '../config'

export const getAllFollowByProspect = (prospect_id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.get(config.api_url+'/api/v1/follow/prospectId/'+prospect_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}

export const getAllFollowByUser = (user_id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.get(config.api_url+'/api/v1/follow/userId/'+user_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}

export const saveFollow = (data)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.post(config.api_url+'/api/v1/follow/save', data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


export const updateFollow = (data, id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.put(config.api_url+'/api/v1/follow/update/'+id, data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}


export const deleteFollow = (id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.delete(config.api_url+'/api/v1/follow/delete/'+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}




import axios from 'axios';
import {config} from '../config'

export const getAllRdvByUser = (user_id)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.get(config.api_url+'/api/v1/rdv/userId/'+user_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                // console.log(response)
                return response.data; 
             
            })
}

export const saveRdv = (data)=>{
    const token = window.localStorage.getItem('saas-token');
    return axios.post(config.api_url+'/api/v1/rdv/save', data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}

export const updateRdv = (data,id) =>{
    const token = window.localStorage.getItem('saas-token');
    return axios.put(config.api_url+'/api/v1/rdv/update/'+id, data, {headers: {'x-access-token': token}})
            .then((response)=>{
                
                return response.data; 
            })
}

export const deleteRdv = (id) =>{
    const token = window.localStorage.getItem('saas-token');
    return axios.delete(config.api_url+'/api/v1/rdv/delete/'+id, {headers: {'x-access-token': token}})
            .then((response)=>{
                console.log(response)
                return response.data; 
            })
}


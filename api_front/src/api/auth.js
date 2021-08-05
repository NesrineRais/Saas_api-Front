import axios from 'axios';
import {config} from '../config'

export const checkToken = ()=>{
    const token = window.localStorage.getItem('saas-token');
    
    return axios.get(config.api_url+'/api/v1/auth/checkToken', {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}

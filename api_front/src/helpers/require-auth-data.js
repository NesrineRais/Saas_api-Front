import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {checkToken} from '../api/auth';
import {connectUser} from '../actions/user/userAction';
import {getAllRdvByUser}from '../api/rdv';
import {getAllProspectByUser}from '../api/prospect';
import {loadAllProspect} from '../actions/prospect/prospectAction';

import {loadAllRdv} from '../actions/rdv/rdvAction';
import {getAllFollowByUser}from '../api/follow';
import {loadAllFollow} from '../actions/follow/followAction';
export default function(ChildComponent, withAuth=false) {
    class RequireDataAuth extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                redirect: false
            }
        }
        
        componentDidMount(){
    
            
            const token = window.localStorage.getItem('saas-token');

           
            // je teste si l'utilisateur est connecté si oui il a accès à tout
            if(this.props.user.isLogged === false) {
                // si pas connecté pas de token dans le local storage
                
                if(token === null) {
                    // si besoin d'etre connecté alors redirigé
                    if(withAuth) {
                     this.setState({redirect: true})
                    }
                } else {
                    // si il y a un token on teste
                    console.log('ça passe vers token test')
                    checkToken()
                    .then((res)=>{
                       console.log(res); 
                       // si le token est mauvais on redirige
                       if(res.status !== 200) {
                           if(withAuth) {
                              this.setState({redirect: true}) 
                           }
                       } else {
                           // si le token est bon on charge les infos redux et on reste sur la page
                          this.props.connectUser(res.user);
                          console.log(res.user)
                            getAllRdvByUser(res.user.id)
                                .then((responseRdv)=>{
                                    console.log('RDVS HOC', responseRdv)
                                    this.props.loadAllRdv(responseRdv.rdvs)
                                })

                                getAllProspectByUser(res.user.id)
                                .then((response)=>{
                                    console.log(response);
                                    this.props.loadAllProspect(response.prospects);
                                    
                                })

                                getAllFollowByUser(res.user.id)
                                .then((response)=>{
                                    console.log(response);
                                    this.props.loadAllFollow(response.follows);
                                    
                                })
                       }
                    })
                }
                
            }
        }
        
        
        render(){
            if(this.state.redirect) {
                return <Redirect to="/login"/>
            }
            
            return (
                <ChildComponent {...this.props} />  
            )
        }
        
        
    }

    const mapStateToProps = (store)=>{
        return {
           user: store.user
       }
    }
    
    const mapDispatchToProps = {
        connectUser,
        loadAllRdv,
        loadAllProspect,
        loadAllFollow
    }
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
}

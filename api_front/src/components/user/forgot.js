import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import LoginImg from '../../assets/img/Login.png';
import {forgotUser} from '../../api/user';
import {connect} from 'react-redux';

const Forgot = (props)=>{
    

	const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	
	const onSubmitForm = ()=>{
		let data = {
			email: email
		}
		
		forgotUser(data)
			.then((res)=>{
				console.log(res);
				if(res.status ===200) {
					setRedirect(true);
				}
			})
		
	}
	
    return (
        <div>
            {redirect && <Redirect to="/login" />}
			<h1 className="c-g title2">
				Welcome to <span className="santa-monica">Commer</span><span className="bel-air">Saas</span> <span>!</span>
			</h1>
			<div className="log-container bgc-bel-air">
				<div className="log-nav-container">
					<div className="bgc-bel-air log-link">
						<Link to="/login">Login :</Link>
					</div>
					<div className="bgc-santa-monica log-link">
						<Link to="/register">Register :</Link>
					</div>
				</div>
				<div>
					<div className="log-container-form">
					
						<form
							className="form-trl"
							onSubmit={(e)=>{
								e.preventDefault();
								onSubmitForm();
							}}
						>
						    <label>Mot de passe oublié ?</label>
							<label>Email</label>
							<input 
								type="text" 
								name="email" 
								onChange={(e)=>{  
									setEmail(e.currentTarget.value) 
								}}
							/>
							
							<input className="button-form bgc-santa-monica" type="submit" value="Modifier"/>
						</form>

					</div>
					<div className="log-container-img">
						<img className="log-img" src={LoginImg} style={{marginTop: 100}} />
					</div>
				</div>
			</div>
        </div>
    )
}

    const mapStateToProps = (store)=>{
        return {
           user: store.user
       }
    }
    
    const mapDispatchToProps = {
        
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
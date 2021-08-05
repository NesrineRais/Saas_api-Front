import {Link, Redirect} from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import LoginImg from '../../assets/img/Login.png';
import {loginUser} from '../../api/user';
import {connect} from 'react-redux';
import {connectUser} from '../../actions/user/userAction';

const Login = (props)=>{

    
    //this.state et this.Setstate on le chnage comme ca 
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);

    const onSubmitForm = ()=>{
		let data = {
			email: email,
			password: password
		}
		
		loginUser(data)
			.then((res)=>{
				console.log(res);
				if(res.status ===200) {
					window.localStorage.setItem('saas-token', res.token);//if on est conecté on va stocker notre token dans saas token
					props.connectUser(res.user);
					setRedirect(true);                
                }
			})
		
	}

    return(
        <div>
             {redirect && <Redirect to="/" />}
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
							<label>Email</label>
							<input 
								type="text" 
								name="email" 
								onChange={(e)=>{  
									setEmail(e.currentTarget.value) 
								}}
							/>
							<label>Password</label>
							<input 
								type="password" 
								name="password" 
								onChange={(e)=>{  
									setPassword(e.currentTarget.value) 
							}}/>
							<input className="button-form bgc-santa-monica" type="submit" value="Go"/>
							<Link to="/forgot">mot de passe oublié ?</Link>

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
    connectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
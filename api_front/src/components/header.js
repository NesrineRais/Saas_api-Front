import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

const Header = (props)=>{
	return (
		<ul className="trl-header">
			{props.user.isLogged && <div>
				<Link to="/">Accueil</Link>
				<Link to="/agenda">Agenda</Link>
				<Link to="/prospect">Suivit client</Link>
				<Link to="/stats">Mes statistiques</Link>
				<Link to="/logout"><i className="fa fa-sign-out"></i></Link>
			</div>}
			
      	</ul>
	)
}

const mapDispatchToProps = {

}

const mapStateToProps = (store)=>{
	return {
		user: store.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
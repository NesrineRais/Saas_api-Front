import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const Home = ()=>{
	return (
		<div>
			<h1>Let's go !</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
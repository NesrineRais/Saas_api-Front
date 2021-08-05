import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Prospect = (props)=>{
    
    const [prospects, setProspects] = useState([])
    
    useEffect(()=>{
        setProspects(props.follow.prospects)
    }, [props])
    
    return (
        <div>
            <h2>Suivi clients</h2>
            <Link to="/addProspect"><i className="fa fa-plus-circle"></i> Ajoutez un nouveau prospect </Link>
            <h3>Liste des prospects</h3>
            <ul  className="prospect-list">
            {
                prospects.map((prospect, index)=>{
                    return (
                        <li key={index}>
                            <Link to={'/detail/'+prospect.id}>{prospect.firstName} {prospect.lastName}</Link>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

const mapDispatchToProps = {

}

const mapStateToProps = (store)=>{
    return {
        user: store.user,
        follow: store.prospect
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prospect)
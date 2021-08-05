import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {saveProspect, getAllProspectByUser} from '../../api/prospect';
import {loadAllProspect} from '../../actions/prospect/prospectAction';

const AddProspect = (props)=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('prospect');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const onSubmitForm = ()=>{
        let data = {
            firstName: firstName,
            lastName: lastName,
            company: company,
            address: address,
            zip: zip,
            city: city,
            email: email,
            phone: phone,
            status: status,
            description: description,
            user_id: props.user.infos.id
            
        }
        
        saveProspect(data)
            .then((res)=>{
                console.log(res)
                if(res.status === 200) {
                    getAllProspectByUser(props.user.infos.id)
                        .then((response)=>{
                            console.log(response);
                            props.loadAllProspect(response.prospects);
                            setRedirect(true);
                        })
                }
            })
    }
    
    return (
        <div>
            {redirect && <Redirect to="/prospect"/>}
            <h2>Ajout d'un prospect</h2>
            <Link to="/prospect"><i className="fa fa-arrow-left"></i> Retour </Link>
            <form
                className="form-trl bgc-bel-air"
                style={{width: "40%"}}
                onSubmit={(e)=>{
                    e.preventDefault()
                    onSubmitForm()
                }}
            >
                <input
                    type="text"
                    placeholder="Prénom"
                    onChange={(e)=>{
                        setFirstName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e)=>{
                        setLastName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Entreprise"
                    onChange={(e)=>{
                        setCompany(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Adresse"
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Code postal"
                    onChange={(e)=>{
                        setZip(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Ville"
                    onChange={(e)=>{
                        setCity(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }}
                />
                <select
                    onChange={(e)=>{
                        setStatus(e.target.value);
                    }}
                >
                    <option value="prospect">prospect</option>
                    <option value="attente">en attente</option>
                    <option value="client">client</option>
                </select>
                <textarea
                    type="text"
                    placeholder="description"
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                >
                
                </textarea>
                <input type="submit" value="Enregistrer"/>
            </form>
        </div>
    )
    
}

const mapDispatchToProps = {
    loadAllProspect
}

const mapStateToProps = (store)=>{
    return {
        user: store.user,
        follow: store.prospect
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProspect)
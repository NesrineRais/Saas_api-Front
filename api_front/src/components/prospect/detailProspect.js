import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {deleteProspect, getAllProspectByUser} from '../../api/prospect';
import {saveOneFollow} from '../../api/follow'
import {loadAllProspect} from '../../actions/prospect/prospectAction';
import AddFollowPopUp from '../follow/addFollowPopUp';
import EditFollowPopUp from '../follow/editFollowPopUp';

import moment from 'moment'
import 'moment/locale/fr'

const DetailProspect = (props)=>{
    const [prospect, setProspect] = useState(null);
    const [follows, setFollows] = useState([]);

    const [index, setIndex] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedFollow, setSelectedFollow] = useState(null);

    useEffect(()=>{
        let id = props.match.params.id;
        console.log("props.follow!.prospects",props.follow)
        let goodIndex = props.follow.prospects.findIndex((prospect)=>{
            return prospect.id == id;
        })
        console.log("goodIndex",goodIndex)

        if(goodIndex !== -1) {
            setIndex(goodIndex);
            setProspect(props.follow.prospects[parseInt(goodIndex)])

            //pour chercher les follow de propspect id exmpl 4
            let goodFollows = props.prospect.follows.filter((follow)=>{
                return follow.prospect_id == id;
            })
            
            console.log('FOLLOWS', goodFollows);
            setFollows(goodFollows);

           

        }

            console.log("USE EFFECT DID Props", goodIndex)
    }, [props])
    
    
    return (
        <div>
            <Link to="/prospect"><i className="fa fa-arrow-left"></i> Retour </Link>
            {redirect && <Redirect to='/prospect'/>}
                 {prospect !== null && <div className="detail-prospect">

                {/* //affichage de la 
                    dans le sprops on passe le id car le popup est n est pas
                    definie dans app.js enfnat de detail

                     prospect_id={props.match.params.id} props de id du propsect
                     setShowAddPopup(false);  affichage popup
                    */}
                 {showAddPopup &&   <AddFollowPopUp 
                                        onClickClose={(e)=>{
                                           setShowAddPopup(false); 
                                        }}
                                        prospect_id={props.match.params.id}
                                       
                />}
                 {showEditPopup &&   <EditFollowPopUp 
                                        onClickClose={(e)=>{
                                           setShowEditPopup(false); 
                                        }}
                                        prospect_id={props.match.params.id}
                                        selectedFollow={selectedFollow}
                                   
                 />}

                <h2>{prospect.firstName} {prospect.lastName} ({prospect.status})</h2>
                <div className="detail-prospects-buttons">
                    <div
                        className="delete"
                        onClick={()=>{
                            deleteProspect(prospect.id)
                                .then((res)=>{
                                    setRedirect(true);
                                    if(res.status === 200) {
                                        getAllProspectByUser(props.user.infos.id)
                                        .then((response)=>{
                                            if(response.status === 200) {
                                                props.loadAllProspect(response.prospects)
                                               
                                            }
                                        })
                                    }
                                    
                                })
                        }}
                    >
                        supprimer
                    </div>
                    <div
                        className="update"
                    >
                        <Link to={"/editProspect/"+prospect.id}>modifier</Link>
                    </div>
                </div>
                <p>{prospect.company} : {prospect.address} {prospect.zip} {prospect.city} </p>
                <p>tel : {prospect.phone}</p>
                <p>email : {prospect.email}</p>
                <p>email : {prospect.description}</p>
                <div
                    className="new"
                    onClick={()=>{
                        setShowAddPopup(true) //pour ouvrir le popup 
                        //on a passer true a la click du bouton
                    }}
                >
                    Ajouter un suivi
                </div>
                <ul className="prospect-list">
                 {
                        //J'ai un problème de décallage horaire de 2h avec mon serveur hebergé je sais pas où
                        // je corrige avec .subtract('hours', 2) qui permet de retirer 2h à l'affichage
                        follows.map((follow)=>{
                        return (
                            <li
                            onClick={()=>{
                                setSelectedFollow(follow);//on a entrer les follow dans la bouton 
                                //il a profité de la boucle follows pour entrer chaque follow
                                setShowEditPopup(true);
                                //true c est pour afficher la popin 
                             }}
                            
                            >{follow.type} : ({moment(follow.callDateTime).format('L')} {moment(follow.callDateTime).subtract('hours').format('LTS')})</li>
                        )
                        })
                    }
                </ul>
                    
            </div>}
        </div>
    )
    
}

const mapDispatchToProps = {
    loadAllProspect
}

const mapStateToProps = (store)=>{
    return {
        user: store.user,
        follow: store.prospect,
        prospect: store.follow
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProspect)
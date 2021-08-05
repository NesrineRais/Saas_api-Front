import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import 'moment/locale/fr'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {updateFollow} from "../../api/follow";
import {getAllFollowByUser}from '../../api/follow';
import {loadAllFollow} from '../../actions/follow/followAction';

const EditFollowPopUp = (props)=>{
    const [date, setDate] = useState(moment());
    const [type, setType] = useState('call');
    const [description, setDescription] = useState('');
    
    useEffect(()=>{
        console.log(' did mount',props);
        setDate(props.selectedFollow.callDateTime);
        setType(props.selectedFollow.type);
        setDescription(props.selectedFollow.description);
    }, [props])
    
    const onSubmitForm = ()=>{
        let formDate = moment(date).format('yyyy-M-D')+' '+moment(date).format('HH:mm:ss')
        
        let data = {
            callDateTime: formDate,
            type: type,
            description: description
        }
        
        updateFollow(data, props.selectedFollow.id)
            .then((res)=>{
                console.log(res);
                if(res.status === 200) {
                    getAllFollowByUser(props.user.infos.id)
                        .then((response)=>{
                            console.log(response);
                            props.loadAllFollow(response.follows);
                            props.onClickClose();
                        })
                }
            })
    }
    
    return (
        <div className="popup">
            <div className="close"
				onClick={(e)=>{
					props.onClickClose();
				}}
			>X</div>
			<h2>ajouter un suivi</h2>
			<form
			    onSubmit={(e)=>{
			        e.preventDefault()
			        onSubmitForm()
			    }}
			>
			    <Datetime
			        value={date}
			        onChange={(value)=>{
			            setDate(value);
			        }}
			    />
			    <select
			        value={type}
			        onChange={(e)=>{
			            setType(e.target.value);
			        }}
			    >
			        <option value="call">call</option>
			        <option value="rdv">rdv</option>
			    </select>
			    <textarea
			        type="text"
			        placeholder="description"
			        value={description}
			        onChange={(e)=>{
			            setDescription(e.target.value);
			        }}
			    >
			    </textarea>
			    <input type="submit" value="ajouter"/>
			</form>
        </div>
    )
}

const mapDispatchToProps = {
    loadAllFollow
}

const mapStateToProps = (store)=>{
    return {
        user: store.user,
        follow: store.prospects,
        prospect: store.follow
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditFollowPopUp);
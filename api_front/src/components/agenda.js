import React, {useState, useEffect} from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import moment from 'moment';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import {connect} from 'react-redux';
import {saveRdv, getAllRdvByUser, updateRdv, deleteRdv} from '../api/rdv';
import {loadAllRdv} from '../actions/rdv/rdvAction';
import 'moment/locale/fr'

// require('moment/locale/fr.js'); coté backend en utilise ca

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}
 
let now = new Date();
 

 

const Agenda = (props)=>{
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [cellHeight, setCellHeight] = useState(30);
    const [showModal, setShowModal] = useState(false);
    const [locale, setLocale] = useState("fr");
    const [rowsPerHour, setRowsPerHour] = useState(2);
    const [numberOfDays, setNumberOfDays] = useState(4);
    const [startDate, setStartDate] = useState(new Date())
    
    useEffect(()=>{
        console.log(props);
        let rdv = props.agenda.rdv;
        rdv.map((item)=>{
            item.startDateTime = new Date(item.startDateTime);
           item.startDateTime.setHours(item.startDateTime.getHours());
             item.endDateTime = new Date(item.endDateTime);
             item.endDateTime.setHours(item.endDateTime.getHours());
         })
         setItems(rdv);
    }, [props])
    
    
    const handleCellSelection = (item)=>{
      console.log('handleCellSelection',item)
      
    }
    const handleItemEdit = (item)=>{
      console.log('handleItemEdit', item)

      console.log('handleItemEdit', item)
      setSelected([item]);
      setShowModal(true)
    }
    
    const handleItemRemove = (item, newItem)=>{
      console.log('handleItemRemove', newItem)
      

      deleteRdv(newItem._id)
        .then((res)=>{
          if(res.status === 200) {
            getAllRdvByUser(props.user.infos.id)
                .then((response)=>{
                    if(response.status === 200){
                        props.loadAllRdv(response.rdvs);
                        setShowModal(false);
                        
                    }
                })
        }
        })
    }
    
    
    const handleRangeSelection = (item) =>{
      console.log('handleRangeSelection', item);
      setSelected(item);
      setShowModal(true)
    }
    
    const addNewEvent = (items, newItem) =>{
      console.log('addNewEvent ITEMS', items)
      console.log('addNewEvent NEW ITEMS', newItem);
      let data = {
          name: newItem.name,
          startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
          endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
          classes: newItem.classes,
          _id: newItem._id,
          user_id: props.user.infos.id
      }

      saveRdv(data)
        .then((res)=>{
            //console.log(res);
            if(res.status === 200) {
                getAllRdvByUser(props.user.infos.id)
                    .then((response)=>{
                        if(response.status === 200){
                            props.loadAllRdv(response.rdvs);
                            setShowModal(false);
                            
                        }
                    })
                
                
            }
        })
	  
    }
    
    const editEvent = (item, newItem) =>{
      console.log('editEvent', item)
	    console.log('editEvent', newItem)
	    let data = {
    	      name: newItem.name,
    	      startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
    	      endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
    	      classes: newItem.classes,
    	  }
	  
	    updateRdv(data, newItem._id)
	        .then((res)=>{
            console.log(res)
	            if(res.status === 200) {
                getAllRdvByUser(props.user.infos.id)
                    .then((response)=>{
                        if(response.status === 200){
                            props.loadAllRdv(response.rdvs);
                            setShowModal(false);
                            
                        }
                    })
                }
	        })
	    
    }
    
    return (<div>
        <h1>Agenda</h1>
        { showModal &&
			          <Modal clickOutside={()=>setShowModal(false)} >
			            <div className="modal-content">
			              <ReactAgendaCtrl
			                items={items}
			                itemColors={colors}
			                selectedCells={selected}
			                Addnew={addNewEvent}
			                edit={editEvent}  />
			            </div>

			        </Modal>
			}
        
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={startDate}
          cellHeight={cellHeight}
          locale={locale}
          items={items}
          numberOfDays={numberOfDays}
          rowsPerHour={rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={handleItemEdit}
          onItemRemove={handleItemRemove}
          onCellSelect={handleCellSelection}
          onRangeSelection={handleRangeSelection}
        />
    </div>)
    
}

const mapDispatchToProps = {
    loadAllRdv
}

const mapStateToProps = (store)=>{
    return {
        agenda: store.rdv,
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
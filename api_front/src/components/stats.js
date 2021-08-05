import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Chart } from "react-google-charts";
import moment from 'moment'
import 'moment/locale/fr'


let result = [
			    ['date', 'rdv', 'call'],
			    ['2021-12-1', 1, 12],
			    ['2021-12-1', 2, 15],
			    ['2021-12-3', 1, 23],
			    ['2021-12-5', 4, 2],
			  ];

let result2 = [
			    ['date', 'prospects'],
			    ['2021-12-1', 1],
			    ['2021-12-1', 2],
			    ['2021-12-3', 1],
			    ['2021-12-5', 8],
			  ]
			  
			  
const Stat = (props)=>{
    const [follows, setFollows] = useState(result);
    const [prospects, setProspects] = useState(result2)
    
    
    
    useEffect(()=>{
       let clearFollows =  [];
       
       clearFollows.push(['date', 'rdv', 'call']);
       console.log(props);
       
       props.prospect.follows.map((follow)=>{
           
           let index = clearFollows.findIndex((f)=>{
                return moment(f[0]).format("YYYY-MM-DD") == moment(follow.callDateTime).format("YYYY-MM-DD")
           })
           console.log('index',index);
           if(follow.type === "call") {
               if(index !== - 1) {
                  
                   clearFollows[index][2] += 1
               } else {
                   clearFollows.push([moment(follow.callDateTime).format("YYYY-MM-DD"), 0, 1])
               }
           } else {
               if(index !== - 1) {
                   clearFollows[index][1] += 1
               } else {
                   clearFollows.push([moment(follow.callDateTime).format("YYYY-MM-DD"), 1, 0])
               }
           }

       })
        
        setFollows(clearFollows);
        
        let clearProspects =  [];
       
       clearProspects.push(['date', 'prospects']);
       
       props.follow.prospects.map((prospect)=>{
           
           let index = clearProspects.findIndex((p)=>{
                return moment(p[0]).format("YYYY-MM-DD") == moment(prospect.creationTimestamp).format("YYYY-MM-DD")
           })
           
           if(index !== -1) {
               clearProspects[index][1] += 1;
           } else {
               clearProspects.push([moment(prospect.creationTimestamp).format("YYYY-MM-DD"), 1])
           }
       })
        
        console.log(clearProspects);
        setProspects(clearProspects);
    }, [props])
    
    
    return (
        <div>    
            <h2>Statistiques</h2>
            <Chart
			  width={'800px'}
			  height={'600px'}
			  chartType="AreaChart"
			  loader={<div>Loading Chart</div>}
			  data={follows}
			  options={{
			    title: 'Statistique Rdv et appels',
			    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
			    vAxis: { minValue: 0 },
			    // For the legend to fit, we make the chart area smaller
			    chartArea: { width: '50%', height: '70%' },
			    // lineWidth: 25
			  }}
			  // For tests
			  rootProps={{ 'data-testid': '1' }}
			/>
			<Chart
			  width={'800px'}
			  height={'600px'}
			  chartType="AreaChart"
			  loader={<div>Loading Chart</div>}
			  data={prospects}
			  options={{
			    title: 'Statistique prospects',
			    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
			    vAxis: { minValue: 0 },
			    // For the legend to fit, we make the chart area smaller
			    chartArea: { width: '50%', height: '70%' },
			    // lineWidth: 25
			  }}
			  // For tests
			  rootProps={{ 'data-testid': '1' }}
			/>
        </div>
    )
    
}


const mapDispatchToProps = {
    	
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		follow: store.prospect,
		prospect: store.follow
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
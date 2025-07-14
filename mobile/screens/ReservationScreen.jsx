import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import {SimpleCustomNavBar} from '../components/CustomNavBar'
import VisitsListItem from '../components/VisitsListItem';
import EventReservationCard from '../components/EventReservationCard';

const ReservationScreen = (props) => {
  const {navigation} = props;
  return (
    <View style={{flex:1}}>
      <SimpleCustomNavBar hasAction={false} action={()=>{}}  name="Reserved events" iconName="menu" navigation={navigation} />
      <ScrollView  >
      <View style={{ paddingLeft:10}}>

      <EventReservationCard data={{tickets:[{id:1},{id:2}], date:'12-12-2023', name:'Nyege nyege'}} {...props} height={'16%'}/>
      <EventReservationCard data={{tickets:[{id:1}], date:'08-01-2024', name:'Godmesa'}} {...props} height={'16%'}/>
      <EventReservationCard data={{tickets:[{id:1},{id:2}, {id:3}], date:'12-03-2024', name:'Umuganura Gisenyi'}} {...props} height={'16%'}/>
      <EventReservationCard data={{tickets:[{id:1}], date:'02-05-2024', name:'Tanzania liberation day'}} {...props} height={'16%'}/>
      {/* <EventReservationCard {...props} height={'16%'}/>
      <EventReservationCard {...props} height={'16%'}/>
      <EventReservationCard {...props} height={'16%'}/> */}
 
      
      </View>
      
      
      </ScrollView>
      {true && <View style={{ flex:200, paddingLeft:10}}>
        <View style={{flex:1, width:'10%', borderRightWidth:0.5}}>

        </View>

      </View>}
     
      
      
      
    </View>
  )
}

export default ReservationScreen
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import {SimpleCustomNavBar} from '../components/CustomNavBar'
import VisitsListItem from '../components/VisitsListItem';

const VisitsScreen = (props) => {
  const {navigation} = props;
  return (
    <View style={{flex:1}}>
      <SimpleCustomNavBar hasAction={true} action={()=>{}}  name="Visits" actionIcon="plus" iconName="menu" navigation={navigation} />
      <ScrollView  >
      <View style={{ paddingLeft:10}}>

      <VisitsListItem {...props} height={'16%'}/>
      <VisitsListItem {...props} height={'16%'}/>
      <VisitsListItem {...props} height={'16%'}/>
      <VisitsListItem {...props} height={'16%'}/>
      {/* <VisitsListItem {...props} height={'16%'}/>
      <VisitsListItem {...props} height={'16%'}/>
      <VisitsListItem {...props} height={'16%'}/> */}
 
      
      </View>
      
      
      </ScrollView>
      {true && <View style={{ flex:200, paddingLeft:10}}>
        <View style={{flex:1, width:'10%', borderRightWidth:0.5}}>

        </View>

      </View>}
     
      
      
      
    </View>
  )
}

export default VisitsScreen
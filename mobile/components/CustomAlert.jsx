import React from 'react'
import { Alert } from 'react-native';

const CustomAlert = (props) => {
  const {type, message, actionOk, actionNo} = props;
  return (
    Alert.alert({type}, {message}, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
  )
}

export default CustomAlert
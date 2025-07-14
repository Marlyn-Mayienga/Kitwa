import React from "react";
import {View,  Image, TouchableOpacity} from 'react-native'
const MediaImageCard = (props) => {
  const {onPress, imageUrl} = props;
  return (
    <TouchableOpacity
       onPress={onPress}
      style={{
        height: 100,
        width: 95,
        borderRadius: 7,
        backgroundColor: "red",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
      }}
    >
      <Image
        style={{ width: "100%", height: "100%", borderRadius: 7 }}
        source={{
          // uri: "https://kenyalogue.com/wp-content/uploads/2023/02/KAMBA-Dance-1.jpg",
          uri:imageUrl
        }}
      />
    </TouchableOpacity>
  );
};

export default MediaImageCard;

import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CounterComponent = (props) => {
  const {counterHandler, count} = props;  
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ alignItems: "center" }}>
        <AntDesign onPress={()=>{counterHandler('+')}} name="caretup" size={20} color="black" />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>{count}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <AntDesign onPress={()=>{counterHandler('-')}} name="caretdown" size={20} color="black" />
      </View>
    </View>
  );
};

export default CounterComponent;

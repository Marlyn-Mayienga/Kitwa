import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, ProgressBar, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/user";
import { deleteToken } from "../utils/LocalStorageTools";
const CustomDrawer = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatcher = useDispatch();
  const user = useSelector(state=>state.user)

  // console.log(user)
  const logoutHandler = () => {
    setLoading(true)
    setTimeout(async () => {
      await deleteToken()
      dispatcher(setUser({ isLoggedIn: false, user: null, token: null }));
      setLoading(false)
    }, 2000);
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: 5,
      width: "55%",
      alignItems: "center",
      justifyContent: "center",
      // marginBottom: 20,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "40%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Avatar.Image
          size={144}
          source={{
            uri:"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
            // uri: "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=",
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 26, marginVertical: 15 }}>
          Kenvin Opondo
        </Text>
        {/* <View
          style={{
            height: 12,
            width: "70%",
            borderWidth: 1,
            borderColor: "#c8c8c8",
          }}
        >
          <View
            style={{ height: "100%", width: "70%", backgroundColor: "#81c784" }}
          ></View>
          <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text>200</Text>
          <Text>Bonga points</Text>
        </View> */}
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{ flex: 1, paddingTop: 10 }}
        {...props}
      >
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
      <View style={{height:'15%', alignItems: "center", paddingTop: 5}}>
        {loading ? 
        <ActivityIndicator
        size={30}
        style={{
          color: 'red',
          marginBottom: 15,
        }}
      />
        :<Button
          style={{
            ...styles.button,
            backgroundColor: "red",
          }}
          mode="contained"
          onPress={logoutHandler}
        >
          <MaterialCommunityIcons name="logout" size={18} color="#fff" />
          <Text>Logout</Text>
        </Button>}
      </View>
    </View>
  );
};

export default CustomDrawer;

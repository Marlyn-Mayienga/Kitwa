import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, RefreshControl, Text, View } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleCustomNavBar } from "../components/CustomNavBar";
import { API } from "../API/Configs";
import { getCoverImageArtifacts } from "../utils/ImageUtiles";

const OrdersScreen = (props) => {
  const theme = useTheme();
  const api = new API()
  const { navigation } = props;
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('p')
  const [refreshing, setRefreshing] = useState(false)


  function getOrdinalSuffix(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return  (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  function formatDate(inputDate) {
    const currentDate = new Date();
    const targetDate = new Date(inputDate);
  
    const timeDifference = targetDate - currentDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (daysDifference > 7) {
      const day = targetDate.getDate();
      const month = targetDate.toLocaleString('default', { month: 'short' });
  
      return `In one week on ${day}${getOrdinalSuffix(day)}/${month}`;
    } else {
      const day = targetDate.getDate();
      const month = targetDate.toLocaleString('default', { month: 'short' });
  
      return `${day}${getOrdinalSuffix(day)}/${month}`;
    }
  }
  const getOrders = async()=>{
    try{
      const response = await api.getRequest('/sales', true)
      // console.log(response.data.data)
      setOrders(response.data.data)
    }catch(e){

    }
  }

  useEffect(()=>{
    getOrders()
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders()
    setRefreshing(false);
  }, []);


  const styles = StyleSheet.create({
    main: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      paddingTop: "10%",
      paddingHorizontal: "5%",
      // justifyContent:'center'
    },
    textInput: {
      width: "70%",
      marginBottom: 20,
    },
    button: {
      borderRadius: 5,
      width: "70%",
      marginBottom: 20,
    },
    question: {
      fontSize: 15,
      fontWeight: "bold",
    },
    errorText: {
      color: theme.custom_colors.danger,
      marginBottom: 5,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <SimpleCustomNavBar hasAction={false} action={()=>{}}  name="Purchases" actionIcon="plus" iconName="menu" navigation={navigation} />

      <View style={styles.main}>

        {/* <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/app-icon.png")}
            style={{ width: 80, height: 80, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Culture{" "}
            <Text style={{ color: theme.custom_colors.buttonMainColor }}>
              Vault
            </Text>
          </Text>
        </View> */}
        <View style={{ flex: 1, width: "100%" }}>
          <Text style={{ fontSize: 22, marginTop: 10, fontWeight: "bold" }}>
            My orders
          </Text>
          <View
            style={{
              width: "100%",
              height: 80,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: "center" }}>
            {orders.filter(order => order.status === 0).length > 0 && <Badge>{orders.filter(order => order.status === 0).length}</Badge>}
              <MaterialCommunityIcons
                name="timer-sand"
                color={tab==='p'? "black": "grey"}
                size={ tab==='p'?28: 24}
                // color="black"
                onPress={()=>{setTab('p')}}
              />
              <Text onPress={()=>{setTab('p')}} style={{color:tab==='p'?'black':'grey'}} >Pending</Text>
            </View>
            <View style={{ alignItems: "center" }}>
            {orders.filter(order => order.status === 1).length > 0 && <Badge>{orders.filter(order => order.status === 1).length}</Badge>}
              <MaterialCommunityIcons
                name="truck-delivery"
                size={ tab=='t'?28: 24}
                color={tab==='t'? "black": "grey"}
                onPress={()=>{setTab('t')}}

              />
              <Text onPress={()=>{setTab('t')}} style={{color:tab==='t'?'black':'grey'}} >In transit</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              {orders.filter(order => order.status === 2).length > 0 && <Badge>{orders.filter(order => order.status === 2).length}</Badge>}
              <MaterialCommunityIcons 
                onPress={()=>{setTab('d')}}
                name="package" 
                size={ tab=='d'?28: 24} 
                color={tab==='d'? "black": "grey"}
              />
              <Text onPress={()=>{setTab('d')}} style={{color:tab==='d'?'black':'grey'}}>Delivered</Text>
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
          >

            {tab==='p'&& orders.filter(order => order.status === 0).map((order, key)=>{
              
              return (
                <View
                key={key}
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: getCoverImageArtifacts(order.artifact),
                }}
              />
              <View style={{ flex:1, paddingHorizontal:'1%'}}>
                <Text numberOfLines={1} >
                  {order.artifact.name} 
                </Text>
                <Text style={{ textAlign: "left" }}>${order.quantity * order.artifact.price} | {order.quantity} Units</Text>
              </View>
            </View>
              )
            })}



          {tab==='t'&& orders.filter(order => order.status === 1).map((order, key)=>{
              
              return (
                <View
                key={key}
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 80,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "20%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: getCoverImageArtifacts(order.artifact),
                }}
              />
              <View style={{ flex:1, paddingHorizontal:'1%'}}>
                <Text numberOfLines={2} >
                  {order.artifact.name+" - Arrives: "}<Text style={{fontWeight:'bold', color:'red'}}>{formatDate(order.time_to_deliver)}</Text>
                </Text>
                <Text style={{ textAlign: "left" }}>${order.quantity * order.artifact.price} | {order.quantity} Units</Text>
              </View>
            </View>
              )
            })}

            {tab==='d'&& orders.filter(order => order.status === 2).map((order, key)=>{
              
              return (
                <View
                key={key}
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: getCoverImageArtifacts(order.artifact),
                }}
              />
              <View style={{ flex:1, paddingHorizontal:'1%'}}>
                <Text numberOfLines={1} >
                  {order.artifact.name}
                </Text>
                <Text style={{ textAlign: "left" }}>${order.quantity * order.artifact.price} | {order.quantity} Units</Text>
              </View>
            </View>
              )
            })}

            {/* <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View>

            <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
                height: 60,
                marginVertical: 5,
                backgroundColor: theme.custom_colors.inputTextBorder,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: "15%",
                  height: "100%",
                  marginRight: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: "https://i.pinimg.com/736x/fe/ff/11/feff11ca9906c8a6bb2612a1221167a7.jpg",
                }}
              />
              <View>
                <Text numberOfLines={1}>
                  Some text here and the money payed
                </Text>
                <Text style={{ textAlign: "right" }}>$50</Text>
              </View>
            </View> */}
            
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OrdersScreen;

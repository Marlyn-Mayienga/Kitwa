import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  List,
  Button,
  MD3Colors,
  ActivityIndicator,
  Divider,
  TextInput,
  useTheme,
} from "react-native-paper";
import { monthsList } from "../utils/Dates";
import { getCoverImage } from "../utils/ImageUtiles";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { API } from "../API/Configs";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/app";
// import { Divider, List } from 'react-native-paper';

const PaymentModal = (props) => {

  const theme = useTheme();
  const dispatcher = useDispatch()
  const { navigation, data, showModel, closeModel } = props;
  const {activities, event} = data;
  const api = new API();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const showPayModal = () => setModelVisibleVisible(false);
  const hidePayModal = () => setModelVisibleVisible(false);
  const [selectedActivities, setSelectedActivities] = useState([])
  // Hooks
  const { loading, confirmPayment } = useConfirmPayment();

  const [payerEmail, setPayerEmail] = useState();
  const [billingDetails, setCardDetails] = useState();
  const [loadingPage, setLoadingPage] = useState(false)
  //   Functions

  
  const calculateTotalCharges = ()=>{
    let total = 0;
    activities.forEach((act)=>{
        total += act.price
    })
    return total
  }

  const claculateBill=()=>{
    let total = 0;
    selectedActivities.forEach(act=>{
        total+=act.price
    })
    return total
  }
  const handlePayment = async () => {
    try{
    if (!billingDetails?.complete || !payerEmail) {
      console.log("Not complete");
      Alert.alert("Please enter complete card details and email")
    //   dispatcher(addMessage({message:"Please enter complete card details and email"}))
      return;
    }
    const respose = await api.postRequest("/pay/", {
      items: selectedActivities,
    }, true);
    const { data, status, transactionId } = respose.data;
    console.log(respose.data)
    const { paymentIntent, error } = await confirmPayment(data.clientSecret, {
      paymentMethodType: "Card",
      billingDetails: billingDetails,
    });
    // console.log(paymentIntent, error);

    if (error) {
      console.log(error);
    Alert.alert(error.message)

    } else if (paymentIntent) {
    //   console.log(paymentIntent);
    Alert.alert("Payed successifully!")
    setTimeout(()=>{
       closeModel()
      navigation.navigate("visits", {screen:'visits_list'})

    },2000)
    }
}catch(e){
    console.log(e)
    Alert.alert("Something went wrong try agian later.")

}
  };

  //  Comp

  return (
    <Modal
      style={{
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "flex-start",
      }}
      visible={showModel}
      animationType="slide"
      onDismiss={hidePayModal}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          justifyContent: "flex-start",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ width: "100%", marginBottom: 10, alignItems: "flex-end" }}
          >
            <AntDesign
              onPress={closeModel}
              name="closecircle"
              size={24}
              color="black"
            />
          </View>

          <List.Section>
            <List.Subheader style={{ fontSize: 18, marginLeft: -15 }}>
              Select activities to participate in
            </List.Subheader>
            {activities.map((activity) => {
             
                return (
                  <List.Item
                    title={activity.title}
                    left={() => (
                      <View
                        style={{
                          height: 70,
                          width: 70,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderRadius: 40,
                        }}
                      >
                        <Text style={{ fontSize: 11 }}>{activity.price<=0? "FREE":`${activity.price} USD`}</Text>
                      </View>
                    )}
                    right={() => {
                        let position = selectedActivities.findIndex((el)=>el.id===activity.id)
                        // console.log(position)
                        if(position>-1){
                           return <View style={{flex : 1, alignItems:'flex-end', justifyContent:'center'}}>
                             <AntDesign 
                            onPress={()=>{

                                if(activities.length===1){
                                    setSelectedActivities([])
                                }else{
                                    setSelectedActivities([...(selectedActivities.splice(position-1,1))])

                                }
                            }}
                           name="minus" size={24} color="black" />
                          </View>
                        }else{
                            return<View style={{flex : 1, alignItems:'flex-end', justifyContent:'center'}}> 
                            <AntDesign 
                            onPress={()=>{
                            setSelectedActivities([...selectedActivities, activity])

                            }}
                            name="plus" size={24} color="black" />
                       </View>
                        }
                    }}
                  />
                );
           
            })}

          </List.Section>
          <Divider />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            <Text>Total chages: {claculateBill()} USD</Text>
          </View>

          <Divider />
          {!showPaymentForm? (calculateTotalCharges()>0 ) ?
          <View
            
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              height: 150,
              flexDirection: "row",
            }}
          >
            {false && <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: "40%",
              }}
            >
              <Image
                style={{ flex: 1, resizeMode: "cover", width: "100%" }}
                source={{
                  uri: "https://play-lh.googleusercontent.com/bRZF74-13jknePwUd1xam5ZCSdAJVuI_wqtkrisBgu7EEh1jobh2boZihlk-4ikY_S3V",
                }}
              />
            </View>}
            <TouchableOpacity
                onPress={()=>{
                    if(claculateBill()>0){
                    setLoadingPage(true)
                    setTimeout(()=>{
                        
                            setShowPaymentForm(true)
                            setLoadingPage(false)
                       
                    },2000)
                }else{
                    // addMessage
                    closeModel()
                    dispatcher(addMessage({message:"You do not have to pay for this event.", show:true}))
                }
                }}      
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: "40%",
                backgroundColor: "#fff",
                borderWidth: 0.1,
                borderColor: "#000",
              }}
            >
             {loadingPage? <ActivityIndicator animating={true} color={MD3Colors} />: <AntDesign name="creditcard" size={84} color="black" />}
              <Text>Debit/Credit card</Text>
            </TouchableOpacity>
          </View>:
          <View style={{width:'100%', height:80, alignItems:'center', justifyContent:'center'}}>
            
          <Text>This event is free of charges</Text>  
            </View>:null}
          {showPaymentForm && (
            <StripeProvider
              publishableKey={
                "pk_test_51O6ugFHIsqFuJF6GMuPCa6lrV4uT0CgL9ldQyJA65xgkTyUssPcysDEJvDDP1ifLnvYE8vIHlFDlMrTzq4k45iHb00cGAOviEu"
              }
              // merchantIdentifier="merchant.identifier" // required for Apple Pay
              // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
              <View style={{ height: "100%", width: "100%", paddingTop: 40 }}>
                <ScrollView contentContainerStyle={{ height: "100%" }}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="E-mali"
                    mode="outlined"
                    keyboardType="email-address"
                    onChange={(text) => {
                      setPayerEmail(text);
                    }}
                    style={{
                      backgroundColor: "#efefefef",
                      fontSize: 20,
                      height: 35,
                      padding: 10,
                    }}
                  />

                  <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                      number: "4242 4242 4242 4242",
                    }}
                    cardStyle={{ backgroundColor: "#efefefef" }}
                    style={{ height: 50, marginTop: 30 }}
                    onCardChange={(details) => {
                      setCardDetails(details);
                    }}
                  />

                <View style={{width:'100%', marginTop:20, alignItems:'center', justifyContent:'center'}}>
                {loading? 
                <ActivityIndicator animating={true} color={MD3Colors} />
                :<TouchableOpacity
                    onPress={handlePayment}
                    style={{width:'60%', borderRadius:5, height:40, alignItems:'center', justifyContent:'center', backgroundColor:theme.custom_colors.buttonMainColor}}
                  >
                    <Text style={{color:'#fff'}}>PAY {claculateBill()} $</Text>
                  </TouchableOpacity>}
                </View>
                 
                  {/* <Button onPress={handlePayment} disabled={loading}>
                    Pay
                  </Button> */}
                </ScrollView>
              </View>
            </StripeProvider>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default PaymentModal;

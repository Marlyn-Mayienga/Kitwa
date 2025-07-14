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
  Alert,
  PermissionsAndroid,
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
import { getCoverImage, getCoverImageArtifacts } from "../utils/ImageUtiles";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { API } from "../API/Configs";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/app";
import * as Location from "expo-location";
import CounterComponent from "./CounterComponent";
import CustomAlert from "./CustomAlert";
// import { Divider, List } from 'react-native-paper';

const PayArtifactsModal = (props) => {
  const theme = useTheme();
  const api = new API();
  const dispatcher = useDispatch();
  const { navigation, data, showModel, closeModel } = props;
  // console.log(data)
  const { activities, event } = data;
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const showPayModal = () => setModelVisibleVisible(false);
  const hidePayModal = () => setModelVisibleVisible(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  // Hooks
  const { loading, confirmPayment } = useConfirmPayment();

  const [payerEmail, setPayerEmail] = useState();
  const [address, setAdress] = useState("");
  const [billingDetails, setCardDetails] = useState();
  const [loadingPage, setLoadingPage] = useState(false);
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [quantity, setQuantity] = useState(1);
  const [getingAddress ,setGetingAddress] = useState(true)
  //  This key must be changed and create a key which can not work if not used with our app
  const myApiKey = "AIzaSyAzU9pbp9l2aLnPqchtzKD9bDMdwSRs4HY";

  useEffect(() => {
    (async () => {
      setGetingAddress(true)
      // console.log("Has started")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("No permission ....");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location)
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
      // console.log(`Has started  ${location.coords.latitude} ${location.coords.longitude}`)
    })();
  }, []);

  const getCurrentAddress = async () => {
    setGetingAddress(true)
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        long +
        "&key=" +
        myApiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "ADDRESS GEOCODE is BACK!! => " +
            JSON.stringify(responseJson.results[0].formatted_address)
        );
        setGetingAddress(false)

        setAdress(responseJson.results[0].formatted_address)
      }).catch((e)=>{
        console.log(e)
        setGetingAddress(false)

      })
  };

  useEffect(()=>{
    if(long){
      getCurrentAddress()
    }
  },[long])

  const counterHandler = (action) => {
    if (action === "+") {
      if (quantity < data.quantity) {
        setQuantity(quantity + 1);
      } else {
        <CustomAlert
          type="Warning"
          message="The available quantity has been exceeded."
        />;
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        <CustomAlert type="Warning" message="1 Item is selected" />;
      }
    }
  };

  const handlePayment = async () => {
    try {
      if (!billingDetails?.complete || !payerEmail) {
        console.log("Not complete");
        Alert.alert("Please enter complete card details and email");
        //   dispatcher(addMessage({message:"Please enter complete card details and email"}))
        return;
      }
      const respose = await api.postRequest(
        "/buy-artifact/",
        {
          delivery_address:address,
          items: [{"id":data.id, "quantity":quantity}],
        },
        true
      );
      const { status, transactionId } = respose.data;
      if (status == 200) {
        console.log(respose.data);
        // console.log(billingDetails)
        const { paymentIntent, error } = await confirmPayment(
          respose.data.data.clientSecret,
          {
            paymentMethodType: "Card",
            billingDetails: billingDetails,
          }
        );
        // console.log(paymentIntent, error);

        if (error) {
          console.log(error);
          Alert.alert(error.message);
        } else if (paymentIntent) {
          //   console.log(paymentIntent);
          Alert.alert("Payed successifully!");
          // setTimeout(() => {
            closeModel();
            navigation.goBack();
          // }, 2000);
        }
      }else{
        console.log(respose.data)
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Something went wrong try agian later.");
    }
  };

  if(getingAddress){
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

          <View style={{height:'70%', alignItems:'center', justifyContent:'center', }}>
          <Text style={{fontWeight:'bold', fontSize:22}}>Loading ... </Text>

          </View>
</View>
</Modal>
    )
  }

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
              {data.name} [{data.quantity}]
            </List.Subheader>
            <List.Item
              title={data.name}
              description={`${quantity} Unit(s) for $ ${data.price} each`}
              left={(props) => (
                <Image
                  style={{ width: "18%" }}
                  source={{ uri: getCoverImageArtifacts(data) }}
                />
              )}
              right={(props) => (
                <CounterComponent
                  counterHandler={counterHandler}
                  count={quantity}
                />
              )}
            />
          </List.Section>
          <Divider />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            <Text>Total chages: {data.price * quantity} USD</Text>
          </View>

          <Divider />

          <Text></Text>
                  <Text>Delivery address</Text>

                  <TextInput
                      autoCapitalize="none"
                      placeholder="Address"
                      mode="outlined"
                      defaultValue={address}
                      onChange={(text) => {
                        setAdress(text);
                      }}
                      style={{
                        backgroundColor: "#efefefef",
                        fontSize: 20,
                        height: 35,
                        padding: 10,
                      }}
                  />
          {!showPaymentForm ? (
            5 > 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: 150,
                  flexDirection: "row",
                }}
              >
                {false && (
                  <View
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
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    // getCurrentAddress()
                    // if(0>0){
                    setLoadingPage(true);
                    setTimeout(() => {
                      setShowPaymentForm(true);
                      setLoadingPage(false);
                    }, 2000);
                    // }else{
                    //     // addMessage
                    //     closeModel()
                    //     dispatcher(addMessage({message:"You do not have to pay for this event.", show:true}))
                    // }
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
                  {loadingPage ? (
                    <ActivityIndicator animating={true} color={MD3Colors} />
                  ) : (
                    <AntDesign name="creditcard" size={84} color="black" />
                  )}
                  <Text>Debit/Credit card</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 80,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>This event is free of charges</Text>
              </View>
            )
          ) : null}
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
                  <Text>Email address</Text>
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

                  <View
                    style={{
                      width: "100%",
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator animating={true} color={MD3Colors} />
                    ) : (
                      <TouchableOpacity
                        onPress={handlePayment}
                        style={{
                          width: "60%",
                          borderRadius: 5,
                          height: 40,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: theme.custom_colors.buttonMainColor,
                        }}
                      >
                        <Text style={{ color: "#fff" }}>
                          PAY {data.price * quantity} $
                        </Text>
                      </TouchableOpacity>
                    )}
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

export default PayArtifactsModal;

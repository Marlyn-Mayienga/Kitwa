import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Button, Card, FAB, IconButton, Snackbar, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import ArtifactCard from "../components/ArtifactCard";
import { API } from "../API/Configs";
import CustomSkeleton from "../components/CustonSkeleton";
import { getAllImagesArtifacts, getCoverImageArtifacts } from "../utils/ImageUtiles";
import PayArtifactsModal from "../components/PayArtifactsModal";

const ArtifactDetails = (props) => {
  // states
  const api = new API();
  const { navigation, route } = props;
  const {artifactId} = route.params;
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artifact, setArtifact] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const onDismissSnackBar = () => setErrorVisible(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [modalVisible, setModelVisibleVisible] = useState(false)

  // functions
  const getArtifactById = async () => {
    setLoading(true);
    try {
      const response = await api.getRequest(
        "/artifact/?id=" + artifactId,
        true
      );
      if (response.data.status === 200) {
        setArtifact(response.data.data[0]);
        // setHotels(response.data.data.hotels)
        // console.log(response.data.data[0])
      } else {
        setErrorVisible(true);
        setServerMessage(response.data.message);
        setTimeout(() => {
          navigation.pop();
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // CSS
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      resizeMode: "cover",
      height: "100%",
    },
  });
// Components

const DisplayImages = ({data})=>{
 if(data.length === 1){
  return(
    <View
    style={{
      backgroundColor: "red",
      borderTopLeftRadius: 10,
      borderTopRightRadius:10,
      width: "90%",
      height: "100%",
      margin: 5,
    }}
  >
    <Image
      style={{
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius:10
      }}
      source={{
        uri: data[0],
      }}
    />
  </View>
  )
 }
 return data.map((image, index)=>{
  // console.log(image)

    if(index === 0){
        return(
          <View
          key={index}
          style={{
            backgroundColor: "red",
            borderTopLeftRadius: 10,
            width: "45%",
            height: "100%",
            margin: 5,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
            }}
            source={{
              uri: image,
            }}
          />
        </View>
        )
    }else{
        return(
          <View
              key={index}
              style={{
                backgroundColor: "red",
                borderTopRightRadius: 10,
                width: "45%",
                height: "100%",
                margin: 5,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopRightRadius: 10,
                }}
                source={{
                  uri: image,
                }}
              />
            </View>
        )
    }
  })
}
  useEffect(()=>{
    getArtifactById()
  },[])

  if (loading) {
    return (
      <View style={{ padding: "5%", paddingTop: "10%" }}>
        <CustomSkeleton />
        <CustomSkeleton />
        <CustomSkeleton />
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }}>
       <Snackbar
        style={{ zIndex: 3 }}
        visible={errorVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {serverMessage}
      </Snackbar>
      <View style={{ height: "41%" }}>
        <ImageBackground
          style={{ height: "100%" }}
          source={{
            uri: getCoverImageArtifacts(artifact),
          }} // Replace with the actual path to your image
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.7 }}
            colors={["transparent", "rgba(0,0,0,0.8)"]}
          >
            <View style={{ height: "100%" }}>
              <View>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <MaterialIcons
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: 50,
                      paddingLeft: 8,
                      paddingVertical: 5,
                      alignSelf: "center",
                    }}
                    onPress={() => navigation.pop()}
                    name="arrow-back-ios"
                    size={26}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, backgroundColor: "transparent" }}></View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 30,
                  paddingRight: 15,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View style={{paddingRight:7, justifyContent:'center'}}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}
                  >
                    {artifact.name}
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 16, marginLeft: 4 }}>
                    $ {artifact.price}
                  </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={()=>{setModelVisibleVisible(true)}}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.custom_colors.buttonMainColor,
                      height: 40,
                      width: 80,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                        fontSize: 18,
                      }}
                    >
                      Buy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: "8%", paddingTop: "5%" }}>
          <Card
            style={{ backgroundColor: "#fff", borderRadius: 4, padding: 5 }}
          >
            <Card.Content>
              <Text style={{ fontSize: 16 }}>
                {artifact.description}
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View
          style={{
            paddingHorizontal: "8%",
            height: 45,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 8,
              height: 20,
              backgroundColor: theme.custom_colors.buttonMainColor,
              marginRight: 5,
            }}
          ></View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Photos</Text>
          </View>
        </View>
        <View style={{ height: 170, width: "100%", paddingHorizontal: "8%" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 5,
              justifyContent: "space-around",
            }}
          >

            <DisplayImages data={getAllImagesArtifacts(artifact)} />
            
          </View>
        </View>
        <PayArtifactsModal
        
          navigation={navigation}
          showModel={modalVisible}
          data={artifact}
          closeModel={() => {
          setModelVisibleVisible(false);
        }}
        />
      </ScrollView>
    </View>
  );
};

export default ArtifactDetails;

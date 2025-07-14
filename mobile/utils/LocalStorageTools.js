import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToke = async (token) => {
  //   console.log("Token stored ....");
  try {
    const tokenString = JSON.stringify(token);
    await AsyncStorage.setItem("token", tokenString);
    // console.log(token)
  } catch (e) {
    // saving error
  }
};

export const restoreToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem('token');
    // console.log(`The token ${tokenString}`)
    
    return tokenString != null ? JSON.parse(tokenString) : null;
  } catch (e) {
    // error reading value
    return null
  }
};

export const deleteToken =async()=>{
  try{
      await AsyncStorage.removeItem('token')
  }catch(e){

  }
}

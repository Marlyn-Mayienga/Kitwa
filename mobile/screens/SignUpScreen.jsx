import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { validate_email } from "../utils/EmailValidator";
import { isValidPassword } from "../utils/PasswordValidation";
import { useTheme } from "react-native-paper";
import { API } from "../API/Configs";

const SignUpScreen = (props) => {
  const theme = useTheme();
  const { navigation } = props;
  // Styles

  const styles = StyleSheet.create({
    main: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      paddingTop: "20%",
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
    textGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "70%",
      marginBottom: 20,
    },
    errorText: {
      color: theme.custom_colors.danger,
      marginBottom: 5,
    },
  });

  const [firstName, setFirstName] = useState("");
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [lastNameIsvalid, setLastNameIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showOTPBox, setShowOTPBox] = useState(false);
  
  const api = new API();

  // Functions

  const hideDialog = () => {
    setShowError(false);
  };

  const otpBoxShowHandler=()=>{
    setShowOTPBox(false)
  }
  const ErrorDisplay = ({ message }) => {
    const displayMessage = message ? message : "Something went wrong";
    return (
      <Portal>
        <Dialog
          style={{ zIndex: 1, alignItems: "center", justifyContent: "center" }}
          visible={showError}
          onDismiss={hideDialog}
        >
          <Dialog.Icon color="#e02a1d" icon="alert" />
          <Dialog.Title style={styles.title}>Error occured</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{displayMessage}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  };

  const ConfirmAccount = ({ email }) => {
    const [otp, setOtp] = useState();
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const handleOtpChange = (text)=>{
      setOtp(text)
    }
    const sendOtpHandler = async () => {
      setLoading(true);
      const respose = await api.postRequest("/client/confirm/", {
        email: email,
        otp: otp,
      });
      if (respose.data.status === 200) {
        // console.log(respose.data);
        setSuccessMessage(respose.data.message)
        setShowSuccessMessage(true)
        setTimeout(()=>{
          navigation.navigate("login")
        }, 3000)

      } else {
        
        setErrorMessage(respose.data.message);
        setShowError(true);
      }
      setLoading(false)
      // setShowOTPBox(false);
    };

    return (
      <Portal>
        <Dialog
          style={{ zIndex: 1 }}
          visible={showOTPBox}
          onDismiss={otpBoxShowHandler}
        >
          <Dialog.Icon color="#e02a1d" size={33} icon="account-lock-open" />
          <Dialog.Title style={{textAlign:'center'}}>
            Enter the OTP from your email inbox
          </Dialog.Title>
          <Dialog.Content
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {showError && <Text style={{textAlign:'center', fontSize:18, color:theme.custom_colors.danger}}>{errorMessage}</Text>}
            {showSuccessMessage && <Text style={{textAlign:'center', fontSize:18, color:theme.custom_colors.info}}>{successMessage}</Text>}
            <TextInput onChangeText={handleOtpChange} maxLength={5} style={{width:'80%', marginBottom:20}} mode="outlined" keyboardType="number-pad" />
            {loading ? (
              <ActivityIndicator
                size={30}
                style={{
                  color: theme.custom_colors.textMainColor,
                  marginBottom: 15,
                }}
              />
            ) : (
              <Button
                style={{
                  ...styles.button,
                  backgroundColor: theme.custom_colors.buttonMainColor,
                }}
                mode="contained"
                onPress={sendOtpHandler}
              >
                <Text style={{ color: theme.custom_colors.textMainColor }}>
                  Send
                </Text>
              </Button>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  };

  const handleFirtNameChange = (text) => {
    if (text.length >= 3) {
      setFirstName(text);
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }
  };

  const handleLastNameChange = (text) => {
    if (text.length >= 3) {
      setLastNameIsValid(true);
      setLastName(text);
    } else {
      setLastNameIsValid(false);
    }
  };

  const handleEmailChange = (text) => {
    if (validate_email(text)) {
      setEmail(text);
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handlePasswordChange = (text) => {
    const isValid = isValidPassword(text);
    if (isValid) {
      setPassword(text);
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true)
    if (
      passwordIsValid &&
      emailIsValid &&
      firstNameIsValid &&
      lastNameIsvalid
    ) {
      // const name = firstName + " " + lastName;
      const response = await api.postRequest("/client/", {
        email: email,
        password: password,
        confirm_password:password,
        first_name: firstName,
        last_name: lastName
      });
      // console.log(response.data.status)

      if (response.data.status == 200) {
        setShowOTPBox(true);
      }else{
        setShowError(true);
        setErrorMessage(response.data.error);
      }
    } else {
      setShowError(true);
      setErrorMessage("Correct errors in the form.");
    }
    setLoading(false)
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.main}>
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
        <Text></Text>
        <View style={styles.textGroup}>
          <TextInput
            mode="outlined"
            label="First name"
            activeOutlineColor={theme.custom_colors.buttonMainColor}
            outlineColor={theme.custom_colors.inputTextBorder}
            style={{ width: "45%" }}
            // value={text}
            onChangeText={handleFirtNameChange}
          />

          <TextInput
            mode="outlined"
            label="Last name"
            style={{ width: "45%" }}
            activeOutlineColor={theme.custom_colors.buttonMainColor}
            outlineColor={theme.custom_colors.inputTextBorder}
            // value={text}
            onChangeText={handleLastNameChange}
          />
        </View>
        {!firstNameIsValid && (
          <Text style={{ ...styles.errorText, width: "45%" }}>
            First name should be a valid name.
          </Text>
        )}
        {!lastNameIsvalid && (
          <Text style={{ ...styles.errorText, width: "45%" }}>
            Last name should be a valid name.
          </Text>
        )}

        <TextInput
          mode="outlined"
          label="Email"
          style={styles.textInput}
          activeOutlineColor={theme.custom_colors.buttonMainColor}
          outlineColor={theme.custom_colors.inputTextBorder}
          // value={text}
          onChangeText={handleEmailChange}
        />
        {!emailIsValid && (
          <Text style={styles.errorText}>Please enter a valid email</Text>
        )}

        <TextInput
          mode="outlined"
          label="Password"
          style={styles.textInput}
          activeOutlineColor={theme.custom_colors.buttonMainColor}
          outlineColor={theme.custom_colors.inputTextBorder}
          // value={text}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        {!passwordIsValid && (
          <Text style={styles.errorText}>
            Password should be at least 6 characters long.
          </Text>
        )}
        {!passwordIsValid && (
          <Text style={styles.errorText}>
            Password should have a lower and upper case latter
          </Text>
        )}
        {!passwordIsValid && (
          <Text style={styles.errorText}>
            Password should contain a special characters (&%#*)
          </Text>
        )}
        <Text></Text>
        {loading ? (
          <ActivityIndicator
            size={30}
            style={{
              color: theme.custom_colors.textMainColor,
              marginBottom: 15,
            }}
          />
        ) : (
          <Button
            style={{
              ...styles.button,
              backgroundColor: theme.custom_colors.buttonMainColor,
            }}
            mode="contained"
            onPress={handleSignup}
          >
            <Text style={{ color: theme.custom_colors.textMainColor }}>
              Create Account{" "}
            </Text>
          </Button>
        )}
        {false && <Button
          style={{
            ...styles.button,
            borderColor: theme.custom_colors.inputTextBorder,
          }}
          icon={() => (
            <Image
              source={require("../assets/google.png")}
              style={{ width: 20, height: 20, marginRight: 12 }}
            />
          )}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          <Text style={{ color: "#919090", fontSize: 18 }}>
            Sign Up with Google
          </Text>
        </Button>}
        <Text style={styles.question}>Already have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate("login")}>
          <Text style={{ color: theme.custom_colors.buttonMainColor }}>
            Sign In
          </Text>
        </Button>
      </View>
      {/*  */}
      <ConfirmAccount email={email} />
      <ErrorDisplay message={errorMessage} />
    </ScrollView>
  );
};

export default SignUpScreen;

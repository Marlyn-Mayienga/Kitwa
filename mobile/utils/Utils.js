import React from "react";
import { Alert, Linking } from "react-native";

export const opneUrl = async (url) => {
  // Checking if the link is supported for links with custom URL scheme.
//   console.log(url)
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

// const googleMapsURL = 'https://maps.app.goo.gl/9kmKZVZVpXbZhXMv9';

// Extract the latitude and longitude from the URL
// const match = googleMapsURL.match(/@([0-9.-]+),([0-9.-]+)/);

// if (match) {
//   const latitude = parseFloat(match[1]);
//   const longitude = parseFloat(match[2]);
//   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
// } else {
//   console.error('Latitude and longitude not found in the URL.');
// }

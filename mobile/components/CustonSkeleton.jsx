import React from 'react'; 
import { View, StyleSheet } from 'react-native'; 
  
const CustomSkeleton = () => { 
    return ( 
        <View style={styles.container}> 
            {/* Placeholder card content */} 
            <View style={styles.placeholder} /> 
            <View style={styles.placeholder} /> 
            <View style={styles.placeholder} /> 
        </View> 
    ); 

};

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: '#F6F6F6', 
        borderRadius: 13, 
        padding: 16, 
        marginBottom: 6, 
        marginTop: 10, 
    }, 
    placeholder: { 
        backgroundColor: '#ccc', 
        height: 16, 
        borderRadius: 4, 
        marginBottom: 8, 
    }, 
})


export default CustomSkeleton
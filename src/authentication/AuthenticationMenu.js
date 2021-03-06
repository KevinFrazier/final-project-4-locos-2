import React, {useState} from 'react'
import { Alert, StyleSheet, View, ScrollView, KeyboardAvoidingView, Button, Text } from 'react-native'
import AuthLayout from './component/utilites/InputLayout'
import * as firebase from 'firebase'
import {Image} from 'react-native'
import Colors from '../constants/Colors'

const AuthenticationMenu = props => {
    
    return (
     <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={{height: 5}}></View>
      <Image 
          source={require('../../assets/StuddyBuddyLogo.png')}  
          style={{width: 300, height: 300}} 
      />
      <AuthLayout style={styles.LoginContainer}>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Login" onPress={() => props.navigation.navigate('Login')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Sign Up" onPress={() => props.navigation.navigate('SignUp')} />
          </View>
        </ScrollView>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center'
    },
    LoginContainer: {
      width: '60%',
      padding: 20,
      marginTop:50,
      backgroundColor:'#feccc1',
      borderWidth:5,
      borderColor:'pink'

    },
    buttonContainer: {
      marginTop: 10,
      borderWidth:3,
      backgroundColor:'white'
    },
    button:{
      borderWidth:3,
      borderColor: Colors.darkGreyColor,
      
    },
    buttonText:{
      color: Colors.deepPurpleColor,
      fontWeight: "bold",
    },
    Header: {
      width:"90%",
      alignContent:'center',
      textAlign:'center',
      fontSize: 40,
      marginTop: 10,
      marginBottom: 10,
      padding: 30,
      fontWeight:"bold",
      backgroundColor:"#feccc1"

    },
    lines:{
      width:"99%",

      backgroundColor:'#feccc1',
      padding:3,
    }
  });

export default AuthenticationMenu
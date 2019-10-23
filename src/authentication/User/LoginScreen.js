import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Button, Text } from 'react-native'


import Input from '../component/utilites/Input'
import AuthLayout from '../components/utilites/InputLayout'
import * as authActions from '../store/Action/auth'



const Auth_INPUT = 'Auth_INPUT';

const authReducer = (currentState, action) => {
  if (action.type === Auth_INPUT) {
    const updatedValues = {
      ...currentState.inputValues,
      [action.input]: action.value
    };
    const updatedInputValidValue = {
      ...currentState.inputValidity,
      [action.input]: action.isValid
    };
    let updatedAuthIsValid = true;
    for (const key in updatedInputValidValue) {
      if(!updatedInputValidValue[key]){
        updatedAuthIsValid =  false
      }
    }
    return {
      authIsValid: updatedAuthIsValid,
      inputValidity: updatedInputValidValue,
      inputValues: updatedValues
    };
  }
  return state;
};


const LoginScreen = props => {

  const [authState, dispatchAuthState] = useReducer(authReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidity: {
      email: false,
      password: false
    },
    authIsValid: false
  });


  const loginHandler = () => {
    if (!authState.authIsValid) {
      alert("Error in Valid Form")
      return
    }
    authActions.login(
      authState.inputValues.email,
      authState.inputValues.password
    )
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchAuthState({
        type: Auth_INPUT,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchAuthState]
  );


  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Text style={styles.Header}>Login In</Text>
      <AuthLayout style={styles.LoginContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={loginHandler} />
          </View>
        </ScrollView>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginContainer: {
    width: '80%',
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  Header: {
    fontSize: 30,
    marginBottom: 20,
    padding: 10
  }
});

export default LoginScreen
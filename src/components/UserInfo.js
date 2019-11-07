import React, {Component} from 'react';
import {View, Text, Button, Platform, TouchableHighlight, StyleSheet} from 'react-native';
import t from 'tcomb-form-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#FFE9EC',
        padding: 25,
    },
    pageTitleText:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateInfoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#feccc1',
        borderWidth: 2,
        borderColor: "grey"
    },
    updateInfoButtonText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        color: '#505050',
    },
});

const Form = t.form.Form;

const UserI = t.struct({
    firstname: t.String,
    lastname: t.String,
    major: t.String,
    phonenum: t.maybe(t.String),
    shareInfo: t.Boolean
})

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
          marginBottom: 5
        },
        error: {
          marginBottom: 5
        }
    },
    controlLabel: {
      normal: {
        fontSize: 15,
        marginBottom: 5,
      },
      error: {
        color: 'red',
        fontSize: 15,
        marginBottom: 5,
      }
    },
    errorBlock: {
        fontSize: 12,
        marginBottom: 0,
        color: 'red',
    },
}

const formOptions = {
    fields: {
        firstname:{
            label: 'First Name',
            error: 'Please input a first name',
        },
        lastname:{
            label: 'Last Name',
            error: 'Please input a last name',
        },
        major:{
            label: 'Major',
            error: 'Please input a major name',
        },
        phonenum:{
            label: 'Phone Number',
        },
        shareInfo: {
            label: 'Share information with Workspace Owners?',
        },
    },
    stylesheet: formStyles,
  };

export default class UserInfo extends Component{

    constructor(props){
        super(props);
    
        this.state={
            info: null,
        }
    }

    handleSubmit = () => {
        const value = this._form.getValue();
        if(value){
            info = value
            alert("Your info has been updated, " + value.firstname + "!")
        }else{
            alert("Please correct the errors")
        }
        console.log('value: ', value);
    }
    //TODO:Update info into firebase
    updateFirebase = () => {
        if(this.state.info){
            //Constants to be updated into firebase
            const info = this.state.info
            const   firstname = info.firstname,
                    lastname = info.lastname,
                    major = info.major,
                    shareInfo = info.shareInfo
            if(info.phonenum) {phonenum = info.phonenum} else {phonenum = 0};
        }else{
            alert("Updating firebase with invalid info...")
        }
    }
    
    onPressUpdateInfoButton = () => {
        this.handleSubmit()
        if(this.state.info){
            this.updateFirebase()
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{height: 30}}>
                    <Text style={styles.pageTitleText}>Create Profile</Text>
                </View>
                <View style={{height: 40}}></View>
                <View style={{height: 400}}>
                    <Form 
                        ref={c => this._form = c}
                        type={UserI}
                        options={formOptions} />
                </View>
                <TouchableHighlight onPress={this.onPressUpdateInfoButton} underlayColor="white">    
                    <View style={styles.updateInfoButton}>
                        <Text style={styles.updateInfoButtonText}>Create</Text>
                    </View>
                </TouchableHighlight>
            </View>
          );
    }
}
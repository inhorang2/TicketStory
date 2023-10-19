// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { ButtonGroup } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ProgressView} from "@react-native-community/progress-view";

import Loader from './../components/Loader';
import { validateEmail, removeWhitespace } from "../util";
import ProgressBar from './ProgressBar';

const SecondRegisterScreen = (props) => {
  const [loading, setLoading] = useState(false); //
  const [errortext, setErrortext] = useState('');

  const [selectGender, setSelectGender] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  console.log('!!', selectedDate.toLocaleDateString());

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const { userEmail, userPassword } = props.route.params;
  const buttons = ['Male', 'Female'];

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSubmitButton = () => {
    setErrortext('');

    if (selectGender == -1) {
      alert('Choose gender');
      return;
    }

    //Show Loader
    setLoading(true);
    var dataToSend = {
      email: userEmail,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/ts.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>

          <View style={styles.SectionTwoStyle}>
            <ButtonGroup
              onPress={(index)=>
                setSelectGender(index)
              }
              selectedIndex={selectGender}
              buttons={buttons}
              containerStyle={{ height: 40 }}
              selectedButtonStyle={{
                // backgroundColor : '#0066CC'
                backgroundColor : 'black'
              }}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              underlineColorAndroid="#f000"
              onPressIn={showDatePicker}
              value={selectedDate.toLocaleDateString() === new Date().toLocaleDateString() ? '' : selectedDate.toLocaleDateString()}
              placeholder="Select your birthdate"
              placeholderTextColor="#8b9cb5"
              showSoftInputOnFocus={false}
              editable={false}
            />
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>

          {/* <View style={styles.ProgressStyle}>
            <ProgressView
              progressTintColor="orange"
              // trackTintColor="grey"
              progress={1}
            />
          </View> */}

          <ProgressBar progress={1} />

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};


export default SecondRegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'grey',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  SectionTwoStyle:{
    flexDirection: 'column',
    height: 20,
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 40,
  },
  ProgressStyle:{
    position: 'absolute',
    top:500,
    bottom:0,
    left:30, 
    right:30,
    // flexDirection: 'column',
    // height: 20,
    // marginTop: 30,
    // marginLeft: 25,
    // marginRight: 25,
    // marginBottom: 40,
  },
});
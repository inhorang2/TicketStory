// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import { getCredentials } from './../Credentials';


const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      //Check if jwt is set or not
      //If not then send for Authentication
      //else send to Home Screen

      // Call the function and await the result since it's asynchronous
      const fetchCredentials = async () => {
        try {
          const cred = await getCredentials();
          console.log('?',cred);
          navigation.replace(
            cred === null ? 'Auth' : 'DrawerNavigationRoutes'
          )
        } catch (e) {
          console.error(e);
        }
      };

      fetchCredentials();

    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/ts.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
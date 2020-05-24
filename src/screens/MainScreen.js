import React, {useState, useRef} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import {Joke, EmailList, TheVenturyButton, LoadingModal} from '../components';

const MainScreen = () => {
  const [joke, setJoke] = useState();
  const [emailsList, setEmailsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const emailListRef = useRef(null);

  const handleOnNewJoke = joke => setJoke(joke);
  
  const handleOnListUpdate = emails => setEmailsList(emails);

  const handleOnSortPress = () => emailListRef.current.sort();

  const handleOnSendPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Congratulations', 'Joke succesfully sent!');
    }, 2000);
  };

  // Code for sending the request to an external send emails API

  //   const handleOnSendPress = async () => {
  //     try {
  //       const response = await fetch(EMAIL_API_URL, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json;charset=UTF-8',
  //         },
  //         body: JSON.stringify({
  //           joke: joke,
  //           emails: emailsList,
  //         }),
  //       });
  //       jsonResponse = await response.json();
  //       if (response.ok) {
  //         setIsLoading(false);
  //         Alert.alert('Congratulations', 'Joke succesfully sent!');
  //       } else {
  //         setIsLoading(false);
  //         Alert.alert('Error', 'There was a problem');
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       Alert.alert('Error', error.message);
  //     }
  //   };

  return (
    <>
      <View>
        <Image
          source={require('../assets/images/chuck-norris.png')}
          style={styles.image}
        />
        <Joke onNewJoke={joke => handleOnNewJoke(joke)} />
        <EmailList
          ref={emailListRef}
          onListUpdate={emails => handleOnListUpdate(emails)}
        />
        <TheVenturyButton
          title={'SORT'}
          onPress={handleOnSortPress}
          disabled={emailsList.length < 2}
        />
        <TheVenturyButton
          title={'SEND'}
          onPress={handleOnSendPress}
          color={'#8d3d6e'}
          disabled={emailsList.length === 0}
        />
      </View>
      {isLoading && <LoadingModal />}
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

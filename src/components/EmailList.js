import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import validateEmail from '../util/validateEmail';
import sortEmails from '../util/sortEmails';

const EmailAddressInput = forwardRef(({onListUpdate = () => {}}, ref) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [emailList, setEmailList] = useState([]);
  //const textInputRef = useRef(null);

  useEffect(() => {
    onListUpdate(emailList);
    //textInputRef.current.clear();
    setEmail('');
  }, [emailList]);

  const handleOnChangeText = text => {
    setEmail(text);
    setIsValid(true);
    setIsAlreadySubmitted(false);
  };

  const addEmailToList = () => {
    if (validateEmail(email) && !emailList.includes(email)) {
      setEmailList(emailList => emailList.concat(email));
    } else if (!validateEmail(email)) {
      setIsValid(false);
    } else {
      setIsAlreadySubmitted(true);
    }
  };

  const removeEmailFromList = email =>
    setEmailList(list =>
      list.filter(existing_email => existing_email != email),
    );

  const sort = () => setEmailList(emailList => sortEmails(emailList));

  useImperativeHandle(ref, () => {
    return {
      sort: sort,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMAIL LIST</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          //ref={textInputRef}
          style={styles.emailInput}
          onChangeText={text => handleOnChangeText(text)}
          onSubmitEditing={addEmailToList}
          placeholder={'Enter email address...'}
          value={email}
          autoFocus={false}
          keyboardType={'email-address'}
        />
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={addEmailToList}>
          <Image
            source={require('../assets/icons/plus.png')}
            style={styles.addButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.errorContainer}>
        {!isValid && email.length > 0 ? (
          <Text style={styles.errorMessage}>Invalid email</Text>
        ) : null}
        {isAlreadySubmitted && email.length > 0 ? (
          <Text style={styles.errorMessage}>Already submitted</Text>
        ) : null}
      </View>
      <View
        style={[
          styles.listContainer,
          {
            height:
              useWindowDimensions().height - 120 - 131 - 40 - 20 - 110 - 90,
          },
        ]}>
        <ScrollView>
          {emailList.length == 0 ? (
            <Text style={styles.addMessage}>
              Start adding email addresses one by one
            </Text>
          ) : (
            emailList.map((email, index) => (
              <View
                key={email}
                style={[
                  styles.listItem,
                  index & 1 && {backgroundColor: 'rgba(0, 0, 0, 0.03)'},
                ]}>
                <Text>{email}</Text>
                <TouchableOpacity
                  style={styles.removeItemContainer}
                  onPress={() => removeEmailFromList(email)}>
                  <Text style={styles.removeItemButton}>x</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
});

export default EmailAddressInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8d3d6e',
  },
  emailInputContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  emailInput: {
    left: -3,
  },
  addButtonContainer: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 24,
    height: 24,
    tintColor: '#8d3d6e',
  },
  divider: {
    height: 1,
    backgroundColor: '#e4e1cc',
    marginVertical: 0,
  },
  errorContainer: {
    height: 16,
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 13,
  },
  listContainer: {
    borderColor: '#8d3d6e',
    borderWidth: 1,
    borderRadius: 4,
  },
  addMessage: {
    alignSelf: 'center',
    color: '#a3a3a3',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    height: 30,
    alignItems: 'center',
  },
  removeItemContainer: {
    width: 30,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeItemButton: {
    color: 'red',
    fontSize: 16,
  },
});

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {JOKES_API_URL} from '../constants/jokes';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const Joke = ({onNewJoke = () => {}}) => {
  const [joke, setJoke] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getJoke();
  }, []);

  useEffect(() => {
    onNewJoke(joke);
  }, [joke]);

  const getJoke = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(JOKES_API_URL);
      if (res.ok) {
        const json = await res.json();
        if (json.type === 'success') {
          setJoke(entities.decode(json.value.joke));
          setIsLoading(false);
        } else {
          alert(`There was an error while getting your joke:${json.type}`);
          setIsLoading(false);
        }
      } else {
        alert(`There was an error while getting your joke:${res.status}`);
        setIsLoading(false);
      }
    } catch (error) {
      alert(`There was an error while getting your joke:${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>JOKE</Text>
        <TouchableOpacity onPress={getJoke}>
          <Image
            source={require('../assets/icons/refresh.png')}
            style={styles.refreshIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.jokeContainer}>
        {isLoading ? <ActivityIndicator /> : <Text>{joke}</Text>}
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default Joke;

const styles = StyleSheet.create({
  container: {
    //top: 20,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8d3d6e',
  },
  refreshIcon: {
    height: 24,
    width: 24,
    tintColor: '#8d3d6e',
    right: 7,
  },
  jokeContainer: {
    height: 80,
  },
  divider: {
    height: 1,
    backgroundColor: '#e4e1cc',
  },
});

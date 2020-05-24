import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TheVenturyButton = ({
  title = 'Press me',
  disabled = false,
  color = '#46bac2',
  onPress = () => {},
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          disabled
            ? styles.disabled
            : [styles.enabled, {backgroundColor: color}]
        }
        onPress={onPress}>
        <Text style={disabled ? styles.titleDisabled : styles.titleEnabled}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TheVenturyButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  enabled: {
    height: '100%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    height: '100%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e7ebfa',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#f1f2f5',
  },
  titleEnabled: {
    color: 'white',
    fontSize: 18,
  },
  titleDisabled: {
    color: '#6b6b6b',
    fontSize: 18,
  },
});

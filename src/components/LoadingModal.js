import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingModal = ({visible = false}) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator color={'#040d40'} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
});

// components/ViewHistoryButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ViewHistoryButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Feather name="map" size={20} color="#fff" />
    <Text style={styles.text}>Xem lịch sử</Text>
  </TouchableOpacity>
);

export default ViewHistoryButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#28B463',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 2,
  },
  text: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 16,
  },
});

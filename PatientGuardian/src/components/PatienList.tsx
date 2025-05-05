import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PatientList = ({ patients, onPressItem }) => {
  console.log('Received patients:', patients);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPressItem(item)}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detail}>Last update: {item.lastUpdate}</Text>
          <Text style={styles.detail}>Heart Rate: {item.heartRate} bpm</Text>
        </View>
        <View style={[
          styles.status,
          { backgroundColor: item.status === 'critical' ? 'red' : 'green' }
        ]}/>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={patients}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    margin: 8,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    color: '#666',
    fontSize: 14,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default PatientList;

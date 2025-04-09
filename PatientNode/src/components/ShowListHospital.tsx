import { Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";
import {fetchNearbyHospitalsOSM} from '../services/APIGetDataOSM';

const ShowListHospital = ({location}) => {
    const [listHospital, setListHospital] = useState([]);

    useEffect(()=>{
        const fetchHospitals = async () => {
            try {
              const hospitals = await fetchNearbyHospitalsOSM(location.latitude, location.longitude);
              setListHospital(hospitals); // Cập nhật danh sách bệnh viện vào state
            } catch (error) {
              console.error('Error fetching hospitals:', error);
            }
          };
          fetchHospitals();
    },[location]);
  return (
    <View>
      <Text>Danh sách bệnh viện gần đây:</Text>
      <FlatList
        data={listHospital}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Vĩ độ: {item.lat}</Text>
            <Text>Kinh độ: {item.lon}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default ShowListHospital

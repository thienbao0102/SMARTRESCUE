import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthMetrics = ({ heartRate, spo2, bloodPressure }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các chỉ số cơ thể</Text>
      {/*  nhip tim */}
      <View style={styles.metricRow}>
        <Text style={styles.label}>Nhịp tim: </Text>
        <Text style={heartRate > 100 ? styles.warning : styles.normal}>
          {heartRate} bpm
        </Text>
      </View>
      {/* spO2spO2 đo tỷ lệ phần trăm các phân tử hemoglobin trong máu có gắn oxy. */}
      <View style={styles.metricRow}>
        <Text style={styles.label}>SpO2:</Text>
        <Text style={spo2 < 95 ? styles.warning : styles.normal}>
          {spo2}%
        </Text>
      </View>
      {/*  huyet ap */}
      <View style={styles.metricRow}>
        <Text style={styles.label}>Huyết áp:</Text>
        <Text style={styles.normal}>
          {bloodPressure || '--/--'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
  },
  warning: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  normal: {
    color: 'green',
    fontSize: 16,
  },
});

export default HealthMetrics;

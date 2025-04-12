import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

const AccidentAlertScreen = () => {
  const handleYes = () => {
    Alert.alert('Đã ghi nhận', 'Chúng tôi sẽ gửi trợ giúp ngay lập tức!')
  }

  const handleNo = () => {
    Alert.alert('Cảm ơn bạn', 'Chúc bạn một ngày an toàn!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>🚨 Cảnh Báo!</Text>
        <Text style={styles.alertMessage}>
          Bạn có đang gặp tai nạn không?
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonYes]} onPress={handleYes}>
            <Text style={styles.buttonText}>Có</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonNo]} onPress={handleNo}>
            <Text style={styles.buttonText}>Không</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AccidentAlertScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  alertBox: {
    backgroundColor: '#FFE3E3',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: '100%',
  },
  alertTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 15,
  },
  alertMessage: {
    fontSize: 18,
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonYes: {
    backgroundColor: '#D32F2F',
  },
  buttonNo: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

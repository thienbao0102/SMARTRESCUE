import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AdminHeader = ({
  title,
  notificationCount = 0,
  onNotificationPress,
  onBackPress,
  iconName = 'bell',
  showBackButton = false
}) => {
  return (
    <LinearGradient
      colors={['#3A7BD5', '#00D2FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.title,
            showBackButton && { marginLeft: -40 }
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>


        <TouchableOpacity
          style={styles.actionButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Feather name={iconName} size={24} color="#ffffff" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3A7BD5',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 4,
  },
});

export default AdminHeader;
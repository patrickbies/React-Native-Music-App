import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useLoading } from '@/context/LoadingContext';

const LoadingOverlay = () => {
  const { loading } = useLoading();

  return (
    <Modal visible={loading} transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#4c68d7" />
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

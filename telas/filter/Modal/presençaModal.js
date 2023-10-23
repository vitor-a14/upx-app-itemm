import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';

export function Popup() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [popupResponse, setPopupResponse] = useState(null);

  const handleClose = (response) => {
    setPopupResponse(response);
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <Text>Este é um pop-up com uma pergunta.</Text>
          <Button title="Sim" onPress={() => handleClose(true)} />
          <Button title="Não" onPress={() => handleClose(false)} />
        </View>
      </View>
    </Modal>
  );
}
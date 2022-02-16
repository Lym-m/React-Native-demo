import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';
import storage from "../utils/storage";
import {StackActions, useNavigation} from '@react-navigation/native';

const Loading = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    try {
      storage
        .load({
          key: 'token',
          autoSync: true,
          syncInBackground: true,
        })
        .then(ret => {
          if (ret.length) {
            setModalVisible(true);
            navigation.dispatch(
              StackActions.replace('主页')
            );
          }
        })
        .catch(error => {
          return false;
        });
    } catch (e) {
      setModalVisible(false);
      storage.remove({
        key: 'token'
      });
      props.getLoadData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          storage.remove({
            key: 'token'
          });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator
              size={"large"}
              color={"blue"}
              animating={true}
            />
            <Text style={styles.modalText}>跳转中，请稍等！</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 50,
    width: width,
    height: height,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Loading;

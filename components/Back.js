import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HttpUtils from '../utils/myFetch';
import Toast from './Toast';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  backWrap: {
    width: width,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Back = props => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressChange = () => {
    if (props.type && props.id) {
      Alert.alert('提示', '确定要删除吗？', [
        {text: '取消', onPress: cancel},
        {text: '确定', onPress: ensure},
      ]);
    }
  };

  const cancel = () => {
    console.log('取消');
  };

  const ensure = () => {
    const param = {
      collectTime: props.time,
      collectPointNo: props.type,
      wellId: props.id,
    };
    HttpUtils(
      '/well-admin/api/v1/well/deleteWellCollectingPoint',
      'POST',
      'app-data-input',
      param,
    )
      .then(res => {
        if (res) {
          if (res.resultCode === '000000') {
            Toast.showInfo('删除成功');
            navigation.goBack();
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <View style={styles.backWrap}>
        <TouchableWithoutFeedback onPress={goBack}>
          <View style={styles.back}>
            <Image
              style={{
                width: 15,
                height: 15,
                alignSelf: 'center',
                marginRight: 10,
              }}
              source={require('../public/image/back.png')}
            />
            {!props.title && <Text>返回</Text>}
          </View>
        </TouchableWithoutFeedback>
        <View>
          {props.title && <Text style={styles.title}>{props.title}</Text>}
        </View>
        <View>
          {props.type && props.id && (
            <TouchableWithoutFeedback
              style={{marginRight: 10}}
              onPress={onPressChange}>
              <Text>删除</Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
};

export default Back;

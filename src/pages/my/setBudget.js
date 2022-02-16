import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {geyCurrentMonth} from '../../../utils/util';
import Toast from '../../../components/Toast';
import HttpUtils from '../../../utils/myFetch';

const Detail = props => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const data = props.route.params.data;

  const goBack = () => {
    navigation.goBack();
  };

  const complete = () => {
    if (!value) {
      Toast.showInfo('请先设置金额！');
      return false;
    }
    const param = {
      userId: data,
      date: geyCurrentMonth(),
      budgetNumber: value,
    };
    HttpUtils('/api/bill/setBudget', 'POST', param)
      .then(res => {
        if (res.code === '0') {
          Toast.showInfo('设置成功！');
          navigation.goBack();
          props.route.params.refresh();
        } else {
          Toast.showInfo(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableWithoutFeedback onPress={goBack}>
          <Text>取消</Text>
        </TouchableWithoutFeedback>
        <Text>设置预算</Text>
        <TouchableHighlight style={{borderRadius: 3}} onPress={complete}>
          <View style={styles.completeBtn}>
            <Text>完成</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <TextInput
          style={{height: 40, backgroundColor: '#ffffff'}}
          onChangeText={text => setValue(text)}
          autoFocus={true}
          value={value}
          keyboardType={'numeric'}
        />
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 0,
    backgroundColor: '#F7F7F6',
    zIndex: 100,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  backLogo: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  completeBtn: {
    backgroundColor: '#87CEEB',
    height: 30,
    width: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});

export default Detail;

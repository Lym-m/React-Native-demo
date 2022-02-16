import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Picker from 'react-native-picker';
import {getAllDate, getCurrentDate} from '../utils/util';
import storage from '../utils/storage';
import HttpUtils from '../utils/myFetch';
import Toast from './Toast';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const reg = /^([+-]?\d+\.?\d*)*[+-.]$/;
const CustomAlertDialog = props => {
  const navigation = useNavigation();
  console.log(props);
  const [isVisible, setIsVisible] = useState(props.show);
  const [remark, setRemark] = useState('');
  const [dateVal, setDateVal] = useState(getCurrentDate());
  const [dateData, setDateData] = useState(getAllDate());
  const [costNumber, setCostNumber] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsVisible(props.show);
  }, [props.show]);

  useEffect(() => {
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(res => {
        setUser(res);
      });
  }, []);

  const showPicker = () => {
    const dateStr = dateVal;
    const year = dateStr.substring(0, 4);
    const month = parseInt(dateStr.substring(5, 7));
    const day = parseInt(dateStr.substring(8, 10));
    Picker.init({
      pickerTitleText: '请选择日期',
      pickerCancelBtnText: '取消',
      pickerConfirmBtnText: '确定',
      selectedValue: [year + '年', month + '月', day + '日'],
      pickerBg: [255, 255, 255, 1],
      pickerData: dateData,
      pickerFontColor: [33, 33, 33, 1],
      onPickerConfirm: (pickValue, pickIdx) => {
        const yearVal = pickValue[0].substring(0, pickValue[0].length - 1);
        let monthVal = pickValue[1].substring(0, pickValue[1].length - 1);
        monthVal = monthVal.padStart(2, '0');
        let dayVal = pickValue[2].substring(0, pickValue[2].length - 1);
        dayVal = dayVal.padStart(2, '0');
        setDateVal(yearVal + '-' + monthVal + '-' + dayVal);
      },
    });
    Picker.show();
  };

  const closeModal = () => {
    setIsVisible(false);
    props.closeModal(false);
  };

  const save = () => {
    const param = {
      userId: user.id,
      type: props.type,
      typeName: props.typeName,
      time: dateVal,
      value: costNumber.toString().replace(/,/g, ''),
      remark: remark,
    };
    HttpUtils('/api/bill/create', 'POST', param)
      .then(res => {
        if (res.code === '0') {
          props.closeModal(false);
          navigation.navigate('总览');
        } else {
          Toast.showInfo(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderDialog = () => {
    return (
      <ScrollView style={styles.modalStyle}>
        <View style={styles.optArea}>
          <View style={styles.inputWrap}>
            <View style={styles.inputContent}>
              <Image
                style={styles.logo}
                source={require('../public/image/remark.png')}
              />
              <Text style={{paddingRight: 3}}>备注:</Text>
              <TextInput
                style={{height: 40, width: 120}}
                placeholder="点击书写备注..."
                onChangeText={text => setRemark(text)}
                value={remark}
              />
            </View>
            {costNumber.length === 0 && (
              <Text style={styles.moneyNumber}>0</Text>
            )}
            {costNumber.length !== 0 && (
              <Text style={styles.moneyNumber}>
                {costNumber.toString().replace(/,/g, '')}
              </Text>
            )}
          </View>
          <View style={styles.keyboard}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('7'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>7</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('8'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>8</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('9'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>9</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                showPicker();
              }}>
              <View style={styles.keyboardItem}>
                <Text>{getCurrentDate() === dateVal ? '今天' : dateVal}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('4'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>4</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('5'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>5</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('6'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>6</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                const str = costNumber.toString().replace(/,/g, '');
                if (costNumber.length > 0 && reg.test(str + '+')) {
                  setCostNumber(costNumber.concat('+'));
                }
              }}>
              <View style={styles.keyboardItem}>
                <Text>+</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('1'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>1</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('2'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>2</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('3'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>3</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                const str = costNumber.toString().replace(/,/g, '');
                if (costNumber.length > 0 && reg.test(str + '-')) {
                  setCostNumber(costNumber.concat('-'));
                }
              }}>
              <View style={styles.keyboardItem}>
                <Text>-</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                const str = costNumber.toString().replace(/,/g, '');
                if (costNumber.length > 0 && reg.test(str + '.')) {
                  setCostNumber(costNumber.concat('.'));
                }
              }}>
              <View style={styles.keyboardItem}>
                <Text>.</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setCostNumber(costNumber.concat('0'));
              }}>
              <View style={styles.keyboardItem}>
                <Text>0</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (costNumber.length > 0) {
                  setCostNumber(costNumber.slice(0, costNumber.length - 1));
                }
              }}>
              <View style={styles.keyboardItem}>
                <Text>删除</Text>
              </View>
            </TouchableWithoutFeedback>
            {(costNumber.includes('+') || costNumber.includes('-')) && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.keyboardItem}>
                  <Text>=</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {!costNumber.includes('+') && !costNumber.includes('-') && (
              <TouchableWithoutFeedback onPress={save}>
                <View style={styles.keyboardItem}>
                  <Text>完成</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        transparent={true}
        visible={isVisible}
        animationType={'fade'}
        onRequestClose={() => closeModal()}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => closeModal()}>
          {renderDialog()}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  optArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 12,
  },
  inputWrap: {
    width: width,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  moneyNumber: {
    fontSize: 25,
  },
  keyboard: {
    height: 270,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  keyboardItem: {
    height: 70,
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#DCDCDC',
  },
});

export default CustomAlertDialog;

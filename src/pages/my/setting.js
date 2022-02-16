import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import DialogSelected from '../../../components/SelectPopup';
import Back from '../../../components/Back';
import CustomButton from '../../../components/Btn';
import storage from "../../../utils/storage";

const selectedArr = ['确定'];
const Detail = () => {
  const navigation = useNavigation();
  const logoutRef = useRef();

  const showAlertSelected = () => {
    logoutRef.current.show(
      '确定要退出登录吗？',
      selectedArr,
      'red',
      callbackSelected,
    );
  };
  const callbackSelected = i => {
    if (i === 0) {
      storage.remove({
        key: 'token'
      });
      navigation.dispatch(
        StackActions.replace('登录')
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Back title="设置" />
      <View style={styles.listContent}>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/notice.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>
                  新消息通知
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.listContent}>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/clean.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>
                  清除缓存
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/opinion.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>
                  意见反馈
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/help.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>帮助</Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/privacy.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>
                  隐私协议
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <View style={styles.itemWrap}>
              <View style={styles.iconWrap}>
                <Image
                  style={styles.logo}
                  source={require('../../../public/image/about.png')}
                />
                <Text style={{fontSize: 12, textAlign: 'center'}}>
                  关于我们
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={require('../../../public/image/right.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.footer}>
        <CustomButton
          text="切换账号"
          buttonColor="#ffffff"
          buttonRadius={5}
          buttonType="normal"
          textStyle={styles.btnText}
          style={styles.customButton}
          onPress={() => {
            showAlertSelected();
          }}
        />
        <CustomButton
          text="退出登录"
          buttonColor="#ffffff"
          buttonRadius={5}
          buttonType="normal"
          textStyle={styles.btnText}
          style={styles.customButton}
          onPress={() => {
            showAlertSelected();
          }}
        />
      </View>
      <DialogSelected ref={logoutRef} />
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
  listContent: {
    width: width,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  listItem: {
    width: '100%',
    height: 50,
    lineHeight: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.3,
    borderColor: '#DCDCDC',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  footer: {
    marginTop: 20,
  },
  btnText: {
    color: '#1E90FF',
  },
  customButton: {
    height: 40,
    marginBottom: 10,
  },
});

export default Detail;

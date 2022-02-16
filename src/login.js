import {Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import HttpUtils from '../utils/myFetch';
import Toast from '../components/Toast';
import storage from "../utils/storage";
import {useNavigation, StackActions} from '@react-navigation/native';

const Login = props => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (phone.length === 11 && password.length > 4) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [phone, password]);

  const handleSubmit = () => {
    const reg = /^[1][3,4 5,7,8,9][0-9]{9}$/;
    if (!reg.test(phone)) {
      Toast.showInfo('请输入正确的手机号！');
      return false;
    }
    HttpUtils('/api/system/login', 'POST', {
      account: phone,
      password: password,
    })
      .then(r => {
        if(r.code === '0') {
          console.log(r.data);
          Toast.showInfo('登陆成功！');
          storage.save({
            key: 'token',
            data: r.data.token,
            expires: null,
          });
          storage.save({
            key: 'userInfo',
            data: r.data,
            expires: null,
          });
          navigation.dispatch(
            StackActions.replace('主页')
          );
        } else {
          Toast.showInfo(r.message);
        }
      })
      .catch(error => {
        console.log("登录error" + error);
        Toast.showInfo(
          error === 'timeout promise' ? '请求超时，请重试' : '登录失败！',
        );
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>我的管家婆</Text>
      <TextInput
        style={{
          height: 40,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginBottom: 30,
        }}
        placeholder="手机号"
        onChangeText={text => setPhone(text)}
        value={phone}
        maxLength={11}
        keyboardType="numeric"
      />
      <TextInput
        style={{
          height: 40,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginBottom: 30,
        }}
        placeholder="密码"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Text
        style={{
          marginBottom: 50,
          textDecorationLine: 'underline',
          color: '#0a79fb',
        }}
        onPress={() => {
          props.navigation.navigate('GetCode', {phoneNum: phone});
        }}>
        忘记密码
      </Text>
      <Button title="登录" disabled={btnDisabled} onPress={handleSubmit}/>
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
    padding: 50,
  },
  title: {
    paddingVertical: '30%',
    textAlign: 'center',
    fontSize: 30,
    color: '#0a79fb',
  },
});

export default Login;

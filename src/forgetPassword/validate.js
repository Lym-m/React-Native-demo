import React, {Component, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import VerifyCodeInput from '../../components/VerifyCodeInput';
import useCountdown from '../../hooks/use-countdown';
import Back from '../../components/Back';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    padding: 10,
  },
  title: {
    paddingTop: 50,
    textAlign: 'left',
    fontSize: 22,
    color: '#000000',
  },
});

const Validate = props => {
  let verifyCode = null;
  const {isStart, second, startCountdown} = useCountdown(59);
  const onChangeVerifyCode = text => {
    if (text.length === 4) {
      props.navigation.navigate('重置密码');
    }
  };
  useEffect(() => {
    startCountdown();
  });
  return (
    <View style={styles.container}>
      <Back />
      <View style={styles.content}>
        <Text style={styles.title}>验证码已发送至手机：</Text>
        <Text style={{marginTop: 10, marginBottom: 50}}>15123539549</Text>
        <Text>请输入验证码</Text>
        <VerifyCodeInput
          ref={ref => {
            verifyCode = ref;
          }}
          verifyCodeLength={4}
          onChangeText={text => onChangeVerifyCode(text)}
        />
        <Text style={{textAlign: 'center', marginTop: 20}}>
          {isStart ? (
            <Text>{second}s后重新获取</Text>
          ) : (
            <Text
              style={{color: '#0d7bfb', textDecorationLine: 'underline'}}
              onPress={() => {
                console.log('获取验证码接口');
              }}>
              重新获取验证码
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};
export default Validate;

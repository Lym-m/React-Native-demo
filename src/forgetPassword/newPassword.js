import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
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
    height: '40%',
    paddingTop: 50,
    textAlign: 'left',
    fontSize: 25,
    color: '#000000',
  },
  tips: {
    marginBottom: 30,
    fontSize: 11,
    color: 'grey',
  },
  password: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Password = () => {
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {
    if (password.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [password]);
  const handleSubmit = () => {
    console.log('password:' + password);
  };
  const onPressChang = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <Back />
      <View style={styles.content}>
        <Text style={styles.title}>请设置密码</Text>
        <View style={styles.password}>
          <TextInput
            style={{
              width: '90%',
              height: 40,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
            placeholder="请输入密码"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={showPassword}
          />
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={onPressChang}>
            {showPassword ? (
              <Image
                style={{
                  width: 21,
                  height: 14,
                  alignSelf: 'center',
                  marginRight: 10,
                }}
                source={require('../../public/image/show.png')}
              />
            ) : (
              <Image
                style={{
                  width: 20,
                  height: 10,
                  alignSelf: 'center',
                  marginRight: 10,
                }}
                source={require('../../public/image/hide.png')}
              />
            )}
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.tips}>6-16个字符，包含字母和数字</Text>
        <Button title="确定" disabled={btnDisabled} onPress={handleSubmit} />
      </View>
    </View>
  );
};
export default Password;

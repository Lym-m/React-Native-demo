import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
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
  title: {
    height: '40%',
    paddingTop: 50,
    textAlign: 'left',
    fontSize: 25,
    color: '#000000',
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    padding: 15,
  },
});

const Code = props => {
  const [phone, setPhone] = useState(props.route.params.phoneNum);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (phone.length === 11) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [phone]);
  const handleSubmit = () => {
    props.navigation.navigate('验证验证码');
  };
  return (
    <View style={styles.container}>
      <Back />
      <View style={styles.content}>
        <Text style={styles.title}>输入手机号</Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 30,
          }}
          placeholder="请输入手机号"
          onChangeText={text => setPhone(text)}
          value={phone}
          maxLength={11}
          keyboardType="numeric"
        />
        <Button
          title="获取验证码"
          disabled={btnDisabled}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};
export default Code;

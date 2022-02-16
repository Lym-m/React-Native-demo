import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputView: {
    width: width * 0.5,
  },
  shortView: {
    width: width * 0.25,
  },
  longView: {
    width: width * 0.64
  },
  input: {
    fontSize: 14,
  },
  borderInput: {
    fontSize: 14,
    borderWidth: 0.6,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    flexGrow: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  errorInfoText: {
    color: 'red',
  },
});

class FromItem extends React.PureComponent {
  getError = error => {
    if (error) {
      return error.map(info => {
        return (
          <Text style={styles.errorInfoText} key={info}>
            {info}
          </Text>
        );
      });
    }
  };
  render() {
    const {label, onChange, value, error, placeholder, short, border, long, disabled} = this.props;
    return (
      <View style={short ? styles.shortView : long ? styles.longView : styles.inputView}>
        <View style={styles.wrap}>
          <TextInput
            style={border ? styles.borderInput : styles.input}
            value={value || ''}
            label={`${label}：`}
            editable={!disabled}
            placeholder={placeholder || '请输入'}
            duration={150}
            onChangeText={onChange}
            clearButtonMode="always"
          />
        </View>
        <View>{this.getError(error)}</View>
      </View>
    );
  }
}

export default FromItem;

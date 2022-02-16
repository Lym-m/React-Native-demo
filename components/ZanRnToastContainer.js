import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';
const DIMENSION = Dimensions.get('window');
const WINDOW_Height = DIMENSION.height;
export default class ToastContainer extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    showSuccess: PropTypes.bool,
    showFail: PropTypes.bool,
    showLoading: PropTypes.bool,
    showWarn: PropTypes.bool,
    message: PropTypes.string,
    destroy: PropTypes.func,
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.destroy();
    }, 1500);
  }

  render() {
    return (
      <Modal animationType={'fade'} transparent visible>
        <View
          style={
            this.props.showSuccess ||
            this.props.showFail ||
            this.props.showLoading ||
            this.props.showWarn
              ? styles.defaultStyle
              : styles.containerTextStyle
          }>
          <View style={styles.containerStyle}>
            {this.props.showSuccess ? (
              <Image
                style={styles.imageStyle}
                source={require('../public/image/success.png')}
              />
            ) : this.props.showFail ? (
              <Image
                style={styles.imageStyle}
                source={require('../public/image/error.png')}
              />
            ) : this.props.showLoading ? (
              <Image
                style={styles.imageStyle}
                source={require('../public/image/warning.png')}
              />
            ) : this.props.showWarn ? (
              <Image
                style={styles.imageStyle}
                source={require('../public/image/warning.png')}
              />
            ) : null}
            {this.props.showInfo ? (
              <Text style={styles.textStyle}>{this.props.message}</Text>
            ) : null}
          </View>
        </View>
      </Modal>
    );
  }
}
let styles = StyleSheet.create({
  defaultStyle: {
    marginTop: WINDOW_Height * 0.25,
    alignItems: 'center',
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextStyle: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  textStyle: {
    padding: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  imageStyle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

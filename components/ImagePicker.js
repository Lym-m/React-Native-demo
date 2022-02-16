import React, {Component} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
const ImagePicker = require('react-native-image-picker');

const {width} = Dimensions.get('window');
export default class CustomAlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.show,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isVisible: nextProps.show});
  }

  closeModal() {
    this.setState({
      isVisible: false,
    });
    this.props.closeModal(false);
  }

  //打开相机
  _launchCamera(){
    //配置选项
    const options = {
      cameraType: 'front',  //前置摄像头
      mediaType: 'photo'    //进行拍照
    };
    //回调数据
    ImagePicker.launchCamera(options, (response => {
      this.props.callback(response);
    }))
  }

  //打开图库
  _launchImageLibrary(){
    //配置选项
    const options = { mediaType: 'photo', selectionLimit: 0 };
    //回调数据
    ImagePicker.launchImageLibrary(options, (response => {
      this.props.callback(response);
    }))
  }

  renderDialog() {
    return (
      <ScrollView style={styles.modalStyle}>
        <View style={styles.optArea}>
          <TouchableOpacity
            onPress={this._launchCamera.bind(this)}
            style={styles.item}>
            <Text style={styles.itemText}>拍照</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._launchImageLibrary.bind(this)}
            style={styles.item}>
            <Text style={styles.itemText}>相册图片</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          transparent={true}
          visible={this.state.isVisible}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => this.closeModal()}>
            {this.renderDialog()}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

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
    marginTop: 12,
    marginBottom: 12,
  },
  item: {
    width: width,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F6',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  cancel: {
    width: width,
    height: 30,
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ModalContain} from '../components/PickerContain';
import {ParallelPicker, CascadePicker} from "react-native-slidepicker";

const specData = require('./testfiles/spec_cn.json');

const oneData = require('./testfiles/one.json');
const threeData = require('./testfiles/area.json');

export default class PickerDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {showType: ''};
  }

  close = () => this.setState({showType: ''});

  showData = (arr) => {
    this.setState({showType: ''});
    console.info('arr', arr);
  };

  setOnePickerRef = (ref) => (this.oneRef = ref);

  showOneData = () => {
    const data = this.oneRef.getResult();
    console.info('data', data);
    this.setState({showType: ''});
  };

  render() {
    return (
      <View style={styles.page}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({showType: 'spec'})}>
          {/* <Text style={{fontSize: 20}}>Demo1(ParallelPicker)</Text> */}
          <Text style={{fontSize: 20}}>示例1 (ParallelPicker)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {marginTop: 20}]}
          onPress={() => this.setState({showType: 'one'})}>
          <Text style={{fontSize: 20}}>示例2 (ParallelPicker)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {marginTop: 20}]}
          onPress={() => this.setState({showType: 'three'})}>
          <Text style={{fontSize: 20}}>示例3 (CascadePicker)</Text>
        </TouchableOpacity>

        {/* color size */}
        <ModalContain isModalShow={this.state.showType === 'spec'}>
          <ParallelPicker
            dataSource={specData}
            confirm={this.showData}
            cancel={this.close}
            defaultValueIndexes={[3, 1]}
            onceChange={(arr) => {
              console.info('once', arr);
            }}
            pickerDeep={1}
            // pickerStyle={
            //   {
            //     // itemHeight: 50,
            //     // visibleNum: 3,
            //     // // activeBgColor: '#a00',
            //     // // activeBgOpacity: 0.5,
            //     // activeFontSize: 25,
            //     // activeFontColor: '#00F',
            //     // normalBgColor: '#a00',
            //     // normalBgOpacity: 1,
            //     // normalFontSize: 10,
            //     // normalFontColor: '#0a0',
            //   }
            // }
          />
        </ModalContain>

        <ModalContain isModalShow={this.state.showType === 'one'}>
          <ParallelPicker
            ref={this.setOnePickerRef}
            dataSource={oneData}
            confirm={this.showData}
            cancel={this.close}
            pickerDeep={1}
            pickerStyle={{
              visibleNum: 3,
              itemHeight: 60,
              activeFontColor: '#F52D3A',
              activeFontSize: 21,
              normalFontColor: '#ccc',
            }}
            customHead={
              <View style={styles.head}>
                <TouchableOpacity onPress={this.showOneData}>
                  <Text style={{fontSize: 18, color: '#0aa'}}>取消</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 18}}>Choose Animals</Text>
                <TouchableOpacity onPress={this.showOneData}>
                  <Text style={{fontSize: 18, color: '#0aa'}}>确定</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </ModalContain>

       {/* <ModalContain isModalShow={this.state.showType === 'three'}>
          <CascadePicker
            dataSource={threeData}
            confirm={this.showData}
            cancel={this.close}
            onceChange={(arr) => {
              console.info('once', arr);
            }}
            pickerDeep={3}
            pickerStyle={{
              itemHeight: 50,
              visibleNum: 5,
              activeBgColor: '#A00',
              activeBgOpacity: 0.5,
              activeFontSize: 19,
              activeFontColor: '#FFF',

              normalBgColor: '#999',
              normalBgOpacity: 1,
              normalFontSize: 13,
              normalFontColor: '#333',
            }}
            headOptions={{
              cancelText: '取消',
              confirmText: '确认',
              headHeight: 50,
              borderTopRadius: 10,
              backgroundColor: '#444',
              confirmStyle: {fontSize: 20, color: '#fff', fontWeight: 'bold'},
              cancelStyle: {color: '#fff'},
            }}
          />
        </ModalContain>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    zIndex: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  head: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

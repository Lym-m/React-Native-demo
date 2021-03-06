import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

/*export class PickerContain extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.box}>
        <View
          underlayColor={'#888'}
          style={{flex: 1, zIndex: 12, backgroundColor: '#000', opacity: 0.3}}
          activeOpacity={1}
        />
        {this.props.children}
      </View>
    );
  }
}*/

export const ModalContain = React.memo(({isModalShow, children}) => {
  return (
    <Modal
      coverScreen={false}
      backdropColor={'#000'}
      backdropOpacity={0.6}
      backdropTransitionOutTiming={0}
      isVisible={isModalShow}
      style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}>
      {children}
    </Modal>
  );
});

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

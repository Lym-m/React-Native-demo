import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {imgMap, weekDay} from '../../../utils/common';

const Detail = props => {
  const navigation = useNavigation();
  const [detailData, setDetailData] = useState(props.route.params.detail);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableWithoutFeedback onPress={goBack}>
          <Image
            style={styles.backLogo}
            source={require('../../../public/image/back.png')}
          />
        </TouchableWithoutFeedback>
        <View style={styles.headMiddle}>
          <View style={styles.logWrap}>
            <Image
              style={styles.listIcon}
              source={imgMap.get(detailData.typeName)}
            />
          </View>
          <Text>{detailData.typeName}</Text>
        </View>
        <TouchableHighlight
          style={{borderRadius: 3, backgroundColor: '#87CEEB'}}
          underlayColor={{color: '#DCDCDC'}}
          onPress={() => {
            /*navigation.navigate(' ', {
              detail: detailData,
            });*/
          }}>
          <View style={styles.completeBtn}>
            <Text>编辑</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.main}>
        <View style={styles.listItem}>
          <Text style={styles.itemLabel}>类型</Text>
          <Text>{detailData.type === 1 ? '收入' : '支出'}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemLabel}>金额</Text>
          <Text>{detailData.value}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemLabel}>日期</Text>
          <Text>
            {detailData.date} {weekDay[new Date(detailData.date).getDay()]}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemLabel}>备注</Text>
          <Text>{detailData.remark}</Text>
        </View>
      </View>
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
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#87CEEB',
  },
  backLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 5,
  },
  headMiddle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  logWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(225,225,225, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  listIcon: {
    height: 25,
    width: 25,
  },
  completeBtn: {
    height: 30,
    width: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    lineHeight: 60,
    borderBottomWidth: 0.3,
    borderBottomColor: '#DCDCDC',
  },
  itemLabel: {
    color: '#808080',
    marginRight: 30,
  },
});

export default Detail;

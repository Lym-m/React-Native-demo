import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import Picker from 'react-native-picker';
import {getAllMonth, geyCurrentMonth, changeList} from '../../../utils/util';
import HttpUtils from '../../../utils/myFetch';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {weekDay} from '../../../utils/common';

const Detail = () => {
  const navigation = useNavigation();
  const [tableData, setTableData] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [detailData, setDetailData] = useState({
    income: '0.00',
    spend: '0.00',
  });
  const [date, setDate] = useState(geyCurrentMonth());
  const [dateData, setDateData] = useState(getAllMonth);

  const getList = () => {
    const param = {
      time: date,
      pageSize: pageSize,
      currentPage: 1,
    };
    HttpUtils('/api/bill/list', 'POST', param)
      .then(res => {
        if (res.code === '0' && res.data && res.data.list.length > 0) {
          const result = changeList(res.data.list);
          let [income, spend, num] = [0, 0, 0];
          result.forEach(item => {
            if (item.hasOwnProperty('income')) {
              income = income + item.income;
            }
            if (item.hasOwnProperty('spend')) {
              spend = spend + item.spend;
            }
            num = num + item.data.length;
          });
          const newObj = {...detailData};
          newObj.income = income;
          newObj.spend = spend;
          setDetailData(newObj);
          setTableData(result);
          if (num === res.data.total) {
            setIsEnd(true);
          } else {
            setIsEnd(false);
          }
        } else {
          setDetailData({
            income: '0.00',
            spend: '0.00',
          });
          setTableData([]);
          setIsEnd(false);
        }
        setRefreshing(false);
      })
      .catch(error => {
        setDetailData({
          income: '0.00',
          spend: '0.00',
        });
        setTableData([]);
        setIsEnd(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, date]),
  );

  const datePicker = () => {
    const dateStr = date;
    const year = dateStr.substring(0, 4);
    const month = parseInt(dateStr.substring(5, 7));
    Picker.init({
      pickerTitleText: '请选择日期',
      pickerCancelBtnText: '取消',
      pickerConfirmBtnText: '确定',
      selectedValue: [year + '年', month + '月'],
      pickerBg: [255, 255, 255, 1],
      pickerData: dateData,
      pickerFontColor: [33, 33, 33, 1],
      onPickerConfirm: (pickValue, pickIdx) => {
        const yearVal = pickValue[0].substring(0, pickValue[0].length - 1);
        let monthVal = pickValue[1].substring(0, pickValue[1].length - 1);
        monthVal = monthVal.padStart(2, '0');
        setDate(yearVal + '-' + monthVal);
      },
    });
    Picker.show();
  };

  const Item = ({items}) => (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('billDetail', {
            detail: items,
          });
        }}>
        <View style={styles.tableBody}>
          <View style={styles.bodyWrap}>
            <View style={styles.logWrap}>
              <Image style={styles.listIcon} source={items.uri} />
            </View>
            <Text>{items.typeName}</Text>
          </View>
          <Text>
            {items.type === 0 ? '- ' : ''}
            {items.value}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#87CEEB'}}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              width: '100%',
              fontSize: 20,
              paddingVertical: 20,
            }}>
            管家婆
          </Text>
        </View>
        <View style={styles.head}>
          <View style={{width: '20%', marginRight: '5%'}}>
            <Text style={{paddingVertical: 5, fontSize: 12, color: '#000000'}}>
              {date.split('-')[0]}年
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                datePicker();
              }}>
              <View
                style={{
                  borderRightWidth: 0.5,
                  borderRightColor: '#000000',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 18}}>{date.split('-')[1]}</Text>
                <Text style={{fontSize: 12}}>月</Text>
                <Image
                  style={{width: 16, height: 16, marginLeft: 7}}
                  source={require('../../../public/image/down.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.overview}>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 12, color: '#008000'}}>
                收入
              </Text>
              <Text style={{color: '#008000', fontSize: 18}}>
                {detailData.income}
              </Text>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 12, color: '#FF4500'}}>
                支出
              </Text>
              <Text style={{color: '#FF4500', fontSize: 18}}>
                {detailData.spend}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              //
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/bill.png')}
              />
              <Text style={{fontSize: 10}}>账单</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                detail: '',
              });
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/wallet.png')}
              />
              <Text style={{fontSize: 10}}>预算</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                detail: '',
              });
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/wallet.png')}
              />
              <Text style={{fontSize: 10}}>预算</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                detail: '',
              });
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/wallet.png')}
              />
              <Text style={{fontSize: 10}}>预算</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                detail: '',
              });
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/wallet.png')}
              />
              <Text style={{fontSize: 10}}>预算</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.main}>
        <SectionList
          stickySectionHeadersEnabled={true}
          progressViewOffset={50}
          sections={tableData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item items={item} />}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setPageSize(10);
            getList();
          }}
          ListFooterComponent={() =>
            isEnd && (
              <View style={styles.end}>
                <Text style={styles.endText}>没有更多了</Text>
              </View>
            )
          }
          ListEmptyComponent={() => (
            <View style={styles.noData}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../public/image/nodata.png')}
              />
              <Text style={styles.noDataText}>暂无数据</Text>
            </View>
          )}
          onEndReachedThreshold="0.1"
          onEndReached={() => {
            setPageSize(pageSize + 10);
          }}
          renderSectionHeader={({section: {date, spend, income}}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.headerText}>
                {date} {weekDay[new Date(date).getDay()]}
              </Text>
              <Text style={styles.headerText}>
                支出：{spend} {'  '} 收入：{income}
              </Text>
            </View>
          )}
        />
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
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  overview: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    marginTop: 10,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  listItem: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    lineHeight: 35,
    paddingHorizontal: 10,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
  main: {
    height: '73%',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  headerText: {
    fontSize: 12,
    color: '#808080',
  },
  tableBody: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#DCDCDC',
  },
  bodyWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logWrap: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(220,220,220, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listIcon: {
    height: 25,
    width: 25,
  },
  end: {
    alignItems: 'center',
    height: 20,
    padding: 2,
  },
  endText: {
    fontSize: 12,
    color: 'grey',
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    padding: 2,
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
  },
});

export default Detail;

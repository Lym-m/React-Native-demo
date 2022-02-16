import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import CircleProcess from '../../../components/CircleProcess';
import storage from '../../../utils/storage';
import HttpUtils from '../../../utils/myFetch';
import Toast from '../../../components/Toast';
import {geyCurrentMonth} from '../../../utils/util';

const Detail = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(geyCurrentMonth());
  const [user, setUser] = useState({});
  const [moneyDetail, setMoneyDetail] = useState({
    income: '0.00',
    spend: '0.00',
    remain: '0.00',
    budget: '0.00',
    remainBudget: '0.00',
  });

  useEffect(() => {
    getLocalUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocalUserInfo = () => {
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(res => {
        setUser(res);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      storage
        .load({
          key: 'userInfo',
          autoSync: true,
          syncInBackground: true,
        })
        .then(res => {
          getBudgetInfo(res.id);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const getBudgetInfo = userId => {
    const param = {
      userId: userId,
      date: geyCurrentMonth(),
    };
    HttpUtils('/api/bill/getBudget', 'POST', param)
      .then(res => {
        if (res.code === '0') {
          const newDetail = {...moneyDetail};
          newDetail.spend = res.data.spend;
          newDetail.budget = res.data.total;
          newDetail.income = res.data.income;
          newDetail.remain = Number(res.data.income) - Number(res.data.spend);
          newDetail.remainBudget =
            Number(res.data.total) - Number(res.data.spend);
          setMoneyDetail(newDetail);
        } else {
          Toast.showInfo(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.baseInfo}>
          <Image
            style={styles.headPhoto}
            source={require('../../../public/image/default.png')}
          />
          <Text>{user.name}</Text>
        </View>
        <View style={styles.recordInfo}>
          <View>
            <Text style={styles.recordText}>20</Text>
            <Text style={styles.recordText}>已连续打卡</Text>
          </View>
          <View>
            <Text style={styles.recordText}>20</Text>
            <Text style={styles.recordText}>记账总天数</Text>
          </View>
          <View>
            <Text style={styles.recordText}>200</Text>
            <Text style={styles.recordText}>记账总笔数</Text>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                refresh: () => {
                  // 刷新数据操作方法
                  getLocalUserInfo();
                }
              });
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/message.png')}
              />
              <Text style={styles.font10}>个人信息</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息');
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/passport.png')}
              />
              <Text style={styles.font10}>账号信息</Text>
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
                source={require('../../../public/image/tag.png')}
              />
              <Text style={styles.font10}>我的标签</Text>
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
                source={require('../../../public/image/badge.png')}
              />
              <Text style={styles.font10}>我的徽章</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.listItem}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('setting');
            }}>
            <View style={styles.itemWrap}>
              <Image
                style={styles.tinyLogo}
                source={require('../../../public/image/setting.png')}
              />
              <Text style={styles.font10}>设置</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.bill}>
        <View style={styles.billItem}>
          <Text>账单</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('个人信息', {
                detail: '',
              });
            }}>
            <Image
              style={styles.tinyLogo}
              source={require('../../../public/image/right.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.billDetail}>
          <View style={styles.billMonth}>
            <Text style={styles.font18}>{date.split('-')[1]}</Text>
            <Text style={[styles.font10, {marginLeft: 3}]}>月</Text>
          </View>
          <View style={styles.numbers}>
            <View style={styles.billNumber}>
              <Text style={[styles.font12, {color: '#A9A9A9'}]}>收入</Text>
              <Text>
                {Number.isInteger(moneyDetail.income)
                  ? moneyDetail.income + '.00'
                  : moneyDetail.income}
              </Text>
            </View>
            <View style={styles.billNumber}>
              <Text style={[styles.font12, {color: '#A9A9A9'}]}>支出</Text>
              <Text>
                {Number.isInteger(moneyDetail.spend)
                  ? moneyDetail.spend + '.00'
                  : moneyDetail.spend}
              </Text>
            </View>
            <View style={styles.billNumber}>
              <Text style={[styles.font12, {color: '#A9A9A9'}]}>结余</Text>
              <Text>
                {Number.isInteger(moneyDetail.remain)
                  ? moneyDetail.remain + '.00'
                  : moneyDetail.remain}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bill}>
        <View style={styles.budgetHead}>
          <Text>{date.split('-')[1]}月总预算</Text>
          <TouchableHighlight
            style={{borderRadius: 3}}
            onPress={() => {
              navigation.navigate('setBudget', {
                data: user.id,
                refresh: () => {
                  getBudgetInfo(user.id);
                },
              });
            }}>
            <View style={styles.budgetBtn}>
              <Text style={{fontSize: 12, textAlign: 'center'}}>
                {' '}
                + 设置预算
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.budgetDetail}>
          <View style={styles.budgetLeft}>
            {/*<CircleProcess
              key={'circle_process'}
              cost={Number(moneyDetail.spend)}
              remain={Number(moneyDetail.remainBudget)}
              tintColor={'#00FF00'}
              backgroundColor={'#A9A9A9'}
              textOne={'剩余'}
            />*/}
          </View>
          <View style={styles.budgetRight}>
            <View style={styles.budgetItem}>
              <Text style={[styles.font12, {color: '#000'}]}>本月预算:</Text>
              <Text style={[styles.font12, {color: '#000'}]}>
                {Number.isInteger(moneyDetail.budget)
                  ? moneyDetail.budget + '.00'
                  : moneyDetail.budget}
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={[styles.font12, {color: '#FF4500'}]}>本月支出:</Text>
              <Text style={[styles.font12, {color: '#FF4500'}]}>
                {Number.isInteger(moneyDetail.spend)
                  ? moneyDetail.spend + '.00'
                  : moneyDetail.spend}
              </Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={[styles.font12, {color: '#00FF00'}]}>剩余预算:</Text>
              <Text style={[styles.font12, {color: '#00FF00'}]}>
                {Number.isInteger(moneyDetail.remainBudget)
                  ? moneyDetail.remainBudget + '.00'
                  : moneyDetail.remainBudget}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.otherFunction}>
        <Text>常用功能</Text>
        <View style={styles.functionList}>
          <View style={styles.functionItem}>
            <TouchableHighlight style={styles.logoWrap}>
              <Image
                style={styles.functionLogo}
                source={require('../../../public/image/mortgage.png')}
              />
            </TouchableHighlight>
            <Text style={styles.font10}>房贷计算器</Text>
          </View>
          <View style={styles.functionItem}>
            <TouchableHighlight style={styles.logoWrap}>
              <Image
                style={styles.functionLogo2}
                source={require('../../../public/image/exchange.png')}
              />
            </TouchableHighlight>
            <Text style={styles.font10}>汇率换算器</Text>
          </View>
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
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#87CEEB',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  recordInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  recordText: {
    fontSize: 12,
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  listItem: {
    width: '22%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: 50,
    lineHeight: 50,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  bill: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  billItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    height: 30,
  },
  billMonth: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRightWidth: 0.3,
    borderRightColor: '#C0C0C0',
    paddingRight: 10,
    width: '15%',
  },
  numbers: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  billNumber: {
    display: 'flex',
    flexDirection: 'column',
  },
  budgetHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetBtn: {
    width: 75,
    backgroundColor: '#87CEEB',
    color: '#000000',
    borderRadius: 3,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLeft: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  budgetRight: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  budgetItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  otherFunction: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  functionList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  functionItem: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  functionLogo: {
    width: 32,
    height: 32,
  },
  functionLogo2: {
    width: 25,
    height: 25,
  },
  font18: {
    fontSize: 18,
  },
  font12: {
    fontSize: 12,
  },
  font10: {
    fontSize: 10,
  },
});

export default Detail;

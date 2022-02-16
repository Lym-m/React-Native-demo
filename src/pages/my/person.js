import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createForm} from 'rc-form';
import FormItem from '../../../components/FormItem';
import Back from '../../../components/Back';
import CustomAlertDialog from '../../../components/CustomAlertDialog';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DialogSelected from '../../../components/SelectPopup';
import storage from "../../../utils/storage";
import HttpUtils from '../../../utils/myFetch';
import Toast from "../../../components/Toast";
import {useNavigation} from "@react-navigation/native";

const selectedArr = ['拍照', '从相册选择'];
const typeArr = ['Boy', 'Girl'];
const Person = props => {
  const navigation = useNavigation();
  const {getFieldDecorator, getFieldError} = props.form;
  const [imgs, setImgs] = useState([]);
  const [typeName, setTypeName] = useState('请选择');
  const [showTypePop, setShowTypePop] = useState(false);
  const pictureRef = useRef();
  const [user, setUser] = useState({});

  useEffect(() => {
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(res => {
        console.log(res);
        setUser(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCommon = (value, callback) => {
    setTimeout(() => {
      if (!value) {
        callback();
      } else {
        callback();
      }
    }, 500);
  };

  const showAlertSelected = () => {
    pictureRef.current.show(
      '请选择图片',
      selectedArr,
      'blue',
      callbackSelected,
    );
  };
  const callbackSelected = i => {
    if (i === 0) {
      takePhoto();
    } else {
      addPhoto();
    }
  };
  const addPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1, // 1为一张，0不限制数量
        includeBase64: true,
      },
      res => {
        setImgs(res.assets);
      },
    );
  };
  const save = () => {
    const param = {
      id: user.id,
      name: props.form.getFieldsValue().userName,
      age: Number(props.form.getFieldsValue().age),
      address: props.form.getFieldsValue().address,
    };
    HttpUtils('/api/system/updateInfo', 'POST', param)
      .then(res => {
        if(res.code === '0'){
          const data = {...user};
          data.name = param.name;
          data.age = param.age;
          data.address = param.address;
          storage.save({
            key: 'userInfo',
            data: data,
            expires: null,
          });
          Toast.showInfo(res.message);
          navigation.goBack();
          props.route.params.refresh();
        } else {
          Toast.showInfo(res.message);
        }
      })
      .catch(err => {
        console.log("上传原件发生错误");
        console.log(err);
      });
    /*console.log(imgs[0].uri);
    const extension = imgs[0].fileName.substring(imgs[0].fileName.lastIndexOf(".") + 1);
    let param = new FormData();
    param.append('file', {
      uri: imgs[0].uri,
      type: 'multipart/form-data',
      name: `${user.phone}.${extension}`
    });
    HttpUtils('/api/system/upload', 'POST', param)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("上传原件发生错误");
        console.log(err);
      });*/
  };
  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        setImgs(res.assets);
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Back title="个人信息"/>
      <View style={styles.head}>
        <TouchableWithoutFeedback onPress={showAlertSelected}>
          <View>
            {imgs[0] && (
              <Image style={styles.headPhoto} source={{uri: imgs[0].uri}}/>
            )}
            {!imgs[0] && (
              <Image
                style={styles.headPhoto}
                source={require('../../../public/image/default.png')}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.content}>
        <View style={styles.formItem}>
          <Text style={styles.itemTitle}>昵称</Text>
          {getFieldDecorator('userName', {
            validateFirst: true,
            initialValue: String(user.name),
            rules: [
              {
                validator: (rule, value, callback) => {
                  checkCommon(value, callback);
                },
              },
            ],
          })(
            <FormItem
              autoFocus
              placeholder="请输入昵称"
              error={getFieldError('userName')}
            />,
          )}
        </View>
        <View style={styles.formItem}>
          <Text style={styles.itemTitle}>联系方式</Text>
          {getFieldDecorator('phone', {
            validateFirst: true,
            initialValue: String(user.phone),
            rules: [
              {
                validator: (rule, value, callback) => {
                  checkCommon(value, callback);
                },
              },
            ],
          })(
            <FormItem
              autoFocus
              disabled={true}
              placeholder="请输入"
              error={getFieldError('userName')}
            />,
          )}
        </View>
        <View style={styles.formItem}>
          <Text style={styles.itemTitle}>年龄</Text>
          {getFieldDecorator('age', {
            validateFirst: true,
            initialValue: String(user.age),
            rules: [
              {
                validator: (rule, value, callback) => {
                  checkCommon(value, callback);
                },
              },
            ],
          })(
            <FormItem
              autoFocus
              placeholder="请输入年龄"
              error={getFieldError('age')}
            />,
          )}
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowTypePop(!showTypePop);
          }}>
          <View style={styles.formItem}>
            <Text style={styles.itemTitle}>性别</Text>
            <Text
              style={{
                height: 40,
                lineHeight: 40,
                width: '81%',
                marginLeft: 2,
                color: typeName === '请选择' ? '#9b9a9a' : '#000',
              }}>
              {typeName}
            </Text>
            <Image
              style={styles.clearIcon}
              source={require('../../../public/image/right.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.formItem}>
          <Text style={styles.itemTitle}>家庭住址</Text>
          {getFieldDecorator('address', {
            validateFirst: true,
            initialValue: user.address,
            rules: [
              {
                validator: (rule, value, callback) => {
                  checkCommon(value, callback);
                },
              },
            ],
          })(
            <FormItem
              autoFocus
              placeholder="请输入家庭住址"
              error={getFieldError('address')}
            />,
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="保存"
          onPress={() => {
            save()
          }}
        />
      </View>
      <CustomAlertDialog
        entityList={typeArr}
        callback={i => {
          setTypeName(typeArr[i]);
        }}
        show={showTypePop}
        closeModal={show => {
          setShowTypePop(show);
        }}
      />
      <DialogSelected ref={pictureRef}/>
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
    backgroundColor: '#F7F7F6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headPhoto: {
    width: 80,
    height: 80,
    marginLeft: 30,
    borderRadius: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    width: width,
  },
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  itemTitle: {
    width: '16%',
    textAlign: 'left',
    color: '#3c3c3c',
  },
  itemIcon: {
    marginRight: 1,
    width: '13%',
  },
  clearIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
    marginTop: 2,
  },
  footer: {
    width: width,
    marginTop: 50,
  },
});

export default createForm()(Person);

import {BackHandler} from "react-native";
import Toast from "../components/Toast";
import {useEffect} from "react";

export default function () {
    let lastTime = 0;
    const backAction = () => {
        let time = Date.now();
        if (time - lastTime <= 2000) {
            BackHandler.exitApp();
            return false
        } else {
            Toast.showInfo('再按一次退出应用');
            lastTime = time;
            return true
        }
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
}

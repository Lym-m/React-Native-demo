import {CommonAction, StackActions} from "@react-navigation/native";

let navigator;
export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params) {
  navigator.dispatch(
      CommonActions.navigate({
        name,
        params
      })
  )
}

export function redirectTo(routeName) {
  navigator.dispatch(StackActions.replace(routeName))
}

export default {
  navigate,
  redirectTo,
  setTopLevelNavigator,
}

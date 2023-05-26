import { ShareIcon } from 'native-base'
import { useLayoutEffect } from 'react'
import WebView from 'react-native-webview'

const RecipeWebView = ({ navigation, route }) => {
  const { uri } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ShareIcon route={route} />
    })
    return () => {}
  }, [navigation])

  return <WebView source={{ uri }} />
}

export default RecipeWebView

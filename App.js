import { StatusBar } from 'expo-status-bar'
import RecipesContainer from './src/components/containers/RecipesContainer'
import { NativeBaseProvider } from 'native-base'
import Header from './src/components/layout/Header'
import AppStack from './src/components/stacks/AppStack'

const App = () => {
  return (
    <NativeBaseProvider>
      {/* <Header /> */}
      {/* <RecipesContainer /> */}
      <AppStack />
      <StatusBar style='auto' />
    </NativeBaseProvider>
  )
}

export default App

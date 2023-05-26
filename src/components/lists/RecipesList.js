import { FlatList } from 'native-base'
import RecipeCard from '../listItems/RecipeCard'

const RecipesList = props => {
  const { navigation, recipes } = props
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeCard
          image={item.image}
          label={item.label}
          source={item.source}
          uri={item.uri}
          navigation={navigation}
        />
      )}
    />
  )
}

export default RecipesList

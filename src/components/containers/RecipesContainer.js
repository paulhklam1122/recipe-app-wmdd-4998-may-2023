import { Center, Container } from 'native-base'
import Form from '../forms/Form'
import { useState } from 'react'
import { getRecipes } from '../../services/api'
import RecipesList from '../lists/RecipesList'
import Loading from '../layout/Loading'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/207/2074a28ff50eba58d79304c9296438a1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCM5Wis73TvS9BWXmwlFp83JrKo1IVbW%2BH5jGfxV2glhAIhAPv6Nk9rlvr2SbAUCdTkqhjJT%2BYu9dshE8tzAKTt6LliKrgFCCEQABoMMTg3MDE3MTUwOTg2Igzqk36L6CBxLRACsQQqlQUZCOtdf%2BTqRAEevubyhIKEC9sLExKcLli8%2BWrmUFv89flrQvtwNNYOAPkPnbSo%2BZc0j9S%2BcRvJqnU9zZR%2F0ZXOmjL5Cp7VfrZb1yzMPCeyCdDpXtFx4B6TcHaIeIkGcI6QHRIepKWalDEUYyHs7HwYED25ELkDAY41BCtUr57AvgyKXExUt%2Bdo9E0XAFvxLIHF7prmvEeLILMCAw6%2Bs7yrw5%2FDQJ%2FpPF%2F0HSDJMn71SdZ%2BynSy4Y9ch3OEzA3na%2FKvbl2sH7K9Iks0Gjdd1i1WmjnZwwMgLxBNzlc3u8p1P8bxfZMdHPxUvNSlJ8C4%2FLHJaSM8%2B42DQgBNe4kXIFTVFeejr0901NOSQopJwBMiYVbmWICXOZwpQZRo1FzcDR%2Fr0Bm6e5g5kW7N31q%2FIXfTG0lQrqFvZrka6cM%2Bn8p2kCmx%2FwER9u5hbuxolQafhAYmKAofJ61sX7Q%2F22QemJUwQtUP9jZHq47gHL3KimPLL7O3PlizPdeuRZVXtOo3lYpeIuJG4Q5cFlI9Na6HNBSAGS5WmhxGJmNWzJBb9hBL3WAf3Rlcf0tzBE8SVV3AgVAl4skpbpI1QnjMzPQW2bGB5VELBLN8%2BsZJvNo3fGvBGZwU1HtAOiOqfhpUlku6eIgcszWFYujyhsEe0oHeK6AK1x2%2B%2BWtXNjfzf51M9%2BwVkxKwE%2FHyf34JV45fWhfnJ2sHUgi7M%2BEsqj7vCoL1ybKKV%2BcrY%2F16zxNtq6gC5Y7a2168%2BtEb1RSPzlfxajt2LpofV27u2Si2PQ%2B60VjjBr7xii6UJ7YzI7ywhcyjAgvJxANOkAHIjYSWe%2BSoCajM1Shz%2Fjkfs4bvctJqNrsNsjl7eL5QlS%2Fqj8cnvO7gyd3pq%2FRIZXkKMIjvv6MGOrABLYe%2Boh%2FAW4%2BXv8rKaTNjbFLkQwDAwNbR9SXZKfV77QhtuorKk8jHqYB6gDwfrSWVhF0EVylNi2fE9L27pAkpm9yP2pi8i3nlj4woLa%2BanBHXMRQtgZ8%2BwJSHNnuJ5KRbeMS%2BuUJNXuzoUEmBOr1VxbEslUl0ZiyemI1tSFv0XnUnRmvDyyU3ixHwgTtixVXGrzPK2%2B6vPmc1uWVBJjonx%2FNXEBJX4TiIxl1KscOgoNg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230526T011635Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN7NW4PFZ%2F20230526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2d935c497c7abf8767b067c06265fa3f6a81048d7adee7139fbd0ef5fce712ed',
    label: 'Roast sirloin of beef',
    source: 'BBC Good Food',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_7eb3edfc916ebf0e4b028c8e5c04b81a'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/ad3/ad35ae4c847dcd39bad104838007f84a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCM5Wis73TvS9BWXmwlFp83JrKo1IVbW%2BH5jGfxV2glhAIhAPv6Nk9rlvr2SbAUCdTkqhjJT%2BYu9dshE8tzAKTt6LliKrgFCCEQABoMMTg3MDE3MTUwOTg2Igzqk36L6CBxLRACsQQqlQUZCOtdf%2BTqRAEevubyhIKEC9sLExKcLli8%2BWrmUFv89flrQvtwNNYOAPkPnbSo%2BZc0j9S%2BcRvJqnU9zZR%2F0ZXOmjL5Cp7VfrZb1yzMPCeyCdDpXtFx4B6TcHaIeIkGcI6QHRIepKWalDEUYyHs7HwYED25ELkDAY41BCtUr57AvgyKXExUt%2Bdo9E0XAFvxLIHF7prmvEeLILMCAw6%2Bs7yrw5%2FDQJ%2FpPF%2F0HSDJMn71SdZ%2BynSy4Y9ch3OEzA3na%2FKvbl2sH7K9Iks0Gjdd1i1WmjnZwwMgLxBNzlc3u8p1P8bxfZMdHPxUvNSlJ8C4%2FLHJaSM8%2B42DQgBNe4kXIFTVFeejr0901NOSQopJwBMiYVbmWICXOZwpQZRo1FzcDR%2Fr0Bm6e5g5kW7N31q%2FIXfTG0lQrqFvZrka6cM%2Bn8p2kCmx%2FwER9u5hbuxolQafhAYmKAofJ61sX7Q%2F22QemJUwQtUP9jZHq47gHL3KimPLL7O3PlizPdeuRZVXtOo3lYpeIuJG4Q5cFlI9Na6HNBSAGS5WmhxGJmNWzJBb9hBL3WAf3Rlcf0tzBE8SVV3AgVAl4skpbpI1QnjMzPQW2bGB5VELBLN8%2BsZJvNo3fGvBGZwU1HtAOiOqfhpUlku6eIgcszWFYujyhsEe0oHeK6AK1x2%2B%2BWtXNjfzf51M9%2BwVkxKwE%2FHyf34JV45fWhfnJ2sHUgi7M%2BEsqj7vCoL1ybKKV%2BcrY%2F16zxNtq6gC5Y7a2168%2BtEb1RSPzlfxajt2LpofV27u2Si2PQ%2B60VjjBr7xii6UJ7YzI7ywhcyjAgvJxANOkAHIjYSWe%2BSoCajM1Shz%2Fjkfs4bvctJqNrsNsjl7eL5QlS%2Fqj8cnvO7gyd3pq%2FRIZXkKMIjvv6MGOrABLYe%2Boh%2FAW4%2BXv8rKaTNjbFLkQwDAwNbR9SXZKfV77QhtuorKk8jHqYB6gDwfrSWVhF0EVylNi2fE9L27pAkpm9yP2pi8i3nlj4woLa%2BanBHXMRQtgZ8%2BwJSHNnuJ5KRbeMS%2BuUJNXuzoUEmBOr1VxbEslUl0ZiyemI1tSFv0XnUnRmvDyyU3ixHwgTtixVXGrzPK2%2B6vPmc1uWVBJjonx%2FNXEBJX4TiIxl1KscOgoNg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230526T011635Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN7NW4PFZ%2F20230526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=43e0bae573adf168f147296a70da9aad85cb9c0c599fb462c5e179819e425b74',
    label: 'Beef Tea',
    source: 'Epicurious',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_0f3a359371750f372c7ac3c1459751d9'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/deb/debce0693c8d8a6988af80e1f94e4c4c.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCM5Wis73TvS9BWXmwlFp83JrKo1IVbW%2BH5jGfxV2glhAIhAPv6Nk9rlvr2SbAUCdTkqhjJT%2BYu9dshE8tzAKTt6LliKrgFCCEQABoMMTg3MDE3MTUwOTg2Igzqk36L6CBxLRACsQQqlQUZCOtdf%2BTqRAEevubyhIKEC9sLExKcLli8%2BWrmUFv89flrQvtwNNYOAPkPnbSo%2BZc0j9S%2BcRvJqnU9zZR%2F0ZXOmjL5Cp7VfrZb1yzMPCeyCdDpXtFx4B6TcHaIeIkGcI6QHRIepKWalDEUYyHs7HwYED25ELkDAY41BCtUr57AvgyKXExUt%2Bdo9E0XAFvxLIHF7prmvEeLILMCAw6%2Bs7yrw5%2FDQJ%2FpPF%2F0HSDJMn71SdZ%2BynSy4Y9ch3OEzA3na%2FKvbl2sH7K9Iks0Gjdd1i1WmjnZwwMgLxBNzlc3u8p1P8bxfZMdHPxUvNSlJ8C4%2FLHJaSM8%2B42DQgBNe4kXIFTVFeejr0901NOSQopJwBMiYVbmWICXOZwpQZRo1FzcDR%2Fr0Bm6e5g5kW7N31q%2FIXfTG0lQrqFvZrka6cM%2Bn8p2kCmx%2FwER9u5hbuxolQafhAYmKAofJ61sX7Q%2F22QemJUwQtUP9jZHq47gHL3KimPLL7O3PlizPdeuRZVXtOo3lYpeIuJG4Q5cFlI9Na6HNBSAGS5WmhxGJmNWzJBb9hBL3WAf3Rlcf0tzBE8SVV3AgVAl4skpbpI1QnjMzPQW2bGB5VELBLN8%2BsZJvNo3fGvBGZwU1HtAOiOqfhpUlku6eIgcszWFYujyhsEe0oHeK6AK1x2%2B%2BWtXNjfzf51M9%2BwVkxKwE%2FHyf34JV45fWhfnJ2sHUgi7M%2BEsqj7vCoL1ybKKV%2BcrY%2F16zxNtq6gC5Y7a2168%2BtEb1RSPzlfxajt2LpofV27u2Si2PQ%2B60VjjBr7xii6UJ7YzI7ywhcyjAgvJxANOkAHIjYSWe%2BSoCajM1Shz%2Fjkfs4bvctJqNrsNsjl7eL5QlS%2Fqj8cnvO7gyd3pq%2FRIZXkKMIjvv6MGOrABLYe%2Boh%2FAW4%2BXv8rKaTNjbFLkQwDAwNbR9SXZKfV77QhtuorKk8jHqYB6gDwfrSWVhF0EVylNi2fE9L27pAkpm9yP2pi8i3nlj4woLa%2BanBHXMRQtgZ8%2BwJSHNnuJ5KRbeMS%2BuUJNXuzoUEmBOr1VxbEslUl0ZiyemI1tSFv0XnUnRmvDyyU3ixHwgTtixVXGrzPK2%2B6vPmc1uWVBJjonx%2FNXEBJX4TiIxl1KscOgoNg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230526T011635Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFN7NW4PFZ%2F20230526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0f97856a9c093a24afc6e4ffefb52d114731c43f89bf97e88bab663c020aee3b',
    label: 'Beef Brisket',
    source: 'Simply Recipes',
    uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_710678b0fae9d4fa004975ef91aae1a3'
  }
]

const RecipesContainer = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const { navigation } = props

  const fetchRecipes = () => {
    setIsLoading(true)

    setRecipes(recipesResponse)

    setIsLoading(false)
    // getRecipes(ingredient).then(
    //   recipes => {
    //     setRecipes(recipes)
    //     setIsLoading(false)
    //   },
    //   error => {
    //     alert('Error', `Something went wrong! ${error}`)
    //   }
    // )
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  return (
    <Container>
      <Center px={4}>
        <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
        {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
      </Center>
    </Container>
  )
}

export default RecipesContainer

import useSWR from 'swr'

const createNestedCategoryList = (categories = [], parentId = null) => {
  let response = [...categories]

  if (!parentId) {
    response = response.filter((category) => category.parent === null)
  } else {
    response = response.filter(((category2) => {
      if (!category2.parent) {
        return false
      }

      return category2.parent.id === parentId
    }))
  }

  response = response.map((category3) => ({
    ...category3,
    subCategories: createNestedCategoryList(categories, category3.id),
  }))

  return response
}

const useCategories = ({ nested }) => {
  const categories = useSWR(`${process.env.API_HOST}/categories?_limit=1000`, (...args) => fetch(...args).then((response) => response.json()))

  if (!categories.data) {
    return []
  }

  if (nested) {
    return createNestedCategoryList(categories.data)
  }

  return categories.data
}

export default useCategories

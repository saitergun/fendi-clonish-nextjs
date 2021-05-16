import Link from 'next/link'

const NestedCategoryList = ({ nestedCategories }) => {
  if (!nestedCategories || nestedCategories.length === 0) {
    return null
  }

  return (
    <ul>
      {nestedCategories.map((category) => {
        return (
          <li
            key={category.id}
          >
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>

            {category.subCategories.length > 0 && (
              <NestedCategoryList
                nestedCategories={category.subCategories}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default NestedCategoryList

import Head from 'next/head'
import Link from 'next/link'

import classNames from 'classnames'
import { shuffle } from 'lodash'

import {
  RiCloseLine,
  RiArrowDownSLine,
  RiFilter3Line,
  RiCheckLine,
} from 'react-icons/ri'

import API from '../../utils/api'

import Product from '../../components/CardProduct'

const HeaderCategoryItem = ({ href, text, active }) => {
  return (
    <Link href={href}>
      <a
        className={classNames('tracking-wide border py-0.5 px-2', {
          'border-black': !active,
          'flex items-center justify-center gap-1 bg-primary border-transparent': active,
        })}
      >
        <span>{text}</span>

        {active && (
          <RiCloseLine className="text-gray-500" />
        )}
      </a>
    </Link>
  )
}

const PageCategory = ({ category, childCategories, products, sort }) => {
  return (
    <>
      <Head>
        <title>BACKPACKS</title>
      </Head>

      <>
        <div className="container mx-auto">
          <header className="flex flex-col items-center justify-center border-b border-gray-200 py-5">
            <h1 className="text-22/16 tracking-widest text-gray-600">{category.name.toUpperCase()}</h1>

            {childCategories?.length > 0 && (
              <nav className="flex items-center justify-center flex-wrap gap-3 mt-6">
                {childCategories.map((child) =>
                  <HeaderCategoryItem
                    key={child.id}
                    href={category.id === child.id ? `/category/${category.parent.id}` : `/category/${child.id}`}
                    text={child.name}
                    active={category.id === child.id}
                  />
                )}
              </nav>
            )}
          </header>

          <nav className="flex items-center justify-between border-b border-gray-200">
            <ul className="flex items-center justify-start tracking-wide gap-2">
              <li>{category.name_full}</li>
            </ul>

            <span className="flex items-center justify-end divide-x">
              <span className="relative block cursor-pointer group">
                <span className="h-13 flex items-center justify-center gap-2 px-4">
                  <span>Sort By</span>

                  <RiArrowDownSLine className="text-20/16" />                  
                </span>

                <nav className="min-w-52 absolute top-full right-0 p-2 border bg-white whitespace-pre tracking-wider z-1 hidden group-hover:block">
                  <Link href={`/category/${category.id}`}>
                    <a className={classNames('flex items-center justify-between py-3 px-2', { 'font-bold': !sort })}>
                      <span>Recommended</span>

                      {!sort && (
                        <RiCheckLine className="text-18/16" />
                      )}
                    </a>
                  </Link>

                  <Link href={`/category/${category.id}?_sort=price:asc`}>
                    <a className={classNames('flex items-center justify-between py-3 px-2', { 'font-bold': sort === 'price:asc' })}>
                      <span>Price Low to High</span>

                      {sort === 'price:asc' && (
                        <RiCheckLine className="text-18/16" />
                      )}
                    </a>
                  </Link>

                  <Link href={`/category/${category.id}?_sort=price:desc`}>
                    <a className={classNames('flex items-center justify-between py-3 px-2', { 'font-bold': sort === 'price:desc' })}>
                      <span>Price High to Low</span>

                      {sort === 'price:desc' && (
                        <RiCheckLine className="text-18/16" />
                      )}
                    </a>
                  </Link>

                  <Link href={`/category/${category.id}?_sort=id:asc`}>
                    <a className={classNames('flex items-center justify-between py-3 px-2', { 'font-bold': sort === 'id:asc' })}>
                      <span>New In</span>

                      {sort === 'id:asc' && (
                        <RiCheckLine className="text-18/16" />
                      )}
                    </a>
                  </Link>
                </nav>
              </span>

              <span className="relative block cursor-pointer">
                <span className="h-13 flex items-center justify-center gap-2 px-4">
                  <RiFilter3Line className="text-20/16" />

                  <span>Filter</span>
                </span>
              </span>
            </span>
          </nav>

          <main className="grid grid-cols-3 xl:grid-cols-4 gap-8 py-8">
            {products.length > 0 && products.map((product) => 
              <Product key={product.id} product={product} />
            )}
          </main>
        </div>

        {/* <pre className="bg-gray-100 text-11/16 p-1 m-1">{JSON.stringify(category, null, 2)}</pre> */}
        {/* <pre className="bg-gray-100 text-11/16 p-1 m-1">{JSON.stringify(childCategories, null, 2)}</pre> */}
      </>
    </>
  )
}

export async function getServerSideProps({ params, query }) {
  if (params.id === '64') {
    return {
      notFound: true,
    }
  }

  let sort = null

  // get category
  const getCategory = await API(`categories/${params.id}`)

  // set child categories parent id
  const parent = getCategory.data.parent ? getCategory.data.parent.parent ? getCategory.data.parent.id : getCategory.data.id : params.id

  // get child categories
  const getChildCategories = await API('categories', { params: { parent } })

  // set products request config
  const getProductsConfig = { params: {} }

  // add sort param to products request config
  if (query._sort) {
    getProductsConfig.params._sort = query._sort

    sort = query._sort
  }

  // get products
  const getProducts = await API('products', getProductsConfig)

  return {
    props: {
      category: getCategory.data,
      childCategories: getChildCategories.data,
      products: query._sort ? getProducts.data : shuffle(getProducts.data),
      sort,
    }
  }
}

export default PageCategory

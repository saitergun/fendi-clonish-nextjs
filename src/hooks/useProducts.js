import useSWR from 'swr'

const useProducts = () => {
  const products = useSWR(`${process.env.API_HOST}/products`, (...args) => fetch(...args).then((response) => response.json()))

  if (!products.data) {
    return []
  }

  return products.data
}

export default useProducts

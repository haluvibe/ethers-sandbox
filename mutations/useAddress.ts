// import { ITodo } from '../../mirage/fixtures/todos'
import { useSWRConfig } from 'swr'
import { swrKeys } from '../constants/swrKeys'

export const useAddress = async (address) => {
  const { cache, mutate } = useSWRConfig()
  const addressCache = cache.get(swrKeys.address)

  console.log('address cache', addressCache)

  mutate(
    swrKeys.address,
    address,
    false
  )
}

import { useContext } from 'react'
import { Context } from '../contexts/ComplusProvider'

const useComplus = () => {
  const { complus } = useContext(Context)
  return complus
}

export default useComplus

import { hello } from '@/hello/hello'
import { X } from '@/types/types'

console.log(X)

hello()

export const start = (arg: string|undefined) => {
  console.log('start')
  console.log(arg)
}
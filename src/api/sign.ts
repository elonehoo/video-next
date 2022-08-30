import { haul } from '@elonehoo/haul'

export const sig = haul('http://localhost:5566/video/sig/', {
  responseAs: 'text',
})

export function getUserSig(userId: string) {
  return sig.get(userId)
}

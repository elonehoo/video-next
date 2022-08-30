import { haul } from '@elonehoo/haul'

export const conference = haul('http://localhost:5566/video/conference/', {
  responseAs: 'json',
})

export function getInfo(roomId: string) {
  return conference.get(roomId)
}

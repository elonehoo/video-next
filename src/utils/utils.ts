/**
 * 从 window.location.href 中获取指定key的value
 * @param {*} key 要获取的 key
 * @returns window.location.href 中指定key对应的value
 * @example
 * const value = getUrlParam(key);
 */
export function getUrlParam(key: string): string {
  const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ''))
  const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, 'i')
  const paramMatch = url.match(regexp)

  return paramMatch ? paramMatch[2] : ''
}

export function getQuality(uplinkNetworkQuality: number): string {
  switch (uplinkNetworkQuality) {
    case 1:
      return '网络状况极佳'
    case 2:
      return '网络状况较好'
    case 3:
      return '网络状况一般'
    case 4:
      return '网络状况差'
    case 5:
      return '网络状况极差'
    case 6:
      return '网络连接已断开'
    default:
    case 0:
      return '网络状况未知'
  }
}

export function splitToArray(array: any) {
  const result: string[] = array.split(',')
  return result
}

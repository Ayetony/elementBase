import request from '@/utils/request'

export function paperList(token) {
  return request({
    url: '/paperlist',
    method: 'get',
    params: { token }
  })
}

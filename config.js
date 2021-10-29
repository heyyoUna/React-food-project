let config = {}
const debug = true

export const API_HOST = 'http://localhost:3000/'
export const CART = API_HOST + 'cart'

export const devUrl = 'http://localhost:3000/' //開發中port的位置
export const prodUrl = 'http://www.abc.com/' //實際運行時的網址
export const imgUrl = debug ? devUrl : prodUrl //如果debug是true就跑devUrl，是false就跑proUrl

export const API_img =
  'http://localhost:3002/img/article/index/'

config = { ...config, API_HOST, API_img, imgUrl }
export default config

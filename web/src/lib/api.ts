import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.15.107.53:3333',
})

export default api
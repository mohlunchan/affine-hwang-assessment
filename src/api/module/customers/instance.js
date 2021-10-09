import axios from 'axios'
import router from '../../../router'

const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}/customers`,
    timeout: 3000,
})

instance.interceptors.response.use((res) => {
    if ([200, 201].includes(res.status)) return res;
    else if (res.status === 404) return router.replace('/404')
})

export default instance
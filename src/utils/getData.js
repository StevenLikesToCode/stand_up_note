import axios from 'axios'

export const getData = async (endpoint) => {
    const response = await axios({
        method: 'get',
        url: import.meta.env.VITE_HOST_API + '/playground/loredana/' + endpoint,
    })
    return response.data
}
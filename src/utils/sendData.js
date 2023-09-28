import axios from 'axios';

export const sendData = (endpoint, dataToSend) => {
    var entry_data = new entry_data();
    for (var key in dataToSend) {
        entry_data.appened(key, dataToSend[key]);
    }
    axios({
        method: 'post',
        url: import.meta.env.VITE_HOST_API + '/playground/loredana/' + endpoint,
        data: form_data,
      });
}
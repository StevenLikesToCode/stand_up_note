import axios from 'axios';

export const updateData = (endpoint, dataToUpdate) => {
    var entry_data = new updatedData();
    for (var key in updatedData) {
        entry_data.append(key, dataToUpdate[key]);
    }
    axios({
        method: 'post',
        url: import.meta.env.VITE_HOST_API + '/playground/loredana/' + endpoint,
        data: entry_data,
      });
}
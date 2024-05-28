import axios from 'axios';
import {ref} from 'vue';

export const useHttp = () => {
    const loading = ref(false);
    const data = ref(null);
    const error = ref(null);

    return ({method = 'GET', url}) => {
        try {
            let handleSuccess;
            const onSuccess = (func) => {
                if (!func) {
                    return null;
                }
                handleSuccess = () => func(data.value);
            };
            loading.value = true;
            let requestFunc;
            if (method === 'GET') {
                requestFunc = () => axios.get(url);
            } else if (method === 'POST') {
                requestFunc = () => axios.post(url);
            }

            requestFunc().then(response => {
                data.value = response.data;
                handleSuccess();
            }).catch(e => {
                error.value = e;
            }).then(() => {
                loading.value = false;
            });
            return {data, loading, error, onSuccess};
        } catch (e) {
            error.value = e;
        }
    };
};

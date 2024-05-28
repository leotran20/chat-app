import {defineStore} from 'pinia';
import {computed, ref, watch} from 'vue';
import {useHttp} from '@/hooks/useHttp.js';
import {convertUserData} from '@/helper/index.js';
import {useStorage} from '@/hooks/useStorage.js';

export const useUserStore = defineStore('user', () => {
    const http = useHttp();
    const [user, setUser, removeUser] = useStorage('user', 'local'); // [value, setter
    const loading = ref(false);

    const isLoggedIn = computed(() => user.value !== null);

    const login = (userData, callback) => {
        try {
            const {data, loading: isLoading, onSuccess} = http({url: 'https://randomuser.me/api/'});
            watch(isLoading, (value) => {
                loading.value = value;
            }, {immediate: true});

            onSuccess(() => {
                setUser(convertUserData(data.value));
                if (callback) {
                    callback();
                }
            });

        } catch (e) {
            throw e;
        }
    };

    const logout = () => {
        removeUser();
    };

    return {
        user,
        isLoggedIn,
        loading,
        login,
        logout,
    };
});

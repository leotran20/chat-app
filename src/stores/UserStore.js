import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const useUserStore = () => defineStore('user', () =>{
    const user = ref(null);

    const isLoggedIn = computed(()=> user.value !== null);

    const login = (userData) => {
        user.value = userData;
    };

    const logout = () => {
        user.value = null;
    };

    return {
        user,
        isLoggedIn,
        login,
        logout,
    };
})

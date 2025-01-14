import {ref} from 'vue';

const getItem = (key, storage) => {
    let value = storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};

export const useStorage = (key, type = 'session') => {
    let storage = null;
    switch (type) {
        case 'session':
            storage = sessionStorage;
            break;
        case 'local':
            storage = localStorage;
            break;
        default:
            return null;
    }
    const value = ref(getItem(key, storage));
    const setItem = (storage) => {
        return (newValue) => {
            value.value = newValue;
            storage.setItem(key, JSON.stringify(newValue));
        };
    };

    const removeItem = (storage) => {
        return () => {
            value.value = undefined;
            storage.removeItem(key);
        };
    };
    return [
        value,
        setItem(storage),
        removeItem(storage),
    ];
};

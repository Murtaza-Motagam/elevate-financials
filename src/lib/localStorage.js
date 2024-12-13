const LocalStorage = {
    get: (key) => {
        if (typeof localStorage !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            const returnValue = user[key];
            return returnValue ? JSON.parse(returnValue) : '';
        }
        return '';
    },

    getID: (key) => {
        if (typeof localStorage !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.[key];
        }

        return '';
    },

    getJSON: (key) => {
        if (typeof localStorage !== 'undefined') {
            const data = LocalStorage.get(key);

            return data && data !== undefined ? data : '';
        }

        return false;
    },

    set: (key, data) => {
        if (typeof localStorage !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user[key] = data;
            return localStorage.setItem('user', JSON.stringify(user));
        }

        return false;
    },

    setJSON: (key, value) => {
        if (typeof localStorage !== 'undefined') {
            const data = JSON.stringify(value);

            return LocalStorage.set(key, data);
        }

        return false;
    },

    setToken: (token) => {
        LocalStorage.set('token', token);
    },

    remove: (key) => {
        if (typeof localStorage !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            delete user[key];
            return localStorage.setItem('user', JSON.stringify(user));
        }

        return false;
    },

    clean: () => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.removeItem('user');
        }

        return false;
    },
};

export { LocalStorage };

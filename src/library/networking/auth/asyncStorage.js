import { AsyncStorage } from 'react-native';

// Async Storage
export const saveAccessToken = async accessToken => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.log(error.message);
    }
};

export const getAccessToken = async () => {
    let accessToken = '';
    try {
        accessToken = await AsyncStorage.getItem('accessToken') || 'none';
    } catch (error) {
        console.log(error.message);
    }
    return accessToken;
}

export const saveRefreshToken = async refreshToken => {
    try {
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
        console.log(error.message);
    }
};

export const getRefreshToken = async () => {
    let refreshToken = '';
    try {
        refreshToken = await AsyncStorage.getItem('refreshToken') || 'none';
    } catch (error) {
        console.log(error.message);
    }
    return refreshToken;
}

export const saveExpirationTime = async expirationTime => {
    try {
        await AsyncStorage.setItem('expirationTime', "" + expirationTime);
    } catch (error) {
        console.log(error.message);
    }
};

export const getExpirationTime = async () => {
    try {
        let expiration = '';
        expiration = await AsyncStorage.getItem('expirationTime') || 'none';
    } catch (error) {
        console.log(error.message);
    }
    return expiration;
}

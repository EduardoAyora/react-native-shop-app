import AsyncStorage from '@react-native-async-storage/async-storage'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token: token }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMqJPKbhKvR4Ssme4VfWC1dwTxTxk7btI',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        )

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo salió mal'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Este email ya existe'
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken))
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMqJPKbhKvR4Ssme4VfWC1dwTxTxk7btI',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        )

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo salió mal'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Este email no pudo ser encontrado'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Esta contraseña no es válida'
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken))
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate: expirationDate.toISOString(),
        })
    )
}

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import productsReducer from './store/reducers/products'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
    products: productsReducer,
})

const store = createStore(rootReducer)

export default function App() {
    let [fontLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })

    if (!fontLoaded) return <AppLoading />

    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

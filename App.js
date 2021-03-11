import React from 'react'
import { StyleSheet } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import ReduxThunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

// composeWithDevTools() solo en development
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

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

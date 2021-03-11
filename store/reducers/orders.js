import { ADD_ORDER } from '../actions/orders'
import Order from '../../models/order'

const initailState = {
    orders: [],
}

export default function (state = initailState, action) {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }

    return state
}

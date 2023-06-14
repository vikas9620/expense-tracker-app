import {configureStore} from '@reduxjs/toolkit'
import  authReducer  from './Auth'
import  expenseReducer from './Expense'
import themeReducer from './Theme'
const store = configureStore({
    reducer: {auth: authReducer ,expense: expenseReducer,theme: themeReducer }
})


export default store
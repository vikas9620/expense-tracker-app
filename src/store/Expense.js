
import {createSlice} from '@reduxjs/toolkit'


const initialvalue = { expense: null
     }


 const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialvalue,
    reducers: {
       setExpense(state,action){
        state.expense = action.payload.expense
       }
    }
})

export const expenseAction = expenseSlice.actions

export default expenseSlice.reducer
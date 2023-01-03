import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: window.localStorage.getItem('loggedUser')? JSON.parse(window.localStorage.getItem('loggedUser')) : {username:null, loggued:false, userId: null},
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    }
})


export default userSlice.reducer


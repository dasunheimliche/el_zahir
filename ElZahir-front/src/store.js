
// DEPENDENCIES
import { configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'

// STORE CREATION
export default configureStore({
    reducer: {
        user: userReducer
    }
})
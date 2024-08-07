import { createSlice } from '@reduxjs/toolkit'
import serverApi from '../helper/serverApi'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'

const getUsers = createSlice({
    name : "userFetch",
    initialState : {
        dataUser : [],
        vError : []
    },
    reducers : {
        getAllUser : (state, actions)=>{
            state.dataUser =  actions.payload
        },
        getError : (state, actions)=>{
            state.vError = actions.payload
        }
    }
})

export const {getAllUser} = getUsers.actions
export default getUsers.reducer

export const userData = (id)=>{
    return async function (dispatch){
        try {
            let {data} =  await serverApi({
                url : `/user`,
                method : `get`,
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(getAllUser(data))
        } catch (error) {
            dispatch(getError(error.response))
        }
    }
}








//page berbeda ceritanya
// const {id} = useParams()
// const dispatch =  useDispatch()
// const data = useSelector((state)=>{
//     return {data1 :state.userFetch.dataUser,
//         email :state.userFetch.dataUser
//     }
// })
// const error = useSelector((state)=>{
//     return state.userFetch.vError
// })

// useEffect (()=>{
//     dispatch(userData(id))
// })
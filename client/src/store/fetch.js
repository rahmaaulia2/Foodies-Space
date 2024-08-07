import { createSlice } from '@reduxjs/toolkit'
import serverApi from '../helper/serverApi'
import { useDispatch } from 'react-redux'

const initialState = {
  dataFood: [],
  foodDetail : {}
}

const getfetch = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    getDataFood: (state, actions) => {
      state.dataFood = actions.payload
      console.log(actions.payload, '<<getdatafood');
    },
    getFoodDetail : (state, actions)=>{
      state.foodDetail =  actions.payload
    }
  }
})



// console.log(getfetch.actions, '<<<<<<<< ');
export const { getDataFood } = getfetch.actions
export default getfetch.reducer

export const readData = () => {
  return async function (dispatch) {
    let { data } = await serverApi({
      url: '/foods',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    dispatch(getDataFood(data))
    console.log(data);
  }
}

export const editData = () => {
  return async function (dispatch) {
    let { data } = await serverApi({
      url: `/foods/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    dispatch(getFoodDetail(data))
    console.log(data);
  }
}





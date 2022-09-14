import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "./ActionTypes";

export const addToCart = ({data, prodDetail, id})=>{
  return async (dispatch)=>{
    try{
      await axios.post(`https://pf-api-04.up.railway.app/${id}/cart`, data
      );
      return dispatch({
        type:ADD_TO_CART,
        payload:prodDetail
      })
    }catch(err){
      console.log(err)
    }
  }
  }



export const removeOneProducts = (id, userId) => {
    return async (dispatch) => {
      try {
      const { data } = await axios.delete(`https://pf-api-04.up.railway.app/user/${userId}/cart/delete?id=${id}`);
       return dispatch({
       type: REMOVE_ONE_FROM_CART,
       payload: id,
     });
   }catch (error) {
     console.log(error);
   }
       }
     }



export const removeAllCart = (id) => {
       return async (dispatch) => {
       try {
       const { data } = await axios.delete(`https://pf-api-04.up.railway.app/user/${id}/cart`)
       return dispatch({
        type: REMOVE_ALL_FROM_CART,
        payload: [],
      });
       } catch (error) {
        console.log(error);
       }
      };
    };



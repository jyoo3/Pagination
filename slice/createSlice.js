// const [users,setUsers] = useState([]);
//   const [count,setCount] = useState([]);
//   const [filters,setFilters] = useState([]);
//   const [modalDisplay,setmodalDisplay] = useState({type:'',col:''});
//   const [filterDisplay,setfilterDisplay] = useState({col:'',show:false});
//   const [state,setState] = useState({currentPage:1,col:'emp_id',order:true,limit:5});



// import { createSlice } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';
// import { useState } from 'react';

// const initialState = {
//     users:[],
//     count:-1,
//     filters:[],
//     modalDisplay:{type:'',col:''},
//     filterDisplay:{col:'',show:false},
//     state:{currentPage:1,col:'emp_id',order:true,limit:5},
// };

// const pageSlice = createSlice({
//     name:'pageSlice',
//     initialState,
//     reducers:{
//         setUsers:(state,action)=>{
//             state.users= action.payload
//         },
//         setUsers:(state,action)=>{
//             state.users=action.payload
//         },
//         setTodos:(state,action)=>{
//             state.todos=action.payload
//         }
//     }
// })

// // export const commentSlice = createSlice({
// //   name: '',
// //   initialState,
// //   reducers: {},

// //     // Special reducer for hydrating the state
// //     extraReducers: {
// //       [HYDRATE]: (state, action) => {
// //         return {
// //           ...state,
// //           ...action.payload.comments,
// //         };
// //       },
// //     },
// // });


// export default pageSlice.reducer;
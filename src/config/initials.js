  const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
console.log(token) 
export const authData = {
    isAuth: token?true:false,
    signup: false,
    user: {
        userame: '',
        userId: '',
        role: '',
        token: '',
        capabilities: '',
    },
    showEdit : false,
    posts: [],
    loading: false,
    reRender : false,
    error: null,
};
// export const initialState = {
//     user: {
//         username: userInfo ? userInfo.username : '',
//         role: userInfo ? userInfo.role : '',
//         token: token,
//         userId: userInfo ? userInfo.id : ''
//     },
// // isAuth: Object.keys(userInfo).length ? true : false,
//     // isAuth: userInfo.hasOwnProperty(),
//     isAuth: token?true:false,

//     loading: false
// }

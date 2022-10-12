const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
const token = localStorage.getItem('token') ? localStorage.getItem('currentUser') : '';

export const initialState = {
    user: {
        username: userInfo ? userInfo.username : '',
        role: userInfo ? userInfo.role : '',
        token: token,
        userId: userInfo ? userInfo.id : ''
    },
// isAuth: Object.keys(userInfo).length ? true : false,
    // isAuth: userInfo.hasOwnProperty(),
    isAuth: token?true:false,

    loading: false
}

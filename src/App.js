import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home/home'
import Profile from './pages/profile/profile'
import SignUp from './pages/auth/signup'
import LogIn from './pages/auth/login'
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from './redux/users/user'
import { ToastContainer } from 'react-toastify';
export default function App() {
    const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn')
    const isLoggedInSessionStorage = sessionStorage.getItem('isLoggedIn')
    const dispatch = useDispatch()
    let { user } = useSelector(state => state.user)
    let currentUser;
    useEffect(() => {
        if (isLoggedInLocalStorage) {
            currentUser=JSON.parse(localStorage.getItem('currentUser'))
            dispatch(editUser({user:currentUser}))
        }
        else if (isLoggedInSessionStorage) {
            currentUser=JSON.parse(sessionStorage.getItem('currentUser'))
            dispatch(editUser({user:currentUser}))
        }
    }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                    {user ? <Home /> : <LogIn />}
                </Route>
                <Route path='/profile/:username'>
                    {user ? <Profile /> : <LogIn />}
                </Route>
                <Route path='/signup'>
                    {user ? <Home /> : <SignUp />}
                </Route>
                <Route path='/login'>
                    {user ? <Home /> : <LogIn />}
                </Route>
                <Redirect to='/' />
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    )
}

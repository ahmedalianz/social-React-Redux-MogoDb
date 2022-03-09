import React from 'react'
import { BookMark, FeedIcon, Memories, Favourite, Group, Person, Logout } from '../icons'
import './side.css'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/users/user'
import { Link } from 'react-router-dom'
import MenuItem from './menuitem'
export default function Menu() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const menuItems = [
    { name: 'Groups', element: <Group htmlColor='blue' /> },
    { name: 'Bookmarks', element: <BookMark htmlColor='green' /> },
    { name: 'Memories', element: <Memories htmlColor='purple' /> },
    { name: 'Favourites', element: <Favourite htmlColor='red' /> }
  ]
  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    dispatch(logOut())
    window.location.reload()
  }
  return (
    <ul className='menu-container'>
      <Link to={`/profile/${user.username}`}>
        <button className='menu-item'>
          <span className='menu-icon'>
            <Person />
          </span>
          <span className='menu-text'>
            Profile
          </span>
        </button>
      </Link>
      <Link to='/'>
        <button className='menu-item'>
          <span className='menu-icon'>
            <FeedIcon htmlColor='red' />
          </span>
          <span className='menu-text'>
            Home Feed
          </span>
        </button>
      </Link>
      <hr className='menu-line' />
      {menuItems.map(item => (
        <MenuItem
          key={menuItems.indexOf(item)}
          item={item}
        />
      ))}
      <button className='menu-item' onClick={handleLogout}>
        <span className='menu-icon'>
          <Logout htmlColor='darkblue' />
        </span>
        <span className='menu-text'>
          LOG OUT
        </span>
      </button>
    </ul>
  )
}

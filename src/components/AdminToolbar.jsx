import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../redux/user/userSlice'
import { checkUserIsAdmin } from '../Utils'


const AdminToolbar = () => {

  const user = useSelector(selectUser)
  const isAdmin = checkUserIsAdmin(user)
  if(!isAdmin) return null

  return (
    <div className=' bg-gray-900 '>
      <ul className=''>
        <li>
          <Link to='/admin' className='block mx-5 text-2xl py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>My admin</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminToolbar
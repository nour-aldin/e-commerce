import {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import userProfileImage from '../assets/user.png'
import { Link } from 'react-router-dom'

import { selectUser,logOut } from '../redux/user/userSlice'

const UserToolBar = () => {
  const [displayName, setDisplayName] = useState('')
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      setDisplayName(user.displayName)
    } else {
      setDisplayName('Guest')
    }
  }, [user]);

  const handleSignOut = () => {
    dispatch(logOut())
    setDisplayName('Guest')
  }

  return (
    <div className="w-60 mb-5 shadow-md bg-white px-1 ">
        <div className="w-full  p-5 shadow-md">
          <img
            className="w-20 my-0 mx-auto"
            src={userProfileImage}
            alt="ProfileImage"
          />
          <h2 className="max-w-max my-5 mx-auto font-semibold text-xl uppercase ">
            {displayName}
          </h2>
        </div>
        <ul className="relative">
          <li className="relative">
            <Link
              to="/"
              className="flex items-center text-2xl font-extralight px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md rounded-sm"
            >
              Home
            </Link>
          </li>
          {displayName !== "Guest" && (
            <>
              <li className="relative">
                <Link
                  className="flex items-center text-2xl font-extralight px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md rounded-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
  )
}

export default UserToolBar
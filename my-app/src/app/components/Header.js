import React, {useState, useEffect, useRef} from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";



const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false); 
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserDropdown(false); // Close the user dropdown if open
  };
  const toggleDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowNotifications(false); // Close the notifications if open
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications if clicked outside the notifications box
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      // Close user dropdown if clicked outside the user dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div className='relative'>
        <div className='flex flex-row gap-4 justify-end p-2 border-b border-gray-300'>
        <div className='cursor-pointer' onClick={toggleNotifications} >
            <IoIosNotificationsOutline size={30}/>
        </div>
        <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer' onClick={toggleDropdown}>
            <span>A</span>
        </div>
        </div>
        {/* Notofication Box */}
        {showNotifications && (
            <div 
            ref={notificationRef}
            className='absolute right-14 mt-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg ' >
                 <p className='font-semibold text-center'>Notifications</p>
            <div className='mt-3'>
              {/* Sample notifications */}
                <div className='p-2 hover:bg-gray-100 cursor-pointer border-b border-t border-gray-300'>
                  Notification 1 : Some rondom text..........!
                </div>
                <div className='p-2 hover:bg-gray-100 cursor-pointer border-b border-t border-gray-300'>
                  Notification 2 : Some rondom text..........!
                </div>
                <div className='p-2 hover:bg-gray-100 cursor-pointer border-b border-t border-gray-300'>
                  Notification 3 : Some rondom text..........!
                </div>
            </div>
          </div>
        )}
        {/* User Dropdown */}
        {showUserDropdown && (
            <div 
            ref={dropdownRef}
            className='absolute right-0  bg-white border border-gray-200 rounded-lg shadow-lg'>
            <div className=''>
              {/* Sample dropdown options */}
             
                <ul>
                    <li className='flex flex-row gap-2 justify-center hover:bg-gray-100 cursor-pointer p-3'>
                        Profile <span><CiUser size={22}/></span>
                    </li>
                    <li className='flex flex-row gap-2 justify-center hover:bg-gray-100 cursor-pointer p-3'>
                        Settings <span><IoSettingsOutline size={22}/>
                        </span>
                    </li>
                    <li className='flex flex-row gap-2 justify-center hover:bg-gray-100 cursor-pointer p-3'>
                        Logout <span><CiLogout size={22}/>
                        </span>
                    </li>
                </ul>
            </div>
          </div>
        )}
    </div>
   
  )
}

export default Header
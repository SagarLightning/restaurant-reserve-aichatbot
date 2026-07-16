import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosLogOut, IoMdAddCircleOutline } from 'react-icons/io';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { PiListBulletsFill } from 'react-icons/pi';

const Sidebar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="fixed left-0 top-0 w-64 min-h-screen bg-gray-800 text-white p-4 z-50">
      <h2 className="text-2xl font-bold mb-8 text-center text-amber-500">
        Lightning Ristorante
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-amber-500 text-white'
                : 'hover:bg-gray-700 text-gray-200'
            }`
          }
        >
          <IoMdAddCircleOutline size={20} />
          <span className="font-medium">Add Menu</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-amber-500 text-white'
                : 'hover:bg-gray-700 text-gray-200'
            }`
          }
        >
          <MdFormatListBulletedAdd size={20} />
          <span className="font-medium">Menu List</span>
        </NavLink>

        <NavLink
          to="/table"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-amber-500 text-white'
                : 'hover:bg-gray-700 text-gray-200'
            }`
          }
        >
          <PiListBulletsFill size={20} />
          <span className="font-medium">Reservations</span>
        </NavLink>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 p-3 bg-amber-500 hover:bg-amber-600 rounded-lg w-full transition-colors duration-200 font-medium"
        >
          <IoIosLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
'use client';
import { IoIosMore } from 'react-icons/io';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CreateEvent from './createEvent';

export default function NavSidebar() {
  return (
    <div className="flex justify-between items-center p-4 shadow-md border-b h-16 w-full">
      <div>EVENT KITA</div>
      <div className="flex items-center space-x-5">
       <CreateEvent />
        <div>
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <IoIosMore className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

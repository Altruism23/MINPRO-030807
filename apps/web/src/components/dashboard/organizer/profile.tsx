import { profileOrganizer } from '@/lib/organizer/profileOrganizer';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ChangeUsername from './profile/changeUsername';
import dynamic from 'next/dynamic';
import ChangeEmail from './profile/changeEmail';
import ChangePassword from './profile/changePassword';
import ChangePhoto from './profile/changePhoto';

const EditUsername = dynamic(() => import('./profile/changeUsername'), {
  ssr: false,
});

const EditEmail = dynamic(() => import('./profile/changeEmail'), {
  ssr: false,
});

const EditPassword = dynamic(() => import('./profile/changePassword'), {
  ssr: false,
});

const EditPhoto = dynamic(() => import('./profile/changePhoto'), {
  ssr: false,
});


export default async function Profile() {
  const user = await profileOrganizer();
  console.log(user)
  if (!user) return null;

  const defaultImage = '/uploads/userProfile.png'
  const userImage = user.image || defaultImage
  return (
    <div className="flex flex-col justify-center items-center w-[1200px]">
      <div className="flex border w-[600px] p-4">{user.organizerName}</div>
      <div className="flex border w-[600px] p-4 justify-between">
        <p className="flex">Profile image</p>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image src={userImage} alt="avatar" width={96} height={96} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <EditPhoto/>
          <button className="btn">remove</button>
        </div>
      </div>
      <div className="flex border w-[600px] p-4 justify-between">
        <div className="flex">
          <p className="py-4">Username</p>
        </div>
        <div className="flex items-center gap-4">
          <p>{user.organizerName}</p>
          <EditUsername />
        </div>
      </div>
      <div className="flex flex-col border w-[600px] p-4 gap-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>First Name</p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              disabled
              className="input input-bordered input-sm w-[300px] max-w-xs"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Last Name</p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              disabled
              className="input input-bordered input-sm w-[300px] max-w-xs"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col border w-[600px] p-4 gap-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Email</p>
          </div>
          <div className="flex items-center gap-3">
            <p>{user.email}</p>
            <EditEmail />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Password</p>
          </div>
          <div className="flex items-center">
            <EditPassword/>
          </div>
        </div>
      </div>
    </div>
  );
}

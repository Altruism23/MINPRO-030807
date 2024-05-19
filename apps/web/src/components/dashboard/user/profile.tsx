import Image from 'next/image';
import ChangeUsername from './profile/changeUsername';
import dynamic from 'next/dynamic';
import ChangeEmail from './profile/changeEmail';
import ChangePassword from './profile/changePassword';
import ChangePhoto from './profile/changePhoto';
import { profileUser } from '@/lib/user/profileUser';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react';

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

const EditFirstname = dynamic(() => import('./profile/changeFirstname'), {
  ssr: false,
});

const EditLastname = dynamic(() => import('./profile/changeLastname'), {
  ssr: false,
});

export default async function Profile() {
  const user = await profileUser();
  if (!user) return null;

  const defaultImage = '/uploads/userProfile.png/';
  const userImage = user.image || defaultImage;
  console.log('userImage:', userImage);
  return (
    <div className="flex flex-col justify-center items-center w-[1200px]">
      <div className="flex border w-[600px] p-4">{user.username}</div>
      <div className="flex border w-[600px] p-4 justify-between">
        <p className="flex">Profile image</p>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image src={userImage} alt="avatar" width={96} height={96} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <EditPhoto />
          <button className="btn">remove</button>
        </div>
      </div>
      <div className="flex border w-[600px] p-4 justify-between">
        <div className="flex">
          <p className="py-4">Username</p>
        </div>
        <div className="flex items-center gap-4">
          <p>{user.username}</p>
          <EditUsername />
        </div>
      </div>
      <div className="flex flex-col border w-[600px] p-4 gap-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>First Name</p>
          </div>
          <div className="flex items-center gap-4">
            <p>{user.firstName}</p>
            <EditFirstname />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Last Name</p>
          </div>
          <div className="flex items-center gap-4">
            <p>{user.lastName}</p>
            <EditLastname />
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
            <EditPassword />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Your Referral Code:</p>
          </div>
          <div>
            <p>{user.referralCode}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>Your Point:</p>
          </div>
          <div>
            <>
              {user.Point.map((point: { id: number; amount: number }) => (
                <p key={point.id}>{point.amount}</p>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

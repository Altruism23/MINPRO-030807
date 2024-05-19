import Link from 'next/link';
import Content from './content';

export default function Sidebar({
  children,
  childrenMenu,
}: {
  children?: any;
  childrenMenu?: any;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="button" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <ul className="menu flex flex-col justify-center gap-5 p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {childrenMenu}
        </ul>
      </div>
    </div>
  );
}

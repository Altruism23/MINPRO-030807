import { profileOrganizer } from '@/lib/organizer/profileOrganizer';

export default async function ContentDashboardOrganizer() {
  const organizer = await profileOrganizer();
  if (!organizer) return null;
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      Hello {organizer.organizerName}
      <div className="grid grid-cols-3 gap-4 shadow-xl p-20">
        <div>Total Events:</div>
        <div>Total Revenues:</div>
        <div>Total Atendees:</div>
      </div>  
    </div>
  );
}

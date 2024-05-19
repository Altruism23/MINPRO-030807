'use client';
import { upadateOrganizerImage } from '@/lib/organizer/updateImage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ChangePassword() {
  
  const [myModal, setMyModal] = useState<HTMLFormElement>()

  const updateSchema = Yup.object().shape({
    file: Yup.string(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await upadateOrganizerImage(values);
      console.log(values);
      alert('Update Photo Succes!');
    } catch (err) {
      console.log(err);
      alert('Error update');
    }
    actions.resetForm();
  };

  useEffect(() => {
    setMyModal(document.getElementById('modal13') as HTMLFormElement)
  }, [])

  return (
    // <Formik
    //   initialValues={{
    //     file: '',
    //   }}
    //   validationSchema={updateSchema}
    //   onSubmit={handleSubmit}
    // >
      <form action={upadateOrganizerImage}>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() =>
                myModal?.showModal()
            }
          >
            Change Photo
          </button>
          <dialog id="modal13" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col gap-3 p-4">
                <p>Change Photo:</p>
                <input
                  name="file"
                  type="file"
                  className="border border-black rounded-lg h-[30px]"
                />
                <button className="btn w-[200px]" type="submit">
                  Confirm Photo
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </form>
    // </Formik>
  );
}

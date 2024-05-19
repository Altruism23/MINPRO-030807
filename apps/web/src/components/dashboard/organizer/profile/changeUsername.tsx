'use client';
import { updateOrganizerName } from '@/lib/organizer/updateOrganizerName';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ChangeUsername() {
  
  const [myModal, setMyModal] = useState<HTMLFormElement>()

  const router = useRouter();
  const updateSchema = Yup.object().shape({
    organizerName: Yup.string(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await updateOrganizerName(values);
      console.log(values);
      alert('username updated!');
    } catch (err) {
      console.log(err);
      alert('Error update');
    }
    actions.resetForm();
  };

  useEffect(() => {
    setMyModal(document.getElementById('my_modal_1') as HTMLFormElement)
  }, [])

  return (
    <Formik
      initialValues={{
        organizerName: '',
      }}
      validationSchema={updateSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() =>
                myModal?.showModal()
            //   (document.getElementById('my_modal_1') as HTMLFormElement) .showModal()
            }
          >
            Change Username
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col gap-3 p-4">
                <p>Change your username:</p>
                <Field
                  name="organizerName"
                  type="text"
                  className="border border-black rounded-lg h-[30px]"
                />
                <button className="btn w-[200px]" type="submit">
                  Confirm Username
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </Form>
    </Formik>
  );
}

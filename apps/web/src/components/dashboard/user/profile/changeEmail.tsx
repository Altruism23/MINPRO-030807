'use client';
import { upadateOrganizerEmail } from '@/lib/organizer/updateEmail';
import { updateUserEmail } from '@/lib/user/updateUserEmail';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ChangeEmail() {
  
  const [myModal, setMyModal] = useState<HTMLFormElement>()

  const updateSchema = Yup.object().shape({
    email: Yup.string(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await updateUserEmail(values);
      console.log(values);
      alert('an email verification has been sent to your new email!');
    } catch (err) {
      console.log(err);
      alert('Error update');
    }
    actions.resetForm();
  };

  useEffect(() => {
    setMyModal(document.getElementById('my_modal_13') as HTMLFormElement)
  }, [])

  return (
    <Formik
      initialValues={{
        email: '',
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
            }
          >
            Change Email
          </button>
          <dialog id="my_modal_13" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col gap-3 p-4">
                <p>Change email:</p>
                <Field
                  name="email"
                  type="email"
                  className="border border-black rounded-lg h-[30px]"
                />
                <button className="btn w-[200px]" type="submit">
                  Confirm Email
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </Form>
    </Formik>
  );
}

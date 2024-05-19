'use client';
import { updateOrganizerPassword } from '@/lib/organizer/updatePassword';
import { updateUserPassword } from '@/lib/user/updatePassword';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ChangePassword() {
  
  const [myModal, setMyModal] = useState<HTMLFormElement>()

  const updateSchema = Yup.object().shape({
    password: Yup.string(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await updateUserPassword(values);
      console.log(values);
      alert('Update Password Succes!');
    } catch (err) {
      console.log(err);
      alert('Error update');
    }
    actions.resetForm();
  };

  useEffect(() => {
    setMyModal(document.getElementById('my_modal_15') as HTMLFormElement)
  }, [])

  return (
    <Formik
      initialValues={{
        password: '',
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
            Change Password
          </button>
          <dialog id="my_modal_15" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex flex-col gap-3 p-4">
                <p>Change Pasword:</p>
                <Field
                  name="password"
                  type="password"
                  className="border border-black rounded-lg h-[30px]"
                />
                <button className="btn w-[200px]" type="submit">
                  Confirm Password
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </Form>
    </Formik>
  );
}

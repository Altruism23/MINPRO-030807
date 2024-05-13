'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Page() {
  const SignupSchema = Yup.object().shape({
    organizerName: Yup.string()
      .min(4, 'At least 4 characters or more')
      .max(30, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/organizers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert('Registration Successful');
      } else {
        alert('Registration Failed');
      }
    } catch (error) {
      console.error('Error', error);
      alert('Error Registration');
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen p-32">
      <div className="flex flex-col shadow-2xl w-[700px] p-32 gap-4">
        <p className="flex justify-center text-xl text-blue-600">Register</p>
        <Formik
          initialValues={{
            organizerName: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col justify-center mx-auto gap-2">
              <p>Organizer Name: </p>
              <Field
                type="text"
                name="organizerName"
                placeholder="Your Organizer Name"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="organizerName"
                component="div"
                className="text-red-600"
              />
              <p>Email:</p>
              <Field
                type="email"
                name="email"
                placeholder="Your email"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
              <p>Password:</p>
              <Field
                type="password"
                name="password"
                placeholder="Your password"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-xs text-wrap max-w-96"
              />
              <button
                className="border bg-blue-600 rounded-lg mt-3 text-white shadow-md btn"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

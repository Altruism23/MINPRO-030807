'use client';

import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  FormikValues,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { first, values } from 'cypress/types/lodash';

export default function Page() {
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'At least 4 characters or more')
      .max(30, 'Too Long!')
      .required('Required'),
    firstName: Yup.string()
      .min(4, 'At least 4 characters or more!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(4, 'Too short')
      .max(50, 'Too Long')
      .required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    referralCode: Yup.string(),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/users', {
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
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-[700px] shadow-2xl p-16 gap-4">
        <p className="flex justify-center text-xl text-blue-600 pt-5">Register</p>
        <Formik
          initialValues={{
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            referralCode: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col justify-center w-full mx-auto gap-3">
              <p>Firstname</p>
              <Field
                type="text"
                name="firstName"
                placeholder="Your firstname"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-600"
              />

              <p>Lastname</p>
              <Field
                type="text"
                name="lastName"
                placeholder="Your lastname"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-600"
              />

              <p>Username</p>
              <Field
                type="text"
                name="username"
                placeholder="Your Username"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600"
              />

              <p>Email</p>
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
              <p>Password</p>
              <Field
                type="password"
                name="password"
                placeholder="Your password"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-xs text-wrap max-w-96 "
              />
              <p>Referral Code</p>
              <Field
                type="text"
                name="referralCode"
                placeholder="Your Referral Code"
                className="border-2 border-solid border-black"
              />
              <ErrorMessage
                name="referralCode"
                component="div"
                className="text-red-600"
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

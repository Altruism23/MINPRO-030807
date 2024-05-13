'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
export default function Page() {
  const loginSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });

  const router = useRouter();
  const handleSubmit = async (values: any, actions: any) => {

    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        alert('Login Successful');
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      console.error('Error', error);
      alert('Error Login');
    }
    actions.resetForm();
  };

  return (
    <div className="flex justify-center w-full p-32 h-full">
      <div className="flex flex-col shadow-2xl p-32 gap-4">
        <p className="flex justify-center text-xl text-blue-600">Login</p>
        <Formik
          initialValues={{
            data: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex flex-col gap-2">
              <p>Email or username</p>
              <Field
                type="text"
                name="data"
                placeholder="Your email / username"
                className="border rounded-lg"
              />
              <p>Password</p>
              <Field
                type="password"
                name="password"
                placeholder="Your password"
                className="border rounded-lg"
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

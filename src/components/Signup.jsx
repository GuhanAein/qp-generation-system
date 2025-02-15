import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Use 8 or more characters with a mix of letters, numbers & symbols')
    .required('Password is required'),
  role: Yup.string()
    .required('Role is required')
});

const SignupForm = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log('User created:', userCredential.user);
      navigate('/Login'); // Redirect after successful signup
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create an account</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            role: ''
          }}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">User name</label>
                <Field
                  name="username"
                  type="text"
                  className="w-full p-3 border rounded-lg text-lg"
                />
                {errors.username && touched.username && 
                  <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Email address</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-3 border rounded-lg text-lg"
                />
                {errors.email && touched.email && 
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-3 border rounded-lg text-lg"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </div>
                {errors.password && touched.password && 
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full p-3 border rounded-lg text-lg bg-white"
                >
                  <option value="">Select a role</option>
                  <option value="user">Faculty</option>
                  <option value="admin">Reviewer</option>
                </Field>
                {errors.role && touched.role && 
                  <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Create an account
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-lg">
          Already have an account? {' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
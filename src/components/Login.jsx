import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  role: Yup.string()
    .required('Role is required')
});

const LoginForm = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      
      // Store the user role and email in localStorage for persistence
      localStorage.setItem('userRole', values.role);
      localStorage.setItem('userEmail', values.email);
      
      console.log('Login successful', values.role); // Debug log
      
      // Redirect based on role - using exact match with select option values
      if (values.role === 'Faculty') {
        console.log('Redirecting to faculty'); // Debug log
        navigate('/faculty');
      } else if (values.role === 'Reviewer') {
        console.log('Redirecting to reviewer'); // Debug log
        navigate('/reviewer');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError('Failed to login. Please check your credentials.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
          <p className="text-center mt-2">
            <Link to="/signup" className="text-gray-600 hover:text-gray-800">
              new user? Register
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
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
          validationSchema={loginSchema}
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
                  <option value="Faculty">Faculty</option>
                  <option value="Reviewer">Reviewer</option>
                </Field>
                {errors.role && touched.role && 
                  <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
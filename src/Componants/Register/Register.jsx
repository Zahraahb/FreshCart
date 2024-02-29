import axios from 'axios';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')

  async function getRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      
      if (data.message == 'success') {
        navigate('/')
        setMsg('')
        setLoading(false)

      }

    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false)
    }
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Too short min is 2').max(10, 'Too long max is 10'),
    email: Yup.string().required('Email is requiered').email('email not valid'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password is invalid'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref("password")], 'input must matches password'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),

  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""

    },
    validationSchema,
    onSubmit: getRegister,

  })

  return (
    <div>
      

        <form className='w-75  mx-auto my-4' onSubmit={formik.handleSubmit}>
          <h4 className=' '>Register Now:  </h4>
          {msg ? <p className='alert alert-danger'>{msg + '!'}</p> : ''}
          <label htmlFor="name">name:</label>
          <input type="text" name="" id="name" className='form-control mb-2' value={formik.values.name} onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}

          <label htmlFor="email">email:</label>
          <input type="email" name="" id="email" className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

          <label htmlFor="password">password:</label>
          <input type="password" name="" id="password" className='form-control mb-2' value={formik.values.password} onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}

          <label htmlFor="rePassword">rePassword:</label>
          <input type="password" name="" id="rePassword" className='form-control mb-2' value={formik.values.rePassword} onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}

          <label htmlFor="phone">phone:</label>
          <input type="tel" name="" id="phone" className='form-control mb-2' value={formik.values.phone} onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}

          <button disabled={!(formik.isValid && formik.dirty)} className='ms-auto btn green-btn text-white d-block ' type='submit'>{loading ?
            <Bars
            height="20"
            width="60"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            /> : 'Register'}</button>
        </form>
      
    </div>
  )
}

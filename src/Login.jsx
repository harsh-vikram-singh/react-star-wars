import React from 'react';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

  const handleChange = (e) => {
    if (e.target.value === '') {
      console.log('empty string detected');
    }
    if (e.target.id === 'username') {
      props.captureInput({
        username: e.target.value
      })
    } else if (e.target.id === 'password') {
      props.captureInput({
        password: e.target.value
      })
    }
  }

  return (
    <div className='p-10 rounded-md shadow-xl bg-gray-50 w-1/5 m-auto my-10 min-w-min ring-1 ring-gray-300'>
      <p className='text-center my-1 text-2xl font-semibold text-gray-600'>Login</p>
      <form className='flex flex-col justify-center items-center my-5 p-5'
        onSubmit={e => {
          e.preventDefault();
          props.handleSubmit();
        }}
      >
        <label htmlFor='username'>
          <p className='text-left text-gray-600'>Username</p>
          <input className='rounded bg-gray-200 focus:ring-1 p-1 min-w-min'
          type='text'
          id='username'
          onChange={e => handleChange(e)}
          value={props.username}
        />
        </label>
        <br/><br/>
        <label htmlFor='password'>
          <p className='Password text-gray-600'>Password</p><input className='rounded bg-gray-200 p-1 min-w-min'
            id='password'
            type='password'
            onChange={e => handleChange(e)}
            value={props.password}
          />
        </label>

        <br/><br/>
        <button className='rounded bg-red-600 p-2 text-semibold text-gray-50 hover:bg-red-500' type='submit'>
          <span>Submit</span>
        </button>
      </form>
    </div>
  )
};

export default withRouter(Login)
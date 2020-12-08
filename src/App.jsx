import React, {useState, useEffect} from 'react';
import { withRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Planets from './Planets';
import Login from './Login';
import Card from './Card';
import TestimonialSwitcher from './TestimonialSwitcher';
import testimonials from './testimonialsData'

const App = (props) => {

  const [username, setUsername] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [loginClickCount, setLoginClickCount] = useState(() => 0);
  const [testimonialNumber, setTestimonialNumber] = useState(() => 0);

  const validateUser = (apiUsername, apiPassword) => {
    if (apiUsername === username && apiPassword === password) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (loginClickCount > 0) {
      axios.get('https://swapi.dev/api/people', {
        params: {
          search: username
        }
      })
        .then(response => {
          if (response.data.count > 0) {
            let userData = (response.data.results[0]);
            let apiUsername = userData.name;
            let apiPassword = userData.birth_year
            if (validateUser(apiUsername, apiPassword)) {
              // setIsLoggedIn(() => true);
              console.log('successfully logged in!');
              props.history.push('/planets', [true, username])
            } else {
              console.log('please check username and password');
            }
              setUsername('');
              setPassword('');
          } else {
            console.log('please check username and password!');
          }
        })
        .catch(error => console.log('following error occured while trying to fetch the user information: ', error));
    }
  }, [loginClickCount])

  const captureInput = (loginFormValues) => {
    if (loginFormValues.username !== '' && loginFormValues.username !== undefined) {
      setUsername(loginFormValues.username);
    } else if (loginFormValues.username === '') {
      setUsername('');
    } else if (loginFormValues.password !== '' && loginFormValues.password !== undefined) {
      setPassword(loginFormValues.password);
    } else if (loginFormValues.password === '') {
      setPassword('');
    }
  }

  const handleSubmit = () => {
    console.log('user entered the following values');
    console.log(`username: ${username}, password: ${password}`);
    setLoginClickCount(prev => prev + 1);
  }

  const handleTestimonialSwitcherClick = (direction) => {
    if (direction === 'switchLeft') {
      if ((testimonialNumber - 1) < 0) {
        console.log('setting testimonialNumber to: ', testimonials.testimonials.length - 1)
        setTestimonialNumber(testimonials.testimonials.length - 1);
      } else {
        setTestimonialNumber(prev => prev - 1);
      }
    } else if (direction === 'switchRight') {
      if ((testimonialNumber + 1) === testimonials.testimonials.length) {
        setTestimonialNumber(prev => 0);
      } else {
        setTestimonialNumber(prev => prev + 1);
      }
    }
  }

  return (
    <div className='min-w-full grid grid-cols-12 bg-gray-100 min-h-screen'>
      <div className='col-span-2'></div>
      <div className='col-span-8'>
        <Route path='/' exact render={props =>
          <div className='flex flex-col align-center justify-center my-10'>
            <div className='bg-gray-100 col-span-12'>
              <h1 className='text-6xl tracking-wide py-10 font-bold text-gray-700 text-center'>React Star Wars</h1>
            </div>
            <p className='text-2xl text-gray-700 text-center'>Welcome! You have found the planets explorer.</p>
            <Login
              {...props}
              captureInput={captureInput}
              handleSubmit={handleSubmit}
              username={username}
              password={password}
            />
            <div>
              <p className='text-center mt-10 mb-5 font-semibold'>
                See what our users are saying
              </p>
              <div className='flex flex-row items-center'>
                <TestimonialSwitcher direction='left'
                  handleTestimonialSwitcherClick={handleTestimonialSwitcherClick}
                />
                <Card
                  testimonials={testimonials}
                  testimonialNumber={testimonialNumber}
                />
                <TestimonialSwitcher
                handleTestimonialSwitcherClick={handleTestimonialSwitcherClick}
                direction='right' />
              </div>
            </div>
            <p className='text-center mt-10'>made with &#10084; for Xebia</p>
          </div>
        } />
        <Route path='/planets' exact render={props =>
            <Planets
              {...props}
              username={username}
            />
        } />
      </div>
      <div className='col-span-2'></div>
    </div>
  )
}

export default withRouter(App)
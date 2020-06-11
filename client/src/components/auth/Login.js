import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export const Login = ({ login, isAuthenticated }) => {
   const [ formData, setFormData ] = useState({
      email: '',
      password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
      e.preventDefault();
      login({email, password});
  }

  // Redirect if logged in
  if(isAuthenticated) {
     return <Redirect to="/home" />;
  }

    return (
        <div>
            <div className="col-md-6 mx-auto text-center">
         <div className="header-title">
            <h1 className="wv-heading--title registerh1">
               Sign In
            </h1>
         </div>
      </div>
      <div className="row">
         <div className="col-md-4 mx-auto">
            <div className="myform form ">
               <form action="" method="post" name="login" onSubmit={e => onSubmit(e)}>
                  <div className="form-group">
                     <input type="email" name="email"  className="form-control my-input" id="email" placeholder="Enter your email" value={email} onChange={e => onChange(e)} required />
                  </div>
                  <div className="form-group">
                     <input type="password" min="6" name="password" id="password"  className="form-control my-input" placeholder="Enter your password" value={password} onChange={e => onChange(e)} required />
                  </div>
                  <div className="text-center ">
                     <button type="submit" className=" btn btn-block send-button tx-tfm">Sign In</button>
                  </div>
               </form>
            </div>
            <p className="altSign">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
         </div>
      </div>
        </div>
    )
};

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
   
});

export default connect(mapStateToProps, { login })(Login);
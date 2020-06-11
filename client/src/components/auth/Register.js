import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: ''
	});

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		
		register({ name, email, password });
	};

	if(isAuthenticated) {
		return <Redirect to="/home"/>
	}

	return (
		<div className="container">
			<div className="col-md-6 mx-auto text-center">
				<div className="header-title">
					<h1 className="wv-heading--title registerh1">Sign Up</h1>
					<h2 className="wv-heading--subtitle registerh2">
						Create a yourTodoList account to start creating and managing your tasks
					</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-md-4 mx-auto">
					<div className="myform form ">
						<form action="" method="post" name="login" onSubmit={(e) => onSubmit(e)}>
							<div className="form-group">
								<input
									type="text"
									name="name"
									className="form-control my-input"
									id="name"
									placeholder="Name"
									value={name}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									name="email"
									className="form-control my-input"
									id="email"
									placeholder="Email"
									value={email}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									min="6"
									name="password"
									id="password"
									className="form-control my-input"
									placeholder="Password of at least 6 characters"
									value={password}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="text-center">
								<button type="submit" className=" btn btn-block send-button tx-tfm">
									Register
								</button>
							</div>
						</form>
					</div>
					<p className="altSign">
						Already have an account? <Link to="/login">Sign In</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
	
 });

export default connect(mapStateToProps, { setAlert, register })(Register);

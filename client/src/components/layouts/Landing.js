import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
	return (
		<div className="container app">
			<h1> Welcome To yourTodoList </h1>
			<div id="form" className="container col-sm-10">
				<div className="row align-items-center justify-content-center">
					<div className="col-md-3 col-sm-6">
						<Link
							to="/register"
							type="submit"
							className=" btn btn-block send-button tx-tfm"
							role="button"
						>
							{' '}
							Register{' '}
						</Link>{' '}
					</div>{' '}
					<div className="col-md-3 col-sm-6">
						<Link to="/login" type="submit" className=" btn btn-block send-button tx-tfm" role="button">
							{' '}
							Sign In{' '}
						</Link>{' '}
					</div>{' '}
				</div>
			</div>{' '}
		</div>
	);
};

export default Landing;

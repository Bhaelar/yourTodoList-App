import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks } from '../../actions/task';
import Homelayout from './Homelayout';
import ListItem from './ListItem';

export const Home = ({ getTasks, task: { tasks } }) => {
	useEffect(
		() => {
			getTasks();
		},
		[ getTasks ]
	);

	return (
		<Fragment>
			<Homelayout />
			<div className="viewTasks">
				<h2> Scheduled Tasks </h2>{' '}
				<div className="container tasks">
					<div className="">
						{tasks.length > 0 ? (
							tasks.map((task) => <ListItem key={task._id} className="row col-md-12" task={task} />)
						) : (
							<p>You have no Scheduled Tasks</p>
						)}
					</div>{' '}
				</div>{' '}
			</div>{' '}
		</Fragment>
	);
};

Home.propTypes = {
	getTasks: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	task: state.task
});

export default connect(mapStateToProps, { getTasks })(Home);

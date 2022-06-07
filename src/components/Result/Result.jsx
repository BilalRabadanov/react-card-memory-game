import React from 'react';
import PropTypes from 'prop-types';

import styles from './Result.module.css';

const Result = ({ restartGame }) => {
	return (
		<div className={`${styles.container} frosted`}>
			<p>Awesome!</p>
			<button className={`${styles.button} frosted`} onClick={restartGame}>
				Finish Game
			</button>
		</div>
	)
}

export default Result;

Result.propTypes = {
	restartGame: PropTypes.func.isRequired
}
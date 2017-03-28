import React, { PropTypes } from 'react';
import styles from './ExpandingCircle.scss';

const ExpandingCircle = ({ backgroundColor }) => (
  <div className={styles.circle} style={{ backgroundColor }}>
    <div className={styles.topContent}>Burrito</div>
    <div className={styles.midContent}>Taco</div>
    <div className={styles.bottomContent}>Carnitas</div>
  </div>
);

ExpandingCircle.propTypes = {
  backgroundColor: PropTypes.string,
};

ExpandingCircle.defaultProps = {
  backgroundColor: 'grey',
};

export default ExpandingCircle;

/**
 * @module routes/home/components/home
 * Home page view component
 */
import React from 'react';
import ExpandingCircle from 'client/components/ExpandingCircle/ExpandingCircle';

/**
 * Home view component
 */

const props = { backgroundColor: 'blue' };
const Home = () => (
  <div>
    <ExpandingCircle {...props} />
  </div>
);

export default Home;

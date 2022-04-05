import React from 'react';
import dice from './assets/dice.png';

function Loader() {
  return (
    <div className="loaderContainer">
      <div className="loader">
        <img src={dice} alt="" />
      </div>
    </div>
  );
}

export default Loader;

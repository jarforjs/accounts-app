import React from 'react';
import {view as Counter, stateKey, reducer} from '../components/Counter';

const page = () => {
  return (
    <div>
      <div>Counter</div>
      <Counter caption="any"/>
    </div>
  );
};
const initialState = 100;

// export default page
export {page, reducer, initialState, stateKey}
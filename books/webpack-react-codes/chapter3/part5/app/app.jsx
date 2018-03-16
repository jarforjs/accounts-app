import React from 'react';
import {render} from 'react-dom';
// import Profile from '../components/Profile';
import Profile from './Profile';

const props={
    name:'jeawon gu',
    age:30
};

const app=document.createElement('div');
document.body.appendChild(app);

render(<Profile{...props}/>,app);

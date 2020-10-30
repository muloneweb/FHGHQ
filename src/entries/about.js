import React from 'react';
const ReactDOM = require('react-dom');
import Top from '../components/Index-top';
const steamid = document.cookie.substring(document.cookie.indexOf(" steamid=")+9,document.cookie.indexOf(" steamid=")+26);
window.steamid = steamid;
Top.RenderTop();
$('body').scrollspy({ target: '#myScrollspy' })
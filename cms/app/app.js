import React                from 'react';
import ReactDom             from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Macros               from './Components/Kate/App';
window.React = React;
injectTapEventPlugin();

ReactDom.render((
  <Macros/>
),  document.getElementById('content'))

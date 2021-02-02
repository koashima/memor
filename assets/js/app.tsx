import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.scss'
import MemorApp from './MemorApp/';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MemorApp');
  if (!container) return;
  ReactDOM.render(<MemorApp />, container);
});

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CyclingFundraisingPlanner from './cycling_fundraiser_planner.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode> 
      <CyclingFundraisingPlanner />
    </React.StrictMode>
  );
}
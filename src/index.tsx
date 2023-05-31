// Top level of react app. Don't really need to do anything in here.
import App from './components/App';
import './style.css';

import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('app')!;//"!" is a null check

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);

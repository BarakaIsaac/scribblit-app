import React from 'react';
import ReactDOM from 'react-dom';


window.store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
    if (window.currentUser) {
        const initialState = {
            session: {
                currentUser: window.currentUser
            }
        };
        window.store = configureStore(initialState);
    } else {
        window.store = configureStore();
    }
    Modal.setAppElement(document.body);
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
})
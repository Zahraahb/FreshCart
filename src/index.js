import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CounterContextProvider } from './CounterContext.js'
import { UserContextProvider } from './UserContext.js';
import { CartContextProvider } from './CartContext.js'
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

import toast, { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      
    },
    
  
    
  },
  
  
  
});
root.render(
    <UserContextProvider>
        <CartContextProvider>
            <CounterContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Toaster/>
                    <App />
                    
                </QueryClientProvider>
            </CounterContextProvider>
        </CartContextProvider>
    </UserContextProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

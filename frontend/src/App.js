import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvide } from './ContextReducer/ContextReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Screen/Home";
import Navbar from './Components/Navbar';
import Login from './LogIn_SignUp/Login';
import Footer from './Components/Footer';
import SignUp from './LogIn_SignUp/SignUp';
import Cart from './Screen/Cart';
import MyOrder from './Screen/MyOrders';

function App() {
  return (
    <div className='w-full max-w-screen-2xl mx-auto'>
      <Router>
        <CartProvide>
          {/* Fixed Navbar */}
          <div className='fixed top-0 z-50'>
            <Navbar />
          </div>

          {/* Toastyfy Container PopUp */}
          <ToastContainer position="top-right w-full" autoClose={2000} theme="colored" />

          {/* Main content with top and bottom padding to make room for fixed navbar and footer */}
          <main className='md:pt-[6.5vh] pb-[6vh] dark:bg-gray-900 w-full max-w-screen-2xl mx-auto min-h-screen'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/register' element={<SignUp />} />
              <Route path='/myOrder' element={<MyOrder />} />
            </Routes>
          </main>

          {/* Fixed Footer */}
          <div className='fixed bottom-0 z-50'>
            <Footer />
          </div>
        </CartProvide>
      </Router>
    </div>


  );
}

export default App;  
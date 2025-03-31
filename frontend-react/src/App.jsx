import { createContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import SelectedPhotosProvider from "./components/store/PhotoContext.jsx";
import CartProvider from "./components/store/CartContext.jsx";
import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import ErrorPage from "./pages/Error.jsx";
import ShopEnter from "./pages/ShopEnter.jsx";
import PhotoAlbum from "./pages/PhotoAlbum.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import AddAlbum from "./admin/Photo/AddAlbum.jsx";
import AddPhoto from "./admin/Photo/AddPhoto.jsx";
import Customer from "./admin/Customer/Customer.jsx";
import CustomerOrder from "./admin/Customer/CustomerOrder.jsx";
import CustomerContact from "./admin/Customer/CustomerContact.jsx";
import useAutoLogout from "./hooks/useAutoLogout";

export const PhotoContext = createContext({
  shopData: null,
});

function App() {
  useAutoLogout();
  return <RouterProvider router={router} />;
}
function ScrollWrapper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Outlet />;
}
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SelectedPhotosProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </SelectedPhotosProvider>),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            element: <ScrollWrapper />,
            children: [
              { path: '', element: <HomePage /> },
              { path: 'contact', element: <Contact /> },
              {
                path: 'shop', element: <Outlet />,
                children: [
                  { index: true, element: <ShopEnter /> },
                  {
                    path: ':albumId',
                    children: [
                      { index: true, element: <PhotoAlbum /> },
                      { path: 'cart', element: <Cart /> },
                      { path: 'checkout', element: <Checkout /> }
                    ]
                  }
                ]
              },
              { path: 'order', element: <Order /> },
              { path: 'login', element: <Login /> },
              { path: 'signup', element: <Signup /> },
              { path: 'impressum', element: <Impressum /> },
              { path: 'datenschutz', element: <Datenschutz /> },
              { path: 'admin/album', element: <AddAlbum /> },
              { path: 'admin/album/:albumId', element: <AddPhoto /> },
              { path: 'admin/customer', element: <Customer /> },
              { path: 'admin/customer/:customerId', element: <CustomerOrder /> },
              { path: 'admin/contact', element: <CustomerContact /> },
            ],
          },
        ],
      }
    ],
  }
]);

export default App


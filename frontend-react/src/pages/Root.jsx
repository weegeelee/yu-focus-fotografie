import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SelectedPhotosProvider from "../components/store/PhotoContext.jsx";
import CartProvider from "../components/store/CartContext.jsx";
import UserProgressContextProvider from "../components/store/UserProgressContext.jsx";

export default function RootLayout() {
  return (
    <SelectedPhotosProvider>
      <CartProvider>
        <UserProgressContextProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </UserProgressContextProvider>
      </CartProvider>
    </SelectedPhotosProvider>
  );
}
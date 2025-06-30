import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="container min-h-screen min-w-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex flex-grow item-center justify-center p-4">
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

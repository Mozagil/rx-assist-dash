import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      {/* Main content area — uses CSS var for sidebar width */}
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;

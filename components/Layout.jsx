import Banner from "./Banner";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {/* <Banner /> */}
      <main>{children}</main>
    </div>
  );
}

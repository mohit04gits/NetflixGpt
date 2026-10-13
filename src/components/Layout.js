// // Layout.js
// import Header from "./Header";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Header />
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;


import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
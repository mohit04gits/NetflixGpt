// // import { createBrowserRouter } from "react-router-dom";
// // import Browse from "./Browse";
// // import { RouterProvider } from "react-router-dom";
// // import Login from "./Login";

// // import MovieDetails from "./MovieDetails";

// // const Body = () => {
// //   const appRouter = createBrowserRouter([
// //     {
// //       path: "/",
// //       element: <Login />,
// //     },
// //     {
// //       path: "/browse",
// //       element: <Browse />,
// //     },
// //     {
// //       path: `/moviedetails/:id`, // dynamic routing used here
// //       element: <MovieDetails />,
// //     },
// //   ]);

// //   return (
// //     <div>
// //       <RouterProvider router={appRouter}></RouterProvider>
// //     </div>
// //   );
// // };

// // export default Body;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./Login";
// import Layout from "./Layout";
// import Browse from "./Browse";
// import MovieDetails from "./MovieDetails";
// import MovieTrailer from "./MovieTrailer";
// import CompareMovies from "./CompareMovies";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/browse",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Browse />,
//       },
//       {
//         path: "moviedetails/:id", // ✅ /browse/moviedetails/:id
//         element: <MovieDetails />,
//       },
//       {
//         path: "movietrailer/:id", // ✅ /browse/movietrailer/:id
//         element: <MovieTrailer />,
//       },
//       {
//         path: "compare",
//         element: <CompareMovies />,
//       },
//     ],
//   },
// ]);

// const Body = () => {
//   return <RouterProvider router={appRouter} />;
// };

// export default Body;



import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import Browse from "./Browse";
import MovieDetails from "./MovieDetails";
import MovieTrailer from "./MovieTrailer";
import CompareMovies from "./CompareMovies";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Browse />,
      },
      {
        path: "moviedetails/:id",
        element: <MovieDetails />,
      },
      {
        path: "movietrailer/:id",
        element: <MovieTrailer />,
      },
      {
        path: "compare",
        element: <CompareMovies />,
      },
    ],
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
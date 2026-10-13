// const VideoTitle = ({ title, overview }) => {
//   return (
//     <div className="relative z-20 flex flex-col justify-center h-full px-4 sm:px-8 md:px-16 py-4 sm:py-6">
//       <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white max-w-full mb-2">
//         {title}
//       </h1>
//       <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-lg mt-2 mb-4 line-clamp-2">
//         {overview}
//       </p>
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
//         <button className="bg-white text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm md:text-base font-semibold hover:bg-opacity-80 transition-all duration-200 w-fit">
//           ▶️ Play
//         </button>
//         <button className="bg-gray-500 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm md:text-base font-semibold bg-opacity-70 hover:bg-opacity-90 transition-all duration-200 w-fit">
//           More Info
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoTitle;








const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full max-w-3xl px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-red-600" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 sm:text-sm">
          Featured Film
        </span>
      </div>

      <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h1>

      <p className="mt-5 max-w-xl text-sm leading-6 text-gray-200 drop-shadow-lg sm:text-base sm:leading-7 md:mt-6 md:text-lg">
        {overview}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition duration-200 hover:scale-[1.03] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white sm:px-7 sm:py-3.5 sm:text-base"
        >
          <span aria-hidden="true" className="text-xl">▶</span>
          Play Now
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:px-7 sm:py-3.5 sm:text-base"
        >
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full border border-white/80 text-xs">i</span>
          More Info
        </button>
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
        Discover your next favorite movie
      </p>
    </div>
  );
};

export default VideoTitle;

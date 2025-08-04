const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-20 flex flex-col justify-center h-full px-4 sm:px-8 md:px-16 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white max-w-full mb-2">
        {title}
      </h1>
      <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-lg mt-2 mb-4 line-clamp-2">
        {overview}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
        <button className="bg-white text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm md:text-base font-semibold hover:bg-opacity-80 transition-all duration-200 w-fit">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm md:text-base font-semibold bg-opacity-70 hover:bg-opacity-90 transition-all duration-200 w-fit">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

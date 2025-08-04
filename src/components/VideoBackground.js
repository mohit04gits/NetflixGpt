import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);

  useMovieTrailer(movieId);
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <iframe
        className="w-full h-full object-cover"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=" + trailerVideo?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

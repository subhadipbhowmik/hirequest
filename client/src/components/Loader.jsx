const Loader = ({ fullScreen = false }) => (
  <div
    className={`flex items-center justify-center ${
      fullScreen ? "min-h-screen" : "min-h-[200px]"
    }`}
  >
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

export default Loader;

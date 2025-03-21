function Loader() {
  return (
    <div className="flex justify-center items-center py-4">
      <div 
        data-testid="loading-spinner"
        className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"
      />
    </div>
  );
}

export default Loader;

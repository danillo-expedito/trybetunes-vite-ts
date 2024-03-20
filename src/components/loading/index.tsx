import './styles.css';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" />
      <p className="text-xl text-red-700">Carregando...</p>
    </div>
  );
}

export default Loading;

import bg from "./assets/bg.png";

function App() {
  return (
    <div className="flex">
      <img src={bg} className="w-screen h-screen fixed z-0" />
      <div className="w-screen h-screen bg-black/10 fixed z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-9xl text-white">Hello, World!</h1>
      </div>
    </div>
  );
}

export default App;

import bg from "./assets/bg.png";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className=" z-10 my-auto justify-center ">
        <div className=" flex flex-col items-center justify-center text-white font-bold font-oswald">
          <div className=" gap-y-3  w-[380px] h-[330px] rounded-xl bg-login-gray px-[48px]">
            <div className="w-full h-full items-center justify-center flex flex-col">
              <h1 className=" text-white text-center w-full text-4xl mb-5 ">
                LOGIN
              </h1>
              <div className="flex flex-col gap-y-5 w-full">
                <div className="flex-col text-3xl w-full">
                  <h1>USUÁRIO:</h1>
                  <input
                    type="text"
                    className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                  />
                </div>
                <div className="flex-col text-3xl w-full">
                  <h1>SENHA:</h1>
                  <input
                    type="password"
                    className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                  />
                </div>
              </div>

              <button className="text-2xl mt-5 bg-red-bordo hover:bg-red-900 duration-300 transition-colors w-fit p-2 px-8 rounded-3xl">
                ENTRAR
              </button>
            </div>
          </div>
          <div className="bg-login-gray mt-10 w-fit px-4 flex items-center justify-center text-lg p-2 rounded-3xl gap-x-3 text-center">
            <h1>NÃO TEM CADASTRO?</h1>
            <button className="bg-red-bordo p-1 px-3 rounded-3xl ml-3 hover:bg-red-900 duration-300 transition-colors ">
              CADASTRE-SE
            </button>
          </div>
        </div>
      </div>
      <img src={bg} className="w-screen h-screen fixed z-0" />
      <div className="w-screen h-screen bg-black-filter opacity-[39%] fixed z-0" />
    </div>
  );
}

export default App;

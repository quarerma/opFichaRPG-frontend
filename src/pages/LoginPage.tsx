import { useState } from "react";
import bg from "../assets/bg.png";
import { GiBleedingEye } from "react-icons/gi";
import { GiEyelashes } from "react-icons/gi";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className=" z-10 my-auto justify-center ">
        <div className=" flex flex-col items-center justify-center text-white font-bold font-oswald">
          <div className=" gap-y-3  w-[380px] max-sm:w-[300px] h-[330px] rounded-xl bg-login-gray px-[48px] max-sm:px-5">
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
                  <h1 className="mb-1">SENHA:</h1>
                  <div className="flex relative h-full justify-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                    />
                    {showPassword ? (
                      <GiBleedingEye
                        className="absolute top-0 right-0 mt-1 mr-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                        style={{ color: "black" }}
                      />
                    ) : (
                      <GiEyelashes
                        className="absolute top-0 right-0 mt-1 mr-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                        style={{ color: "black" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <button className="text-2xl mt-5 bg-red-bordo hover:bg-red-900 duration-300 transition-colors w-fit p-2 px-8 rounded-3xl">
                ENTRAR
              </button>
            </div>
          </div>
          <Link
            to={"/create-account"}
            className="bg-login-gray mt-10 w-fit px-4 flex items-center justify-center text-lg p-2 rounded-3xl gap-x-3 text-center group"
          >
            <h1>NÃO TEM CADASTRO?</h1>
            <Link
              to={"/create-account"}
              className="bg-red-bordo p-1 px-3 rounded-3xl ml-3 group-hover:bg-red-900 duration-300 transition-colors "
            >
              CADASTRE-SE
            </Link>
          </Link>
        </div>
      </div>
      <img src={bg} className="w-screen h-screen fixed z-0" />
      <div className="w-screen h-screen bg-black-filter opacity-[39%] fixed z-0" />
    </div>
  );
}

export default Login;

import { FormEvent, useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { GiBleedingEye } from "react-icons/gi";
import { GiEyelashes } from "react-icons/gi";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../env";
import { IoReturnUpBack } from "react-icons/io5";

type CreateAccountProps = {
  username: string;
  email: string;
  password: string;
};

const emailSchema = z.string().email();

export const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateUserName = () => {
      setUserNameError("");
      if (userName.length < 5) {
        setUserNameError("Nome muito curto! Mínimo de 5 caracteres.");
      }
    };
    validateUserName();
  }, [userName]);

  useEffect(() => {
    setEmailError("");
    const validateEmail = () => {
      try {
        emailSchema.parse(email);
      } catch (e) {
        setEmailError("Email inválido!");
      }
    };
    validateEmail();
  }, [email]);

  useEffect(() => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    const validatePasswords = () => {
      if (password.length < 7) {
        setPasswordError(true);
      }
    };
    validatePasswords();
  }, [password]);

  useEffect(() => {
    setErrorsNull();
  }, []);

  const setErrorsNull = () => {
    console.log("setting errors to null");
    setUserNameError("");
    setEmailError("");
    setPasswordError(false);
    setError("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submitting form");
    setConfirmPasswordError(false);
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    }

    if (!userName && !email && !password && !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    if (
      userNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      error
    ) {
      return;
    }

    try {
      const newAccount: CreateAccountProps = {
        username: userName.trim(),
        email,
        password,
      };

      const response = await axios.post(`${BASE_URL}users/create`, newAccount);
      console.log(response);

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const status = axiosError.response.status;
          const data = axiosError.response.data;
          if (status === 409) {
            setError(data.message);
          }
        }
      }
    }
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen w-screen flex flex-col text-white font-bold font-oswald ">
      <div className=" z-10 my-auto justify-center ">
        <div className=" flex flex-col items-center justify-center ">
          <div className=" gap-y-3  w-[380px] max-sm:w-[300px] h-fit py-5 rounded-xl bg-login-gray shadow-2xl px-8 max-sm:px-5">
            <div className="w-full h-full items-center justify-center flex flex-col">
              <div className="flex w-full">
                <Link to="/login" title="Voltar">
                  <IoReturnUpBack
                    size={40}
                    className="font-extrabold absolute hover:scale-110 duration-300"
                  />
                </Link>
                <h1 className=" text-white text-center w-full text-4xl mb-5 ">
                  CADASTRE-SE
                </h1>
              </div>
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-y-3 w-full items-center"
              >
                <div className="flex-col text-[1.5rem] w-full">
                  <h1>USUÁRIO:</h1>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                  />
                  {userNameError && (
                    <span className="text-red-500 text-sm mt-1">
                      {userNameError}
                    </span>
                  )}
                </div>
                <div className="flex-col text-[1.5rem] w-full">
                  <h1>EMAIL:</h1>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                  />
                  {emailError && (
                    <span className="text-red-500 text-sm mt-1">
                      {emailError}
                    </span>
                  )}
                </div>
                <div className="flex-col text-[1.5rem] w-full">
                  <h1 className="mb-1">SENHA:</h1>
                  <div className="flex relative h-full justify-center">
                    <input
                      value={password.trim()}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                    />
                    {showPassword ? (
                      <GiBleedingEye
                        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                        style={{ color: "black" }}
                      />
                    ) : (
                      <GiEyelashes
                        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                        style={{ color: "black" }}
                      />
                    )}
                  </div>
                  {passwordError && (
                    <span className="text-red-500 text-sm mt-1">
                      Senha pequena! Mínimo de 7 caracteres.
                    </span>
                  )}
                </div>
                <div className="flex-col text-[1.5rem] w-full">
                  <h1 className="mb-1">CONFIRMAR SENHA:</h1>
                  <div className="flex relative h-full justify-center">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showConfirmPassword ? "text" : "password"}
                      className="text-black p-2 rounded-3xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
                    />
                    {showConfirmPassword ? (
                      <GiBleedingEye
                        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ color: "black" }}
                      />
                    ) : (
                      <GiEyelashes
                        className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ color: "black" }}
                      />
                    )}
                  </div>
                  {confirmPasswordError && (
                    <span className="text-red-500 text-sm mt-1">
                      Senhas diferem!
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-2xl mt-5 bg-red-bordo hover:bg-red-900 duration-300 transition-colors w-fit p-2 px-8 rounded-3xl"
                >
                  CRIAR CONTA
                </button>
              </form>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <img src={bg} className="w-screen h-screen fixed z-0" />
      <div className="w-screen h-screen bg-black-filter opacity-[39%] fixed z-0" />
    </div>
  );
};

export default CreateAccount;

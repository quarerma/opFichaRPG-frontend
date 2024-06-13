// import { Link } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getUserData } from "../../../data/user-data";
// import LogOff from "../../global-components/LogOff";

// export const HomePage = () => {
//   const queryClient = useQueryClient();
//   const { data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getUserData(queryClient),
//   });

//   return user ? (
//     <div className="w-screen h-screen bg-red-950 text-white font-oswald flex flex-col">
//       <div className="p-5 mt-10 mx-10 w-fit text-3xl bg-login-gray flex gap-x-5">
//         <span>Bem vindo(a), {user?.username}</span>
//         <LogOff />
//       </div>
//       <Link
//         to="/campanhas"
//         className="bg-login-gray mt-10 mx-10 w-fit text-3xl p-2 rounded-lg"
//       >
//         Mesas
//       </Link>
//       <Link
//         to="/mestrando"
//         className="bg-login-gray mt-10 mx-10 w-fit text-3xl p-2 rounded-lg"
//       >
//         Mestrando
//       </Link>
//     </div>
//   ) : (
//     <div className="w-screen h-screen bg-red-950"></div>
//   );
// };

export const HomePage = () => {
  return (
    <div className="h-full bg-red-bordo text-white">
      <h1>Home</h1>
    </div>
  );
};
export default HomePage;

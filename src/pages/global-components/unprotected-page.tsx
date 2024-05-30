export const UnProtected = ({ children }: React.PropsWithChildren) => {
  if (localStorage.getItem("jwt")) {
    window.location.href = "/home";
  }

  return <>{children}</>;
};

export default UnProtected;

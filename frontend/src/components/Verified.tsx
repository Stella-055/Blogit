import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../stores/userStore";

const Verified = ({ children }: { children: React.ReactNode }) => {
  const { isverified } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isverified) {
      navigate("/forgot/password");
    }
  }, [isverified]);
  return <>{children}</>;
};

export default Verified;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";
import { checkUserIsAdmin } from "../Utils";

const Admin = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkUserIsAdmin(user)) {
      navigate("../login", { replace: true });
    }
  }, [user]);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default Admin;

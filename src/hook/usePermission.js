import { useMemo } from "react";
import { useSelector } from "react-redux";

const usePermission = () => {
  const { user } = useSelector((state) => state.auth);

  const listPermission = useMemo(() => {
    return user.role.listPermission.map((p) => p.key);
  }, []);

  return listPermission;
};

export default usePermission;

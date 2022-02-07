import { useLocation } from "react-router-dom";

const usePathname = () => {
  const location = useLocation().pathname.slice(1);
  if (location.length === 0) {
    return "Home";
  } else {
    return location.charAt(0).toUpperCase() + location.slice(1);
  }
};

export default usePathname;
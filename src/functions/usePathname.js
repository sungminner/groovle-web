import { useLocation } from "react-router-dom";

const usePathname = () => {
  const location = useLocation().pathname.slice(1);
  if (location.length === 0) {
    return "Home";
  } else if (location.startsWith("song")) {
    return "Song";
  } else if (location.startsWith("studio")) {
    if (location.includes("editor")) {
      return "Editor";
    } else {
      return "Studio";
    }
  } else if (location.startsWith("recorder")) {
    return "Recorder";
  } else if (location.startsWith("profile")) {
    return "Profile";
  } else {
    return location.charAt(0).toUpperCase() + location.slice(1);
  }
};

export default usePathname;

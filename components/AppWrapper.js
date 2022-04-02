import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const AppWrapper = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith("/dashboard")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [router, setTheme]);

  return children;
};

export default AppWrapper;

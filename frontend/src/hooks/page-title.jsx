import { useEffect } from "react";

const usePageTitle = (title) => {
  const defaultTitle = "Admin";

  useEffect(() => {
    document.title = title? `${title} | ${defaultTitle}` : defaultTitle;
  }, [defaultTitle, title]);
};

export { usePageTitle };

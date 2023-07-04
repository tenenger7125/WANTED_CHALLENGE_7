import React, { useEffect, useState } from "react";

type RouterProps = {
  children: React.ReactNode;
};

const Router = ({ children }: RouterProps) => {
  const [pathname, setPathname] = useState(location.pathname);

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) return React.cloneElement(child, { pathname } as { pathname: string });

    return child;
  });

  useEffect(() => {
    const onPopstate = () => setPathname(location.pathname);

    window.addEventListener("popstate", onPopstate);

    return () => {
      window.removeEventListener("popstate", onPopstate);
    };
  }, []);

  return clonedChildren;
};

export default Router;

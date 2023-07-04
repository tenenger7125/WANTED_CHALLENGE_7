import React, { useEffect, useState } from "react";

type RoutesProps = {
  children: React.ReactNode;
};

const Routes = ({ children }: RoutesProps) => {
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    const onPopstate = () => setPathname(location.pathname);

    window.addEventListener("popstate", onPopstate);

    return () => {
      window.removeEventListener("popstate", onPopstate);
    };
  }, []);
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) return React.cloneElement(child, { pathname } as { pathname: string });

    return child;
  });

  return clonedChildren;
};

export default Routes;

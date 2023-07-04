type RouteProps = {
  path: string;
  component: React.ReactNode;
  pathname?: string;
};

const Route = ({ path, component, pathname }: RouteProps) => {
  if (pathname === path) return component;
};

export default Route;

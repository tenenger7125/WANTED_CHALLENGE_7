type RouteProps = {
  path: string;
  component: React.ReactNode;
  pathname?: string;
};

const Route = ({ path, component, pathname }: RouteProps) => {
  return pathname === path ? component : null;
};

export default Route;

import useRouter from "./../hooks/useRouter";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  state?: { [index: string]: unknown };
};

const Link = ({ to, children, state }: LinkProps) => {
  const { push } = useRouter();

  const onClick = () => {
    push(to, state);
  };

  return <button onClick={onClick}>{children}</button>;
};

export default Link;

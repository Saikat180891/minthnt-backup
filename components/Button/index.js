import tw from "twin.macro";

const Button = ({ children, ...rest }) => {
  return (
    <button tw="outline-none focus:outline-none active:outline-none" {...rest}>
      {children}
    </button>
  );
};

export default Button;

import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

const Email = (props) => {
  const { url } = props;

  return (
    <Html lang="en" dir="ltr">
      <Button href={url}>Click me</Button>
    </Html>
  );
};

export default Email;

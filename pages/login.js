import tw from "twin.macro";
import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
} from "@chakra-ui/react";
import Apis from "../context/apis";
import React from "react";
import { Form, Field, Formik } from "formik";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setUserDetails } from "../store/actions/user.actions";

const LoginPage = ({ setUser, isLoggedIn }) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (payload) => {
    try {
      const res = await Apis.login(payload);
      if (!res) throw Error({ error: "Invalid Credentials" });
      Cookie.set("token", `${res?.token}`, { expires: res?.expires });
      setUser({ ...res, isLoggedIn: true });
      setTimeout(() => router.push("/"), 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      overflow="hidden"
      width="100%"
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      backgroundImage="url(/images/jpg/main-background.jpg)"
      backgroundSize="cover"
    >
      <Box
        padding="1.5rem"
        borderRadius="5px"
        boxShadow="0 0 5px rgba(0,0,0,0.5)"
        width="25rem"
        backgroundColor="#fff"
      >
        <Text textAlign="center" marginBottom="1.5rem">
          Login to your account
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          <Form>
            <Field name="email">
              {({ field }) => (
                <InputGroup size="md" marginBottom="1.5rem">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email id"
                    />
                  </FormControl>
                </InputGroup>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <InputGroup size="md" marginBottom="1.5rem">
                  <FormControl>
                    <Input
                      {...field}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              )}
            </Field>
            <Button
              type="submit"
              width="100%"
              backgroundColor="purple.500"
              color="white"
            >
              Login
            </Button>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

export default connect(null, { setUser: setUserDetails })(LoginPage);

export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  const isCookieAvailable = req.cookies.token;
  if (isCookieAvailable) {
    isLoggedIn = true;
    res.statusCode = 302;
    res.setHeader("Location", `/`);
  }

  return {
    props: { isLoggedIn },
  };
}

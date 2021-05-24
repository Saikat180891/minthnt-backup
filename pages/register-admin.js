import {
  Flex,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Dashboard from "@/Dashboard";
import { Formik, Form, Field } from "formik";
import Apis from "../context/apis";
import { useToast } from "@chakra-ui/react";

const RegisterAdmin = () => {
  const toast = useToast();
  const initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const registerAdmin = async (payload) => {
    try {
      const data = await Apis.registerAdmin(payload);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Account creation failed",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Dashboard>
      <Box padding="2rem">
        <Formik
          initialValues={initialValue}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              registerAdmin({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
              });
              console.log(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Flex
                flexDirection="column"
                padding="1rem"
                bg="white"
                rounded="md"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box>
                  <FormLabel htmlFor="first_name">Name</FormLabel>
                  <Flex>
                    <Box paddingBottom="1rem" paddingRight="0.5rem">
                      <Field name="first_name">
                        {({ field, form }) => (
                          <FormControl>
                            <Input
                              {...field}
                              id="first_name"
                              type="text"
                              placeholder="First name"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box paddingBottom="1rem" paddingLeft="0.5rem">
                      <Field name="last_name">
                        {({ field, form }) => (
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              id="last_name"
                              placeholder="Last name"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <FormLabel htmlFor="first_name">Contact</FormLabel>
                  <Flex>
                    <Box paddingBottom="1rem" paddingRight="0.5rem">
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="Email"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box paddingBottom="1rem" paddingLeft="0.5rem">
                      <Field name="password">
                        {({ field, form }) => (
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              id="password"
                              placeholder="Password"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box paddingBottom="1rem" paddingLeft="1rem">
                      <Field name="confirm_password">
                        {({ field, form }) => (
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              id="confirm_password"
                              placeholder="Confirm password"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>
                </Box>
                <Flex justifyContent="flex-end">
                  <Button type="submit">Register</Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Dashboard>
  );
};

export default RegisterAdmin;

export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  const isCookieAvailable = req.cookies.token;
  if (isCookieAvailable) {
    isLoggedIn = true;
    return {
      props: { isLoggedIn },
    };
  }

  res.statusCode = 302;
  res.setHeader("Location", `/login`);

  return {
    props: {},
  };
}

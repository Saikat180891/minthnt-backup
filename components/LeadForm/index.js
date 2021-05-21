import tw from "twin.macro";
import React from "react";
import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  CloseButton,
  Box,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";
import Button from "@/Button";

const LeadForm = ({ onSubmit = () => {} }) => {
  const [file, setFile] = React.useState();
  const initialValue = {
    first_name: "",
    last_name: "",
    referred_by: "",
    phone_no: "",
    email: "",
    city: "",
    state: "",
    zip_code: "",
    residence_type: "",
    street_address: "",
    floor_number: "",
  };

  const addImage = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div tw="lg:rounded-lg sm:w-screen sm:h-screen">
      <Box padding="1rem" tw="bg-white rounded-lg mb-4 text-lg font-semibold">
        Referral Program for hotspot hosts
      </Box>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            const formData = new FormData();
            formData.set("first_name", values.first_name);
            formData.set("last_name", values.last_name);
            formData.set("referred_by", values.referred_by);
            formData.set("phone_no", values.phone_no);
            formData.set("email", values.email);
            formData.set(
              "address",
              JSON.stringify({
                city: values.city,
                state: values.state,
                zip_code: values.zip_code,
                residence_type: values.residence_type,
                street_address: values.street_address,
                floor_number: values.floor_number,
              })
            );
            if (file) formData.set("address_image", file, file?.name);
            onSubmit(formData, actions);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Flex
              flexDirection="column"
              padding="1rem"
              tw="bg-white rounded-lg mb-4"
            >
              <FormLabel htmlFor="first_name">Name</FormLabel>
              <Flex justifyContent="space-between">
                <Box paddingBottom="1rem" tw="w-full" paddingRight="0.5rem">
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
                <Box paddingBottom="1rem" tw="w-full" paddingLeft="0.5rem">
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
            </Flex>
            <Flex
              flexDirection="column"
              padding="1rem"
              tw="bg-white rounded-lg mb-4"
            >
              <FormLabel htmlFor="referred_by">Reffered By</FormLabel>
              <Box paddingBottom="1rem">
                <Field name="referred_by">
                  {({ field, form }) => (
                    <FormControl>
                      <Input
                        {...field}
                        id="referred_by"
                        type="text"
                        placeholder="Name or Email Id"
                      />
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Flex>
            <Box padding="1rem" tw="bg-white rounded-lg mb-4">
              <FormLabel>Contact</FormLabel>
              <Flex>
                <Box tw="w-full" paddingRight="0.5rem">
                  <Field name="phone_no">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="phone_no"
                          type="tel"
                          placeholder="Phone number"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box tw="w-full" paddingLeft="0.5rem">
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="Email Id"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Flex>
            </Box>
            <Box padding="1rem" tw="bg-white rounded-lg mb-4">
              <FormLabel>Address</FormLabel>
              <Flex paddingBottom="1rem">
                <Box tw="w-full" paddingRight="0.5rem">
                  <Field name="street_address">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="street_address"
                          type="text"
                          placeholder="Address"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box tw="w-full" paddingLeft="0.5rem">
                  <Field name="floor_number">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="floor_number"
                          type="number"
                          placeholder="Floor Number"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Flex>
              <Flex paddingBottom="1rem">
                <Box tw="w-full" paddingRight="0.5rem">
                  <Field name="city">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="city"
                          type="text"
                          placeholder="City"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box tw="w-full" paddingLeft="0.5rem">
                  <Field name="state">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="state"
                          type="text"
                          placeholder="State"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Flex>
              <Flex paddingBottom="1rem">
                <Box tw="w-full" paddingRight="0.5rem">
                  <Field name="zip_code">
                    {({ field, form }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="zip_code"
                          type="number"
                          placeholder="Zip Code"
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box tw="w-full" paddingLeft="0.5rem">
                  <Field name="residence_type">
                    {({ field, form }) => (
                      <FormControl>
                        <Select {...field} placeholder="Residence Type">
                          <option value="SINGLE_FAMILY_HOME">
                            Single-family home
                          </option>
                          <option value="TOWNHOME">Townhome</option>
                          <option value="LOWRISE_APARTMENT">
                            Low-rise apartment
                          </option>
                          <option value="HIGHRISE_APARTMENT ">
                            High-rise apartment
                          </option>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Flex>
              <Flex paddingBottom="1rem">
                <Button tw="relative bg-gray-500 px-4 py-1 rounded text-white">
                  Upload an image of your residence
                  <Input
                    type="file"
                    position="absolute"
                    tw="top-0 left-0 opacity-0 cursor-pointer"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={addImage}
                  />
                </Button>
              </Flex>
            </Box>

            <Flex
              justifyContent="flex-end"
              paddingX="1rem"
              paddingBottom="1rem"
            >
              <Button
                type="submit"
                tw="bg-purple-500 text-white px-5 py-1 rounded outline-none focus:outline-none active:outline-none active:shadow"
              >
                Apply
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LeadForm;

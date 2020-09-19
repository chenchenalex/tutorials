import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import React from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ userNameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          //   const response = await login(values);
          //   if (token) {
          //     setErrors(toErrorMap(response.data.login.errors));
          //   } else if (response.data?.login.user) {
          //     router.push("/");
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="newPassword" placeholder="new Password" label="New password" />
            </Box>
            <Button type="submit" isLoading={isSubmitting} variantColor="teal" mt={4}>
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;

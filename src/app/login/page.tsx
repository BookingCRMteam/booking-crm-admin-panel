"use client";

import { useLogin } from "@refinedev/core";
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { ThemedTitle } from "@refinedev/mui";

export default function Login() {
  const { mutate: login } = useLogin();

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <ThemedTitle
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />
        <Button
          style={{ width: "240px" }}
          variant="contained"
          size="large"
          onClick={() => login({})}
        >
          Sign in
        </Button>
        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <Image
            style={{ padding: "0 5px" }}
            alt="Auth0"
            width={20}
            height={20}
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fauth0-2.svg"
          />
          Auth0
        </Typography>
      </Box>
    </Container>
  );
}

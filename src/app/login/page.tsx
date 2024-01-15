"use client";

import useLogin from "@/api/login/useLogin";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Login() {
  const searchParams = useSearchParams();
  const { loginMutate } = useLogin();
  const code = searchParams.get("code");
  useEffect(() => {
    console.log(code);
    loginMutate({ code: code! });
  }, [code, loginMutate, searchParams]);
  return <div>asdf</div>;
}

export default Login;

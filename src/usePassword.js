import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

export function sendCode(email) {
  return axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    { email }
  );
}
export function useSendCode(fun) {
    return useMutation(fun)
}

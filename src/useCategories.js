import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export async function getCategory() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
}

export function useCategories(key, fun) {
  return useQuery(key, fun, {
    select: (data) => data?.data?.data,
  });
}

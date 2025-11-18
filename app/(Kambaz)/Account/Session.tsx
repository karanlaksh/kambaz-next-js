"use client";
import * as client from "./client";
import { useEffect, useState, ReactNode } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      // 401 means not signed in - this is expected, not an error
      if (err instanceof AxiosError && err.response?.status !== 401) {
        console.error(err);
      }
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!pending) {
    return <>{children}</>;
  }

  return null;
}
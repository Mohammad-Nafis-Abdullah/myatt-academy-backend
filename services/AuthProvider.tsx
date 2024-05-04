"use client";

import * as React from "react";
import { useLazyMeQuery } from "@/redux/features/auth/authApiSlice";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

// interface
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth);
  const [me, { data }] = useLazyMeQuery();

  React.useLayoutEffect(() => {
    (async () => {
      try {
        const result = await me("").unwrap();
        // console.log({ result });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

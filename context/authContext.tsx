"use client";

import { hasCookie } from "cookies-next/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export enum AuthStatus {
  YES = "Authenticated",
  NO = "Not Authenticated",
}

interface AuthContextValue {
  auth: AuthStatus;
  setAuth: Dispatch<SetStateAction<AuthStatus>>;
}

export const AuthContext = createContext<AuthContextValue>({
  auth: AuthStatus.NO,
  setAuth: function () {},
});

export function AuthProvider({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const [auth, setAuth] = useState<AuthStatus>(AuthStatus.NO);

  useEffect(() => {
    const cookie = hasCookie("payload-token");
    if (cookie) {
      setAuth(AuthStatus.YES);
    } else {
      setAuth(AuthStatus.NO);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken, getProfile, User } from "../services";

interface UseAuthOptions {
  requireAuth?: boolean;
  guestOnly?: boolean;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { requireAuth = false, guestOnly = false, redirectTo } = options;
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (requireAuth && !token) {
      router.push(redirectTo || "/signin");
      return;
    }

    if (guestOnly && token) {
      router.push(redirectTo || "/dashboard");
      return;
    }

    if (token) {
      getProfile()
        .then((res) => {
          if (res?.data) {
            setUser(res.data);
          }
        })
        .catch(() => {
          // Token might be invalid or expired
          removeToken();
          if (requireAuth) {
            router.push("/signin");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [requireAuth, guestOnly, redirectTo, router]);

  const logout = () => {
    removeToken();
    setUser(null);
    router.push("/signin");
  };

  return {
    user,
    loading,
    isAuthenticated: Boolean(getToken()),
    logout,
  };
}

export default useAuth;

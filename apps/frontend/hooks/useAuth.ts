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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = getToken();
    const hasToken = Boolean(token);
    setIsAuthenticated(hasToken);

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
          setIsAuthenticated(false);
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
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return {
    user,
    loading: !isMounted || loading,
    isAuthenticated: isMounted && isAuthenticated,
    isMounted,
    logout,
  };
}

export default useAuth;

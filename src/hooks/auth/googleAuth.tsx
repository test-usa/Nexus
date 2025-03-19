import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      console.log("Google Token:", tokenResponse);

      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        setUser(data);
        console.log("User Info:", data);
      } catch (err) {
        setError("Error fetching user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Login Failed");
      console.log("Login Failed");
    },
  });

  return { user, handleGoogleLogin, loading, error };
};

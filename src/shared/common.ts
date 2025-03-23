import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sessionId: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export function getSessionIdFromToken(): string | null {
  const token = localStorage.getItem("authToken");

  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sessionId || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

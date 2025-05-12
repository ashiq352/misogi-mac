import Cookies from "js-cookie";
import { COOKIES } from "@/types";

export function setCookies(data: { token: string; user: { role: string } }) {
  Cookies.set(COOKIES.AUTH_TOKEN, data.token, { expires: 1 });
  Cookies.set(COOKIES.USER_ROLE, data.user.role, { expires: 1 });
}

export function clearCookies() {
  Cookies.remove(COOKIES.AUTH_TOKEN);
  Cookies.remove(COOKIES.USER_ROLE);
}

export function getCookies() {
  const authToken = Cookies.get(COOKIES.AUTH_TOKEN);
  const userRole = Cookies.get(COOKIES.USER_ROLE);
  return { authToken, userRole };
}

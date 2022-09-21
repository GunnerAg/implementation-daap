let accessToken;

if (typeof window !== "undefined") {
  accessToken = window.sessionStorage.getItem("jwt") || null;
}

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  window.sessionStorage.setItem("jwt", token);
  accessToken = token;
};

export const logout = () => {
  sessionStorage.clear();
  window.location.assign("/");
};

export const isTokenValid = (token) => {
  const info = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    return Math.round(Date.now() / 1000) < info.exp;
};
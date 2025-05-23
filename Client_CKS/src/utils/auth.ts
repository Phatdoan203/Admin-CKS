export const isTokenExpired = (expiresIn: number) => {
    // const exp = localStorage.getItem("expiresIn", expiresIn.toString());
    return Date.now() > expiresIn;
}

export const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn")
};

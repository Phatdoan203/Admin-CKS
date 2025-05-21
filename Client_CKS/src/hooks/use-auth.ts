export default function useAuth() {
    const token = localStorage.getItem("accessToken")
    return !!token; 
}
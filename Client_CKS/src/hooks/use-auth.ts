// import { isTokenExpired } from "@/utils/auth";

export default function useAuth(){
    const token = localStorage.getItem("accessToken")
    return !!token; 
}

// export function getExpireIn(expiredIn: number){
//     localStorage.setItem("expiredIn", expiredIn.toString());
// }

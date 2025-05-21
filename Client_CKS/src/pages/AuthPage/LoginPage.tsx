import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginPage(){
    const springApi = import.meta.env.VITE_SPRING_API;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${springApi}/api/auth/login`, {
                username,
                password
            });

            const token = response.data.accessToken;
            localStorage.setItem("accessToken", token);

            toast({
                title: "Đăng nhập thành công!",
                description: "Chào mừng bạn trở lại.",
                variant: "default", // hoặc "success" nếu bạn có custom
            });

            navigate(from, { replace: true });
        } catch (err) {
            toast({
                title: "Đăng nhập thất bại",
                description: "Tài khoản hoặc mật khẩu không đúng.",
                variant: "destructive", // ShadCN style cho lỗi
            });
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="/Logo TNEX Finance.png" alt="logo" className="h-20 object-contain" />    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin} >
                            <div>
                                <label form="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                <input type="email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  />
                            </div>
                            <div>
                                <label form="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label form="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register-page" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                            <div></div>
                            <div></div>
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
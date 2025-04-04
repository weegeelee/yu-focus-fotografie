import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function useAutoLogout() {
    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // 当前时间（秒）
                
                if (decoded.exp < currentTime) {
                    console.log("Token expired, logging out...");
                    localStorage.removeItem("token"); // 清除 token
                    window.location.href = "/login"; // 跳转到登录页
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        checkTokenExpiration(); // 页面加载时检查一次
        const interval = setInterval(checkTokenExpiration, 60000); // 每 60 秒检查一次

        return () => clearInterval(interval); // 组件卸载时清除定时器
    }, []);
};


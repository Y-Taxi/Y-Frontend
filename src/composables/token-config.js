import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const tokenConfig = {
    setToken(token){
        sessionStorage.removeItem('Authorization');
        sessionStorage.setItem('Authorization', token);
    },
    setRefreshToken(token){
        cookies.set('Refresh-Token', token);
    },
    getToken(){
        let sessionValue = sessionStorage.getItem('Authorization');

        return sessionValue;
    },
    getRefreshToken(){
        let refreshToken = cookies.get('Refresh-Token');

        return refreshToken;
    },
    isTokenExpired(){
        let token = this.getToken();

        axios.post("/token/isTokenExpired", {"token":token}).then((res) => {
            if(res.data == false){
                console.log("isTokenExpired(false): "+res.data)
                return true;
            }else{
                console.log("isTokenExpired(true): "+res.data)
                return false;
            }
        });
    },
    tokenRefresh(){
        let refreshToken = cookies.get('Refresh-Token');

        return axios.post("/token/tokenRefresh", {"refreshToken":refreshToken}).then((res) => {
            console.log(">>>tokenRefresh: " + res.data)
            if(res.data != null){
                let token = res.data;

                this.setToken(token);

                return token;
            }
        }).catch(function(){
            //refreshToken 만료, 로그아웃
            return null;
        });
    }
};

export default tokenConfig;
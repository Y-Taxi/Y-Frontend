import axios from "axios";
import tokenConfig from "./token-config";

const axiosY = axios.create({
  // 상대적인 URL을 인스턴스 메서드에 전달하려면 baseURL을 설정하는 것은 편리하다.
  // URL(서버 주소) 예시 - http://127.0.0.1:5500
  baseURL: "http://localhost:8083",
  // 요청이 timeout보다 오래 걸리면 요청이 중단된다.
  timeout: 3000,
  withCredentials: true
});

axiosY.interceptors.request.use(
  (config) => {
    //요청이 전달되기 전에 작업 수행
    // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수
    const accessToken = tokenConfig.getToken();

    console.log(">>accessToken>> " + accessToken);

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = accessToken;


    return config;
  },
  (error) => {
    //요청 오류가 있는 작업 수행
    console.log(error);
    return Promise.reject(error);
  }
);

axiosY.interceptors.response.use(
  (response) => {
    //응답 데이터가 있는 작업 수행
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return response;
  },
  async (error) => {
    //응답 오류가 있는 작업 수행
    if (error.response?.status === 403) {
      // isTokenExpired() - 토큰 만료 여부를 확인하는 함수
      // tokenRefresh() - 토큰을 갱신해주는 함수

      let newToken = null;

      if (error.response?.headers["expires"] == 0){
        console.log(">>>>>>>>refreshToken get>>>>>>>>>>");

        await tokenConfig.tokenRefresh(async function(reToken){
          newToken = reToken;

          console.log(">>>newToken: " + newToken);

          if(newToken == null){
            console.log(">>>>>>>>refreshToken get Fail>>>>>>>>>>");
            return Promise.reject(error);
          }

          console.log(">>>>>>>>refreshToken get Success>>>>>>>>>>");

          const accessToken = newToken;

          error.config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          };

          // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
          const res = await axiosY(error.config);
          console.log(res);
          return res;
        });
      }else{
        return Promise.reject(error);
      }
    }else{
      return Promise.reject(error);
    }
  }
);

export default axiosY;
<template>
    <div>
      <div>
        <img alt="Vue logo" src="@/assets/YtaxiLogo.png">
        <h2>테스트입니다.123</h2>
        <div id="loginForm"> 
            <p>
              <input class="w3-input" name="uid" placeholder="ID를 입력해주세요" @change="inputLgoinId"><br>
            </p>
            <p>
              <input name="password" class="w3-input" placeholder="PW를 입력해주세요" type="password" @change="inputPw">
            </p>
            <p>
              <button @click="login">로그인</button>
              <button type="submit" class="w3-button w3-green w3-round">회원가입</button>
            </p>
            <div class="login">
              <h1>{{ connectData }}</h1>
            </div>
        </div>
      </div>
    </div>
  </template>

  <script>
    import axios from 'axios';

    export default {
      name:"LoginView",
      components: [],
      data() {
        return{
          connectData: "",
          loginId:"",
          pw:""
        };
      },
      methods: {
        inputLgoinId(e){
          return this.loginId = e.target.value;
        },
        inputPw(e){
          return this.pw = e.target.value;
        },
        login(){
          axios.post("/login?username="+this.loginId+"&password="+this.pw).then((res) => {
            //this.connectData = res.data;
            console.log(res);

            if (res.status == 200) {
              this.$router.push('/'); //홈 페이지로 이동
            }else{
              alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
          })
        },
      },
    }
 </script>
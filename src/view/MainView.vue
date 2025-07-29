<template>
    <button @click="goToHome">홈</button>
    <br/>
    <button @click="goToLogin">로그인</button>
    <br/>
    <button @click="goToUserJoin">회원가입</button>
    <router-view></router-view>
  </template>

  <script>
    export default {
      methods: {
        goToHome() {
          this.$router.push('/'); //홈 페이지로 이동
        },
        goToLogin(){
          this.$router.push('/login'); //로그인 페이지로 이동
        },
        goToUserJoin(){
          this.$router.push('/userJoin'); //회원가입 페이지로 이동
        }
      }
    }
 </script>
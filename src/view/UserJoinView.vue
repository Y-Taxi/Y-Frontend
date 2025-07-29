<script setup>
import axios from 'axios'
import { ref } from 'vue'


const connectData = ref('') // 상태 출력용

const userId = ref("");
const userPassword = ref("");
const userName = ref("");
const zipCode = ref("");
const address = ref("");
const subAddress = ref("");
const birth = ref("");
const gender = ref("");
const genderOptions = [
  { value: '1', label: '남성' },
  { value: '2', label: '여성' },
];
const userPhone = ref("");

const userJoin = async () => {
  try {
      const { data } = await axios.post("/join/userJoin", {
        joinType: "U",
        userLoginId: userId.value,
        userPwd: userPassword.value,
        userNm: userName.value,
        userZipCode: zipCode.value,
        userAddress: address.value,
        userSubAddress: subAddress.value,
        userBirth: birth.value,
        userGender: gender.value,
        userPhone: userPhone.value
    })
    console.log('Success:', data)
    connectData.value = '회원가입 성공: ' + JSON.stringify(data)
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    connectData.value = '회원가입 실패'
  }
}
</script>
<template>
<div>
    <div>
        <h2>회원가입11</h2>
        <div id="joinUserForm"> 
            <p>
                <input v-model="userId" name="uid" class="w3-input" placeholder="아이디를 입력해주세요"><br>
            </p>
            <p>
                <input v-model="userPassword" name="password" class="w3-input" placeholder="비밀번호를 입력해주세요" type="password">
            </p>
            <p>
                <input v-model="userName" name="userNm" class="w3-input" placeholder="이름을 입력해주세요">
            </p>
            <p>
                <input v-model="zipCode" name="zipCode" class="w3-input" placeholder="우편번호를 입력해주세요">
            </p>
            <p>
                <input v-model="address" name="Address" class="w3-input" placeholder="주소를 입력해주세요">
            </p>
            <p>
                <input v-model="subAddress" name="subAddress" class="w3-input" placeholder="상세주소를 입력해주세요">
            </p>
            <p>
                <input v-model="birth" name="birth" class="w3-input" placeholder="생년월일을 입력해주세요">
            </p>
             <p>
                <input v-model="userPhone" name="phone" class="w3-input" placeholder="전화번호를 입력해주세요">
            </p>
             <p>
                <label
                    v-for="option in genderOptions"
                    :key="option.value"
                    class="mr-4"
                    >
                <input
                    type="radio"
                    name="gender"
                    :value="option.value"
                    v-model="gender"
                />
                {{ option.label }}
                </label>
            </p>
            <p>
                <button type="submit" class="w3-button w3-green w3-round" @click="userJoin()">회원가입</button>
            </p>
            <div class="login">
                <h1>{{ connectData }}</h1>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

/** 상태 */
const connectData = ref('')
const isLoading = ref(false)

/** 폼 모델 */
const userId = ref('')
const userPassword = ref('')
const userName = ref('')
const userPhone = ref('')
const email = ref('')           // (옵션) 스크린샷 느낌 살리려고 추가
const zipCode = ref('')
const address = ref('')
const subAddress = ref('')
const birth = ref('')
const gender = ref('')
const genderOptions = [
  { value: '1', label: '남성' },
  { value: '2', label: '여성' },
]


/** 간단 검증 (예시) */
const errors = computed(() => {
  const e = {}
  if (!userId.value) e.userId = '아이디를 입력해주세요.'
  if (!userPassword.value) e.userPassword = '비밀번호를 입력해주세요.'
  if (!userName.value) e.userName = '이름을 입력해주세요.'
  if (!userPhone.value) e.userPhone = '휴대폰 번호를 입력해주세요.'
  if (!email.value) e.email = '이메일 주소를 입력해주세요.'
  if (!address.value) e.address = '주소를 입력해주세요.'
  return e
})

/** 제출 */
const userJoin = async () => {
  if (Object.keys(errors.value).length) {
    connectData.value = '필수 항목을 확인해주세요.'
    return
  }
  try {
    isLoading.value = true
    const { data } = await axios.post('/join/userJoin', {
      joinType: 'U',
      userLoginId: userId.value,
      userPwd: userPassword.value,
      userNm: userName.value,
      userZipCode: zipCode.value,
      userAddress: address.value,
      userSubAddress: subAddress.value,
      userBirth: birth.value,
      userGender: gender.value,
      userPhone: userPhone.value,
      // 아래 3개는 백엔드 스펙에 맞게 쓰세요(없으면 제거)
      userEmail: email.value,
    })
    connectData.value = '회원가입 성공: ' + JSON.stringify(data)
  } catch (err) {
    connectData.value = '회원가입 실패'
    console.error(err.response?.data || err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page">
    <section class="section">
      <h2 class="section-title">회원정보입력</h2>
      <div class="rows">
        <div class="row">
        <div class="label req">아이디</div>
            <div class="control">
            <input
                class="input"
                type="id"
                v-model="userId"
                placeholder="아이디"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
            />
            </div>
        </div>

        <!-- 비밀번호 -->
        <div class="row">
        <div class="label req">비밀번호</div>
            <div class="control">
            <input
                class="input"
                type="password"
                v-model="userPassword"
                placeholder="비밀번호"
                autocomplete="new-password"
                :readonly="lockPwd"
                @focus="lockPwd=false"
            />
            </div>
        </div>

        <div class="row">
          <div class="label req">이름</div>
          <div class="control">
            <input class="input" type="name" v-model="userName" placeholder="" />
          </div>
        </div>

        <div class="row">
          <div class="label req">휴대폰 번호</div>
          <div class="control">
            <input class="input" type="phone" v-model="userPhone" placeholder="" />
          </div>
        </div>

        <div class="row">
          <div class="label req">이메일 주소</div>
          <div class="control">
            <input class="input" type="email" v-model="email" placeholder="" />
          </div>
        </div>

        <div class="row">
          <div class="label req">주소</div>
          <div class="control">
            <div class="addr">
              <input class="input zip" type="zipCode" v-model="zipCode" placeholder="우편번호" />
              <button type="button" class="btn small">우편번호 검색</button>
            </div>
            <input class="input mt8" type="address" v-model="address" placeholder=""/>
            <input class="input mt8" type="subAddress" v-model="subAddress" placeholder="상세주소" />
          </div>
        </div>

        <div class="row">
          <div class="label">생년월일</div>
          <div class="control">
            <input class="input" type="birth" v-model="birth" placeholder="" />
          </div>
        </div>

        <div class="row">
          <div class="label">성별</div>
          <div class="control">
            <div class="radio-group">
              <label v-for="opt in genderOptions" :key="opt.value" class="radio">
                <input type="radio" name="gender" :value="opt.value" v-model="gender">
                <span class="custom"></span>
                {{ opt.label }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="actions">
      <button class="btn primary" :disabled="isLoading" @click="userJoin">
        <span v-if="!isLoading">회원가입</span>
        <span v-else class="loader" aria-hidden="true"></span>
      </button>
      <div class="status" :class="{ ok: connectData.includes('성공'), bad: connectData.includes('실패') }">
        {{ connectData }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 색/간격 */
:root {
  --line:#e5e7eb; --text:#111827; --muted:#6b7280;
  --danger:#ef4444; --warn:#ef4444; --ok:#10b981;
  --primary:#111827;
}
.page { max-width: 900px; margin: 40px auto 80px; padding: 0 16px; color: var(--text); }
.section + .section { margin-top: 40px; }

/* 섹션 타이틀 (얇은 밑줄) */
.section-title {
  font-size: 18px; font-weight: 700; padding: 10px 0 14px; margin: 0 0 8px;
  border-bottom: 2px solid #2b2b2b;
}

/* 표 형태 레이아웃 */
.rows { border-top: 1px solid var(--line); }
.row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.label { align-self: center; font-weight: 600; }
.label.req::before { content: "＊"; color: var(--danger); margin-right: 6px; font-weight: 700; }
.control { display: block; }

/* 입력 스타일 */
.input {
  width: 100%; height: 42px; padding: 0 12px;
  border: 1px solid var(--line); border-radius: 6px; outline: none;
}
.input:focus { border-color: #9ca3af; box-shadow: 0 0 0 3px rgba(60,60,60,.08); }
.mt8{ margin-top:8px; }

/* 주소 우편번호 */
.addr { display: flex; gap: 8px; align-items: center; }
.zip { max-width: 160px; }
.btn {
  height: 42px; padding: 0 14px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer;
}
.btn.small { height: 38px; }
.btn.primary { border-color: #171127; background: #111827; color: #fff; width: 200px; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.actions { margin-top: 24px; display: flex; align-items: center; gap: 16px; }

/* 라디오 */
.radio-group { display: flex; gap: 18px; flex-wrap: wrap; }
.radio { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.radio input { position: absolute; opacity: 0; }
.radio .custom {
  width: 16px; height: 16px; border-radius: 999px; border: 2px solid #cbd5e1; display: inline-block; position: relative;
}
.radio input:checked + .custom { border-color: #111827; }
.radio input:checked + .custom::after {
  content: ""; position: absolute; inset: 3px; border-radius: 999px; background: #111827;
}

/* 체크박스 */
.check { display: inline-flex; align-items: center; gap: 8px; margin-right: 18px; cursor: pointer; }
.check input { position: absolute; opacity: 0; }
.check .box { width: 16px; height: 16px; border: 2px solid #cbd5e1; border-radius: 4px; display: inline-block; position: relative; }
.check input:checked + .box { border-color: #111827; background: #111827; }
.check input:checked + .box::after { content:""; position:absolute; left:3px; top:1px; width:7px; height:10px; border:2px solid #fff; border-top:0;border-left:0; transform: rotate(45deg); }

/* 도움말 */
.help { margin-top: 6px; font-size: 12px; color: var(--muted); }
.help.warn { color: var(--warn); }
.help.error { color: var(--danger); }
.help.note { margin-top: 10px; }

/* 상태 */
.status { font-size: 14px; color: var(--muted); }
.status.ok { color: var(--ok); }
.status.bad { color: var(--danger); }

/* 반응형 */
@media (max-width: 720px) {
  .row { grid-template-columns: 1fr; gap: 8px; }
  .btn.primary { width: 100%; }
}

/* 모든 텍스트/비밀번호/이메일/번호 입력창에 적용 */
input[type="id"],
input[type="password"],
input[type="name"],
input[type="phone"],
input[type="email"],
input[type="zipCode"],
input[type="address"],
input[type="subAddress"],
input[type="birth"],
select,
textarea {
  border: 1px solid #ccc;           /* 얇은 회색 테두리 */
  border-radius: 4px;               /* 모서리 둥글게 */
  padding: 8px 10px;                /* 안쪽 여백 */
  background-color: #fff;           /* 흰 배경 */
  font-size: 14px;                   /* 글자 크기 */
  box-sizing: border-box;           /* 패딩 포함 너비 계산 */
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* 포커스(클릭) 시 강조 효과 */
input:focus,
select:focus,
textarea:focus {
  border-color: #2563eb;            /* 파란색 테두리 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  outline: none;                    /* 기본 outline 제거 */
}

</style>

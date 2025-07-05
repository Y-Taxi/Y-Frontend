<template>
    <div id="container" style="width: 100%; margin: 0 auto;">
      <header style="height: 100px; width: 100%;">
        <div style="display: flex; flex-wrap: nowrap; width: 100%; height: 100%;">
          <img alt="Vue logo" src="@/assets/YtaxiLogo.png" style="display: block; width: auto; height: 100%;">
          <h1>여수 관광 택시</h1>
        </div>
      </header>

      <div style="display: flex; flex-wrap: nowrap;">
        <aside id="side" style="min-width: 200px; min-height: 550px; background-color: yellow;">
          <div style="padding: 10px;">
            <h3>메뉴</h3>
            <nav>
              <!-- <router-link to="/">메인</router-link> -->
              <button>홈</button>
            </nav>
          </div>
        </aside>

        <div id="main" style="width: 100%; min-width: 350px; min-height: 550px; margin-left: 10px; box-sizing: border-box;">
          <div style="border: 1px solid; width: 100%; min-height: 550px;">
              <main style="padding: 10px;">
                <h2>메인페이지</h2> 
              </main>
          </div>
        </div>
      </div>

      <footer style="height: 200px; width: 100%; clear :both; padding-top: 10px;">
        <div style="padding: 10px; background-color: burlywood; height: 100%;">
          <h5>푸터</h5>
        </div>
      </footer>
    </div>
  </template>

  <script>
    export default {
      methods: {
        
      }
    }
 </script>
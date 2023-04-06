<script setup lang="ts">
    import { reactive } from 'vue'
    import Axios from "axios";
import { ElMessage } from 'element-plus';


    const state = reactive({ 
      signInBtnClass: "container" ,
      signUpBtnClass:"container right-panel-active",
      Siemail:"",
      Sipassword:"",
      SuEmail:"",
      SuPassword:"",
      SuUser:"",
      loginboxshow:""
    })


    const signInBtn = ()=>{
      state.signInBtnClass= "container right-panel-active" ,
      state.signUpBtnClass="container"
    }

    const signUpBtn = ()=>{
      state.signInBtnClass= "container" ,
      state.signUpBtnClass="container right-panel-active"
    }
    const submitFormSignIn = ()=>{
       /**
     * Axios
     */
    Axios({
      url: "/api",
      method: "post",
      // params: {state:state,password:state.Sipassword},   // url 参数
      data: {params:state}      // 请求体参数
    }).then(res => {
      console.log(res.data);
      if(res.data != '1'){
        ElMessage.error('登录失败，账号密码错误!');
      }
      else{
        ElMessage.success('登陆成功')
        state.loginboxshow="display:none"
      }
    });
    }

    const submitFormSignUp = ()=>{
      state.loginboxshow="display:none"
    }
</script>

<template>

    <div class="outer-wrap" id="loginbox" :style="state.loginboxshow">
    <div class="login-panel">
  <div :class=state.signUpBtnClass>
    <!-- Sign Up -->
    <div class="container__form container--signup">
      <form action="#" class="form" id="form1" @submit.prevent="submitFormSignUp">
        <h2 class="form__title">Sign Up</h2>
        <input type="text" placeholder="User" v-model="state.SuUser" class="input" />
        <input type="email" placeholder="Email" v-model="state.SuEmail" class="input" />
        <input type="password" placeholder="Password" v-model="state.SuPassword" class="input" />
        <button class="btn" type="submit">Sign Up</button>
      </form>
    </div>

    <!-- Sign In -->
    <div class="container__form container--signin">
      <form action="#" class="form" id="form2" @submit.prevent="submitFormSignIn">
        <h2 class="form__title">Sign In</h2>
        <input type="email" placeholder="Email"  v-model="state.Siemail" class="input" />
        <input type="password" placeholder="Password"  v-model="state.Sipassword" class="input" />
        <a class="link">Forgot your password?</a>
        <button class="btn" type="submit">Sign In</button>
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <button class="btn" id="signIn" @click="signInBtn">Sign In</button>
        </div>
        <div class="overlay__panel overlay--right">
          <button class="btn" id="signUp" @click="signUpBtn">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<h1>Hello App!</h1>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <el-button type="primary" size="default" @click="">芜湖</el-button>
    
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<style>
    :root {
      /* COLORS */
      --white: #e9e9e9;
      --gray: #333;
      --blue: #0367a6;
      --lightblue: #008997;

      /* RADII */
      --button-radius: 0.7rem;

      /* SIZES */
      --max-width: 758px;
      --max-height: 420px;

      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    body {
      background-color: var(--white);
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: grid;
      height: 97vh;
    }

    .outer-wrap{
            /*只有同时为html和body设置height: 100%时，这里的height才生效，
            并且随浏览器窗口变化始终保持和浏览器视窗等高*/
            height: 100%;    
            position: relative;
        }
        .login-panel{
            width: 840px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -190px;
            margin-left: -400px;
        }
    .form__title {
      font-weight: 300;
      margin: 0;
      margin-bottom: 1.25rem;
    }

    .link {
      color: var(--gray);
      font-size: 0.9rem;
      margin: 1.5rem 0;
      text-decoration: none;
    }

    .container {
      background-color: var(--white);
      border-radius: var(--button-radius);
      box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
      height: var(--max-height);
      max-width: var(--max-width);
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .container__form {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
    }

    .container--signin {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .container.right-panel-active .container--signin {
      transform: translateX(100%);
    }

    .container--signup {
      left: 0;
      opacity: 0;
      width: 50%;
      z-index: 1;
    }

    .container.right-panel-active .container--signup {
      animation: show 0.6s;
      opacity: 1;
      transform: translateX(100%);
      z-index: 5;
    }

    .container__overlay {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      transition: transform 0.6s ease-in-out;
      width: 50%;
      z-index: 100;
    }

    .container.right-panel-active .container__overlay {
      transform: translateX(-100%);
    }

    .overlay {
      background-color: var(--lightblue);
      background: url("./image/123.jpg");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      left: -100%;
      position: relative;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 200%;
    }

    .container.right-panel-active .overlay {
      transform: translateX(50%);
    }

    .overlay__panel {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      position: absolute;
      text-align: center;
      top: 0;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 50%;
    }

    .overlay--left {
      transform: translateX(-20%);
    }

    .container.right-panel-active .overlay--left {
      transform: translateX(0);
    }

    .overlay--right {
      right: 0;
      transform: translateX(0);
    }

    .container.right-panel-active .overlay--right {
      transform: translateX(20%);
    }

    .btn {
      background-color: var(--blue);
      background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
      border-radius: 20px;
      border: 1px solid var(--blue);
      color: var(--white);
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      padding: 0.9rem 4rem;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }

    .form>.btn {
      margin-top: 1.5rem;
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn:focus {
      outline: none;
    }

    .form {
      background-color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 3rem;
      height: 100%;
      text-align: center;
    }

    .input {
      background-color: #fff;
      border: none;
      padding: 0.9rem 0.9rem;
      margin: 0.5rem 0;
      width: 100%;
    }

    @keyframes show {

      0%,
      49.99% {
        opacity: 0;
        z-index: 1;
      }

      50%,
      100% {
        opacity: 1;
        z-index: 5;
      }
    }
  </style>

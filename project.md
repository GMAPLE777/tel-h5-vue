# 运营商通信套餐推广 H5 项目

## 一、项目简介

本项目为运营商通信套餐推广 H5 页面，结合通信行业业务场景设计开发，主要用于展示通信套餐信息、套餐详情以及在线预约办理功能。

项目采用 Vue3 + Vite 技术栈开发，实现移动端页面适配、组件化开发以及前后端数据交互，模拟真实企业开发流程，符合前端开发岗位对于 H5、CSS3、JavaScript、Vue 和前后端协作能力的要求。

---

## 二、技术栈

* Vue 3
* Vite
* Vue Router
* Axios
* CSS3
* JavaScript ES6+
* vw 移动端适配方案
* Mock 模拟接口
* Git / Gitee

---

## 三、项目功能

### 1. 首页（套餐列表页）

* Banner轮播展示
* 套餐分类导航
* 套餐列表展示
* 分类筛选功能
* 套餐详情跳转

### 2. 套餐详情页

* 套餐基础信息展示
* 套餐资费说明
* 套餐权益介绍
* 套餐规格选择
* 资费动态计算
* 在线预约入口

### 3. 在线预约页

* 用户姓名填写
* 手机号填写
* 套餐选择
* 表单验证
* 提交预约申请
* 提交成功提示

---

## 四、项目目录结构

```plaintext
tel-h5-vue/
├── public
│   ├── images
│   └── icons
│
├── src
│   ├── api
│   │   └── package.js
│   │
│   ├── assets
│   │   ├── css
│   │   └── images
│   │
│   ├── components
│   │   ├── NavBar.vue
│   │   ├── TabBar.vue
│   │   ├── PackageCard.vue
│   │   └── Dialog.vue
│   │
│   ├── mock
│   │   ├── packageList.js
│   │   ├── packageDetail.js
│   │   └── submit.js
│   │
│   ├── router
│   │   └── index.js
│   │
│   ├── utils
│   │   └── validate.js
│   │
│   ├── views
│   │   ├── Home
│   │   │   └── index.vue
│   │   ├── Detail
│   │   │   └── index.vue
│   │   └── Booking
│   │       └── index.vue
│   │
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── README.md
└── package.json
```

---

## 五、项目开发流程

### 阶段一：项目初始化与环境搭建

* 创建 Vue3 项目
* 安装 Vue Router
* 安装 Axios
* 配置移动端适配方案
* 初始化项目目录结构
* 配置 Git 仓库

### 阶段二：公共组件封装

封装公共组件：

* 顶部导航栏组件
* 底部菜单栏组件
* 套餐卡片组件
* 弹窗组件

实现组件复用，提高开发效率和维护性。

### 阶段三：页面静态开发

完成三个核心页面：

#### 首页

* Banner轮播
* 分类导航
* 套餐列表

#### 套餐详情页

* 套餐信息展示
* 权益说明
* 资费明细

#### 在线预约页

* 表单布局
* 输入框样式
* 按钮交互

### 阶段四：Mock接口开发

模拟后端接口：

#### 套餐列表接口

```js
GET /api/package/list
```

#### 套餐详情接口

```js
GET /api/package/detail
```

#### 提交预约接口

```js
POST /api/booking
```

通过 Axios 调用接口实现数据动态渲染。

### 阶段五：业务逻辑开发

#### 首页

* Banner自动轮播
* 分类筛选

#### 详情页

* 套餐规格切换
* 资费动态计算

#### 预约页

* 手机号正则验证
* 表单非空验证
* 提交成功提示

### 阶段六：测试与优化

* 安卓兼容测试
* IOS兼容测试
* 页面适配优化
* 图片压缩优化
* 代码清理优化

---

## 六、移动端适配方案

项目采用 vw 方案进行适配。

设计稿宽度：

```css
375px
```

换算公式：

```css
1vw = 3.75px
```

适配特点：

* 自动适配不同屏幕尺寸
* 开发效率高
* 维护成本低

---

## 七、接口请求封装示例

```js
import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000
});

export default request;
```

---

## 八、手机号校验示例

```js
export function validatePhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}
```

---

## 九、运行项目

### 安装依赖

```bash
npm install
```

### 启动项目

```bash
npm run dev
```

### 打包项目

```bash
npm run build
```

---

## 十、项目亮点

### Vue组件化开发

* 组件拆分合理
* 提高代码复用率
* 降低维护成本

### H5移动端适配

* vw响应式布局
* 多机型兼容

### 前后端协作思想

* Mock模拟真实接口
* Axios统一管理请求
* 接口与页面解耦

### JavaScript业务逻辑

* 表单校验
* 动态计算
* 页面交互动画

---

## 十一、Git提交记录示例

```bash
feat: 初始化Vue3项目结构

feat: 完成公共组件封装

feat: 完成首页静态开发

feat: 完成套餐详情页开发

feat: 完成预约表单开发

feat: 接入Mock接口数据

feat: 完成业务逻辑开发

fix: 修复移动端适配问题

docs: 完善README文档
```

---

## 作者

运营商通信套餐推广 H5 项目实践

开发技术：Vue3 + Vite + Axios + Mock + CSS3

开发周期：3天

项目类型：移动端H5营销页面

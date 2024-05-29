# K2048
KakaoTalk ver. 2048

## 목차
1. [K2048](##K2048)
2. ~~[K2048_window](##K2048_window)~~
3. ~~[KS5](##KS5)~~
## K2048
*made by semi703(세미)*
> ### 적용법
> 1. modules/K2048([다운로드](https://downgit.github.io/#/home?url=https://github.com/msgbot-utils/K2048/tree/main/modules/K2048))을 받아서 **global_modules 폴더** 또는 **모듈을 사용할 봇 폴더의 modules 폴더** 에 넣기
> 
> 2. [main.js](https://github.com/msgbot-utils/K2048/blob/main/main.js)의 내용을 **복사**해 봇에 **붙여넣기**
>
> (모듈만 사용하실 분들은 모듈만 다운받아도 무방)

> ### main.js 명령어
> ;2048 시작 : 2048 게임을 시작합니다.
> 
> w/a/s/d : (게임 진행중) 위/왼쪽/아래/오른쪽으로 밉니다.

> ### K2048 모듈
> #### Constructor
> ```javascript
> new K2048(len: number): K2048
> ```
> 새 2048 게임을 생성합니다.
> ##### 매개변수
> len: 보드의 크기입니다.
> ##### 반환값
> K2048 클래스를 반환합니다.
> #### Field
> `len: number`: 생성자에서 설정했던 크기입니다.
> 
> `board: Array`: 2048 게임판입니다. len*len 길이의 2차원 배열로 이루어져 있습니다.
>
> `isEnd: boolean`: 게임이 끝났는지 여부입니다.

# K2048 & KS5
KakaoTalk ver. 2048 & 오목

## 목차
1. [K2048](#K2048)
2. ~~[K2048_window](#K2048_window)~~
3. ~~[KS5](#KS5)~~
# K2048
*made by [semi703](https://github.com/semi703)(세미)*
> ## 적용법
> 1. modules/K2048([다운로드](https://downgit.github.io/#/home?url=https://github.com/msgbot-utils/K2048/tree/main/modules/K2048))을 받아서 **global_modules 폴더** 또는 **모듈을 사용할 봇 폴더의 modules 폴더** 에 넣기
> 
> 2. [main.js](https://github.com/msgbot-utils/K2048/blob/main/main.js)의 내용을 **복사**해 봇에 **붙여넣기**
>
> (모듈만 사용하실 분들은 모듈만 다운받아도 무방)

> ## main.js 명령어
> **;2048 시작** : 2048 게임을 시작합니다.
> 
> **w/a/s/d** : (게임 진행중) 위/왼쪽/아래/오른쪽으로 밉니다.

> ## K2048 모듈
> ### Import
> ```javascript
> const K2048 = require("K2048")
> ```
> - - -
> ### Constructor
> ```javascript
> new K2048(len: number): K2048
> ```
> 새 2048 게임을 생성합니다.
> ##### 매개변수
> `len`: 게임판의 가로/세로 크기입니다.
> ##### 반환값
> K2048 클래스를 반환합니다.
> - - -
> ### Field
> |이름|타입|설명|
> |---|---|---|
> |len|number|게임판의 가로/세로 크기입니다.|
> |board|array|`len`*`len`크기의 2차원 배열로 이루어진 게임판입니다.|
> |score|number|점수입니다.|
> |isEnd|boolean|게임이 끝났는지 여부입니다.|
> - - -
> ### Method
> #### add
> ```javascript
> add(): void
> ```
> 게임판에 새 숫자를 추가합니다.
> 
> 확률은 2가 66%, 4가 33%입니다.
> ##### 매개변수
> 없음
> ##### 반환값
> 없음
> - - -
> #### push
> ```javascript
> push(direction: string): void
> ```
> 게임판의 숫자를 밉니다. 합치지는 않습니다.
> ##### 매개변수
> `direction`: 미는 방향입니다. w/a/s/d는 각각 위/왼쪽/아래/오른쪽으로 밉니다. 다른 값은 무시합니다.
> ##### 반환값
> 없음
> - - -
> #### combine
> ```javascript
> combine(direction: string): void
> ```
> 게임판의 숫자를 합칩니다.
> ##### 매개변수
> `direction`: 합치는 방향입니다. w/a/s/d는 각각 위/왼쪽/아래/오른쪽으로 합칩니다. 다른 값은 무시합니다.
> ##### 반환값
> 없음
> - - -
> #### checkEnd
> ```javascript
> checkEnd(): boolean
> ```
> 게임판에 숫자가 다 차 끝났는지 체크합니다. `isEnd`의 값을 바꾸며, `isEnd`가 true일시 무조건 true를 반환합니다.
> ##### 매개변수
> 없음
> ##### 반환값
> 끝났으면 true, 아니면 false를 반환합니다. 반환값이 true이면 `isEnd`의 값도 true로 바뀌고, `isEnd`가 true일시 무조건 true를 반환합니다.
> - - -
> #### input
> ```javascript
> input(direction: string): boolean
> ```
> 밀고, 합치고, 숫자를 추가하고, 게임이 끝났는지 확인하는, 게임을 진행하는 메서드 입니다. *~~(머라 설명하지)~~*
>
> `isEnd`의 값이 true거나, 밀고 합쳐도 아무 변화가 없는 방향이라면 무시합니다.
> ##### 매개변수
> `direction`: 밀고 합치는 방향입니다. w/a/s/d는 각각 위/왼쪽/아래/오른쪽으로 밀고 합칩니다. 다른 값은 무시합니다.
> ##### 반환값
> `isEnd`의 값이 true거나, 밀고 합쳐도 아무 변화가 없는 방향이라 무시되면 false를, 아니면 true를 반환합니다.
> - - -
> #### toString
> ```javascript
> toString(): string
> ```
> 게임판을 보기 좋은 문자열 형식으로 반환합니다.
> ##### 매개변수
> 없음
> ##### 반환값
> 매서드 설명과 동일
# ~~K2048_window~~
*made by [WindowsSystem32](https://github.com/WindowsSystem32)(윈도우)* <br />
제작자가 완성을 안해 미완성 상태로 남아있습니다. <br />
7~8월쯤에는 완성될수도?
# ~~KS5~~
*made by [semi703](https://github.com/semi703)(세미)* <br />
오목이지만, 제작자가 버그 고치기 귀찮아서 방치해둔 상태입니다. 이후 시간이 남으면 새로 갈아엎을수도 있습니다.

- [과제](#과제)
  - [React와 History API 사용하여 SPA Router 기능 구현하기](#react와-history-api-사용하여-spa-router-기능-구현하기)
  - [접근 방법](#접근-방법)
  - [접근 방법](#접근-방법-1)
  - [접근 방법](#접근-방법-2)
  - [접근 방법](#접근-방법-3)
  - [접근 방법](#접근-방법-4)
  - [접근 방법](#접근-방법-5)

## 과제

### React와 History API 사용하여 SPA Router 기능 구현하기

- [DEMO](https://wanted-challenge-7-router.vercel.app/)

<br/>

> ### 1. 요구사항
>
> #### 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.
>
> - `/` → `root` 페이지
> - `/about` → `about` 페이지

### 접근 방법

- 페이지 관련 컴포넌트는 pages 폴더안에 `Root`, `About` 컴포넌트로 구성했다.

```
📦src
 ┣ 📂pages
 ┃ ┣ 📜About.tsx
 ┃ ┗ 📜Root.tsx
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```

---

<br/>

> ### 2. 요구사항
>
> #### 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.
>
> - 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

### 접근 방법

- history API 중에서 history.push와 history.pushState 메서드가 존재한다.
  - history.push는 react에서 제공해주는 API이다.
  - history.pushState는 window에서 제공해주는 API이다.
  - react 환경에 국한되지 않고 호환되는 브라우저 환경이라면 동작가능하도록, 브라우저에서 제공해주는 `history.pushState 메서드를 활용`하기로 했다.
- history.pushState 메서드는 popstate 이벤트가 trigger 된다.
  - 이벤트를 감지하기 위한 onpopstate 프로퍼티 이벤트 리스너와 addEvnetListener의 popstate 이벤트 리스너 2가지 방법이 있다.
  - addEventListener는 이벤트를 2개 이상 중복해서 바인딩할 수 있어서 `addEventListener를 선정`했다.
- ⭐ history.pushState 메서드는 `뒤로가기` 일때만 popstate 이벤트가 trigger 된다.
  - 커스텀 이벤트를 만들어 dispatch를 보내면 해당 이벤트 타입에 알맞는 이벤트 핸들러가 실행된다는 것을 안다.
  - `PopStateEvnet`이벤트 객체를 생성하여 `popstate` 이벤트 핸들러를 실행시켰다.
    ```js
    const popstateEvent = new PopStateEvent("popstate", state);
    window.dispatchEvent(popstateEvent);
    ```
- `/` 인지 `/about` 경로인지 확인하기 위해 `location.pathname` 프로퍼티를 사용했다.

---

<br/>

> ### 3. 요구사항
>
> #### Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.
>
> ```tsx
> ReactDOM.createRoot(container).render(
>   <Router>
>     <Route path="/" component={<Root />} />
>     <Route path="/about" component={<About />} />
>   </Router>
> );
> ```

### 접근 방법

- 공용으로 사용되는 컴포넌트는 components 폴더 안에 Router, Route 컴포넌트를 구현했다.
  ```
  📦src
  ┣ 📂components
  ┃ ┣ 📜Link.tsx
  ┃ ┣ 📜Route.tsx
  ┃ ┗ 📜Router.tsx
  ┣ 📂pages
  ┃ ┣ 📜About.tsx
  ┃ ┗ 📜Root.tsx
  ┣ 📜App.tsx
  ┗ 📜main.tsx
  ```
- Router 컴포넌트에서는 history.pushState 메서드 호출 및 popstate 이벤트를 dispatch하여 popstate 이벤트 핸들러를 실행시킨다.

  - 이벤트를 실행시키더라도 리렌더링이 발생하지 않아 고정된 페이지를 보여준다.
  - ⭐ 리렌더링을 발생시키기위해 pathname를 state로 관리한다.
  - pathname은 url이 변경될때(pushState 메서드 호출 및 이벤트 dispatch) setState를 통해 pathname을 변경하고 리렌더링을 발생시킨다.
  - pathname을 props로 전달받는 자식들은 리렌더링을 하여 컴포넌트를 호출한다.

    - ⭐ children에 props를 전달하기 위해서는 React.cloneElement를 통해 props를 전달한다.
    - ⭐ children이 2개 이상인 경우 다른 방법이 필요한데, Children.map 메서드를 통해 자식 요소마다 props를 전달한다.

    ```tsx
    type RouterProps = {
      children: React.ReactNode;
    };

    const Router = ({ children }: RouterProps) => {
      const [pathname, setPathname] = useState(location.pathname);

      const clonedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) return React.cloneElement(child, { pathname } as { pathname: string });

        return child;
      });

      useEffect(() => {
        const onPopstate = () => setPathname(location.pathname);

        window.addEventListener("popstate", onPopstate);

        return () => {
          window.removeEventListener("popstate", onPopstate);
        };
      }, []);

      return clonedChildren;
    };

    export default Router;
    ```

- Route 컴포넌트에서는 path와 Router 컴포넌트에서 props로 넘어온 pathname을 확인하여 일치하는지 확인한다.

  - 일치하면 해당 컴포넌트를 반환하고, 일치하지 않으면 `null`을 반환하여 조건부 렌더링을 한다.

    ```tsx
    type RouteProps = {
      path: string;
      component: React.ReactNode;
      pathname?: string;
    };

    const Route = ({ path, component, pathname }: RouteProps) => {
      return pathname === path ? component : null;
    };

    export default Route;
    ```

- 클릭하면 props로 전달받은 to 경로로 url 이동과 이벤트 dispatch를 발생시키는 Link 컴포넌트를 추가로 구현했다.

  - 추가적으로, state를 렌더링될 페이지에 넘겨줄 수 있도록 구현했다.

  ```tsx
  import useRouter from "./../hooks/useRouter";

  type LinkProps = {
    to: string;
    children: React.ReactNode;
    state?: { [index: string]: unknown };
  };

  const Link = ({ to, children, state }: LinkProps) => {
    const { push } = useRouter();

    return <button onClick={() => push(to, state)}>{children}</button>;
  };

  export default Link;
  ```

---

<br/>

> ### 4. 요구사항
>
> #### 최소한의 push 기능을 가진 useRouter Hook을 작성한다.
>
> ```tsx
> const { push } = useRouter();
> ```

### 접근 방법

- hooks 폴더안에 `useRouter.tsx` 파일을 생성했다.
  ```
  📦src
  ┣ 📂hooks
  ┃ ┗ 📜useRouter.tsx
  ```
- history.pushState 메서드 호출 및 이벤트 dispatch를 발생시키는 push 함수를 정의한다.

  ```tsx
  const useRouter = () => {
    const push = (to: string, state?: { [index: string]: unknown }) => {
      history.pushState(state, "", to);

      const popstateEvent = new PopStateEvent("popstate", state);
      window.dispatchEvent(popstateEvent);
    };

    return { push };
  };

  export default useRouter;
  ```

> ### 5. 요구사항
>
> #### 아래 스크린샷을 참고하여 앱을 작성한다.
>
> - **TO-BE) About 경로** > <img src="https://lean-mahogany-686.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd2a19c69-ed92-4431-afca-156a3d8ccd7e%2FUntitled.png?id=5526a31c-b3c7-4fb8-9b66-cf510264e1ac&table=block&spaceId=7ac0bf59-e3bb-4f76-a93b-27f040ec55b6&width=2000&userId=&cache=v2">
> - **TO-BE) Root 경로** > <img src="https://lean-mahogany-686.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa10c03a3-1d27-4a02-a495-c7f98775ca23%2FUntitled.png?id=c3f5bcfe-e485-467f-8cd8-b97168c25c1d&table=block&spaceId=7ac0bf59-e3bb-4f76-a93b-27f040ec55b6&width=2000&userId=&cache=v2">

### 접근 방법

- 기능 구현이 주 목적이었기 때문에 기본적인 기능만 구현하고, 별도의 CSS 작업은 하지 않았다.

---

<br/>

> ### 6. 요구사항
>
> #### 참고) **Vite 초기 세팅 ([링크](https://vitejs-kr.github.io/guide/#scaffolding-your-first-vite-project))**
>
> ```bash
> $> yarn create vite
> # 실행 후 cli의 지시에 따라 react, react-ts 중 택일하여 초기 세팅할 것
> ```
>
> - https://vitejs-kr.github.io/guide/#scaffolding-your-first-vite-project
> - Vite란?
>   - 프랑스어로 ‘빠르다’는 뜻을 가진 자바스크립트 빌드 툴
>   - 프로젝트 스캐폴딩 템플릿 지원하고, 설정이 매우 간단함(거의 불필요함)
>   - CRA에 비해 프로젝트에 담긴 의존성 규모가 작아서 인스톨 시간에 대한 부담이 없음
>   - **HMR 및 빌드 속도가 매우 빠름**

### 접근 방법

- typescript를 공부할 겸, react-ts template으로 생성했다.

```js
$> yarn create vite --template react-ts
```

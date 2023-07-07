- [과제](#과제)
  - [Redux 레포지토리에서 코드 분석하고 직접 scratch 작성해보기](#redux-레포지토리에서-코드-분석하고-직접-scratch-작성해보기)
  - [폴더 구조](#폴더-구조)
  - [언어](#언어)
  - [기본적으로 알고 넘어가야할 점](#기본적으로-알고-넘어가야할-점)
  - [알게된 점](#알게된-점)
  - [아쉬운 점](#아쉬운-점)
  - [1. 요구사항](#1-요구사항)
    - [Redux의 컨셉을 학습한다.](#redux의-컨셉을-학습한다)
    - [접근 방법](#접근-방법)
  - [2. 요구사항](#2-요구사항)
    - [createStore의 최소 구현체를 직접 작성해본다.](#createstore의-최소-구현체를-직접-작성해본다)
    - [접근 방법](#접근-방법-1)

## 과제

### Redux 레포지토리에서 코드 분석하고 직접 scratch 작성해보기

### 폴더 구조

- `createStore.ts` => createStore 함수
- `test.ts` => createStore 테스트 용도

```
📦redux
 ┣ 📜createStore.ts
 ┣ 📜README.md
 ┗ 📜test.ts
```

### 언어

- 공부 목적으로 typescript를 사용했다.

### 기본적으로 알고 넘어가야할 점

1. redux와 useReducer의 유사함을 알고 redux를 접근한다.
2. create로 시작하는 만큼 리액트 훅으로 사용할 수 없고, 리액트 훅 또한 사용할 수 없다.
3. 그럼 자바스크립트로 구현해야하는데, 변수 값을 유지하면서 값을 변경하거나 얻을 수 있는 방법은 `클로저`이다.

### 알게된 점

- 유형 매개변수에도 기본값을 설정해줄 수 있다.

### 아쉬운 점

- 해당 로직으로 리액트에서 리렌더링 발생시키는 방법을 알지 못해 아쉽다.

---

<br/>

### 1. 요구사항

#### Redux의 컨셉을 학습한다.

> - [createStore 관련 Redux 레포지토리](https://github.com/reduxjs/redux/blob/master/src/createStore.ts)
> - <img src="https://oj8mm.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F66061c06-e244-4d08-a646-308fe16344a5%2FUntitled.png?id=e94ea0a5-5f1e-4e3b-b5dc-d6faf9103506&table=block&spaceId=7a813495-7f43-4f9b-8425-adb83564ac6f&width=1930&userId=&cache=v2">

#### 접근 방법

- redux 데이터 흐름은 아래와 같다.

  1. 사용자에 의해 이벤트가 발생한다(action)
  2. 이벤트를 캐치한다(dispatch)
  3. dispatch로 저장소에 저장된 값을 업데이트한다(store)
  4. 업데이트된 값을 사용자의 화면에 출력한다.(view)
  5. 1 ~ 4 반복

- redux createStore 관련 소스코드를 살펴본다.
  - typescript를 사용할 경우 type을 설정해야하기 때문에 추가적으로 type을 확인한다.(redux 개발자의 생각도 엿볼 수 있는 좋은 기회!)
    - `actions.ts` : Action, UnknownAction
    - `stores.tx` : Dispatch

---

<br/>

### 2. 요구사항

#### createStore의 최소 구현체를 직접 작성해본다.

> - 너무 어렵게 생각하지 마세요. 제가 작성한 scratch는 20줄이 안됩니다.
> - 힌트
>
> 1. createStore는 reducer를 인자로 받아 store를 리턴하는 함수다
>
>    ```js
>    const store = createStore((state, action) => {
>      if (action.type === "ADD") {
>        return { ...state, todos: [...state.todos, action.payload] };
>      }
>      return state;
>    });
>    ```
>
> 2. `store`는 `subscribe()`, `dispatch()`, `getState()`를 메서드로 가진 객체다
> 3. `reducer`는 createStore의 내부 상태인 state와, action 객체를 인자로 받아 action type에 따라 로직을 처리한 후 새로운 state를 리턴하는 함수다

#### 접근 방법

- 기본적인 `createStore`를 구현한다
  - 구현하는 단계에서 type을 바로 작성할 수 있다면 가장 **BEST**이지만.... 어렵기 떄문이다!
  - redux에서 createStore
    - reducer 함수와 state를 인수로 받는다.
    - state는 초기 state 값을 설정하는데 사용한다.
    - reducer 함수는 dispatch 메서드 실행시 계속 참조될 예정이다.
  - 인수로 받은 initialState 사용처
    - let 키워드로 initialState를 state 변수에 저장한다.
      - dispatch로 state가 계속 변경될 예정이기 때문에 let 키워드를 사용한다.
  - 인수로 받은 reducer 사용처
    - reducer는 실행 컨텍스트에 유지되기 때문에 dispatch 메서드 호출시 사용한다.
- store는 메서드를 가진 객체이므로, 반환값 또한 메서드를 가진 객체이다.
  - getState 메서드
    - state를 반환한다.
  - dispatch 메서드
    - dispatch 메서드가 실행되면 reducer 함수를 실행하고, 반환된 값은 state에 재할당한다.
    - (subscribe 로직 구현 이후) : subscribe 함수가 존재할 경우 subscribe 함수를 실행한다.
  - subscribe 메서드
    - subscribe 메서드에 콜백함수를 인수로 전달하고 실행할 경우, dispatch 메서드 호출 이후에 인수로 전달한 콜백함수를 실행한다.
      - 처음 subscribe라는 변수를 비워둔다.
        - 재 할당하니 let 키워드로 변수를 선언한다.
      - subscribe 메서드에 인수로 전달받은 콜백함수를 subscribe 변수에 할당한다.
      - dispatch 메서드 실행 후 subscribe 함수가 실행된다.
- type에 대한 설명은 다음 줄에 설명하고있으니, type은 잠시 넘어가고 읽으시면 됩니다.

  ```ts
  export function createStore<T>(reducer: ReducerType<T>, initialState: InitialStateType<T>) {
    let state = initialState;
    let subscribe: SubScribeType;

    return {
      subscribe(callback: SubScribeType) {
        subscribe = callback;
      },
      dispatch(action: ActionType) {
        state = reducer(state, action);
        if (subscribe) subscribe();
      },
      getState() {
        return state;
      },
    };
  }
  ```

- typescript의 꽃이라고 불릴 수 있는 type을 설정한다.

  - InitialStateType
    - state 값은 사용자에 따라 값이 변동될 수 있기 때문에 제네릭을 사용한다.
  - ActionType
    - action의 경우 type은 기본으로 가져야한다.
      - type 프로퍼티 값은 기본으로 string을 갖는다.
      - 물론, string 타입이 아닌 다른 타입을 갖도록 제네릭을 추가할 수 있다.
      - ⭐ 이를 위해 string 기본 타입을 설정한다.
    - 나머지는 몇개가 추가될 지 알 수 없는 상황이기 때문에, `인덱스 시그니처`를 사용한다.
    - actionType은 사용자도 사용할 수 있도록 export 해준다.
  - ReducerType
    - reducer는 state와 action을 인수로 전달 받는다.
      - state는 InitialStateType와 동일한 타입을 갖는다.
      - action은 ActionType과 동일한 타입을 갖는다.
  - SubScribeType
    - subscribe 메서드가 전달받은 인수는 `void를 반환하는 인수 없는 함수`이다.

  ```ts
  type InitialStateType<T> = T;

  export type ActionType<T extends string = string> = {
    type: T;
    [index: string]: any;
  };

  type ReducerType<T> = (state: InitialStateType<T>, action: ActionType) => InitialStateType<T>;

  type SubScribeType = () => void;
  ```

---

<br/>

- [과제](#과제)
  - [Next.js로 마크다운 블로그 만들기](#nextjs로-마크다운-블로그-만들기)
  - [폴더 구조](#폴더-구조)
  - [1. 요구사항](#1-요구사항)
    - [Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성해주세요.](#nextjs로-마크다운으로-작성한-블로그를-정적-페이지ssg로-작성해주세요)
    - [접근 방법](#접근-방법)
  - [2. 요구사항](#2-요구사항)
    - [사용자는 루트 경로의 \_\_posts 폴더에 작성된 마크다운 파일(.md)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다. 아래는 마크다운에 jekyll에서 만든 frontmatter라는 문법(링크)을 적용한 예시입니다.](#사용자는-루트-경로의-__posts-폴더에-작성된-마크다운-파일md를-작성할-수-있어야-합니다-해당-파일은-마크다운-본문과-게시물에-대한-meta-data를-담을-수-있어야-합니다-아래는-마크다운에-jekyll에서-만든-frontmatter라는-문법링크을-적용한-예시입니다)
    - [접근 방법](#접근-방법-1)
  - [3. 요구사항](#3-요구사항)
    - [- 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요.](#--블로그에-작성된-게시물을-렌더링하는-목록-페이지와-개별-게시물을-렌더링하는-상세-페이지로-나누어-작성해주세요)
    - [접근 방법](#접근-방법-2)
  - [4. 요구사항](#4-요구사항)
    - [Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.](#nextjs-12에서-지원하는-prefetching-메서드를-적절히-사용해주세요)
    - [접근 방법](#접근-방법-3)
  - [5. 요구사항](#5-요구사항)
    - [참고 사항](#참고-사항)
    - [접근 방법](#접근-방법-4)

## 과제

### Next.js로 마크다운 블로그 만들기

- [DEMO](https://wanted-challenge-7-blog.vercel.app/)

### 폴더 구조

```
📦blog
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜next.svg
 ┃ ┗ 📜vercel.svg
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜Badge.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜Meta.tsx
 ┃ ┃ ┣ 📜Text.tsx
 ┃ ┃ ┗ 📜Title.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜path.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┗ 📜hello.ts
 ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┗ 📜[postId].tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜_app.tsx
 ┃ ┃ ┗ 📜_document.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┣ 📜Global.style.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜theme.ts
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜styled.d.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜files.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜markdown.ts
 ┣ 📂__posts
 ┃ ┣ 📜post.md
 ┃ ┣ 📜post2.md
 ┃ ┣ 📜post3.md
 ┃ ┗ 📜post4.md
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

<br/>

---

### 1. 요구사항

#### Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성해주세요.

#### 접근 방법

- 정적 페이지로 구현하기 위해서는 getStaticPaths와 getStaticProps를 사용하면 정적 페이지를 만들 수 있다.
- 정적 페이지를 만들면, 사용자의 요청시 html를 보내주기 때문에 대기 시간을 줄이기 떄문에 사용자 경험을 향상시킬 수 있다.
- 또한, 서버에서 만들어진 html을 전송하기 때문에 서버 부하도 줄어든다.
- 다만, 자주 바뀌는 페이지의 경우에는 미리 만드는 의미가 없기 때문에 효과가 없다.

---

<br/>

### 2. 요구사항

#### 사용자는 루트 경로의 \_\_posts 폴더에 작성된 마크다운 파일(.md)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다. 아래는 마크다운에 jekyll에서 만든 frontmatter라는 문법(링크)을 적용한 예시입니다.

```
---
categories:
  - Development
  - VIM
date: "2012-04-06"
description: 설명을 적는 곳입니다
slug: spf13-vim-3-0-release-and-new-website
tags:
  - .vimrc
  - plugins
  - spf13-vim
  - vim
title: hello
---

## 예시입니다
- 예시입니다
```

#### 접근 방법

- 사용자는 \_\_posts에 마크 다운 파일을 생성하여 마크 다운 파일에 metaDat와 markdown 문법을 작성할 수 있다.
- 작성된 metaData와 markdown 문법을 화면에 표시하기 위한 방법을 생각해야한다.
- 우선 frontmatter라는 문법을 확인하여, `map` 메서드를 사용하고 type을 고려하여 프로퍼티 키를 중점적으로 확인했다.

---

<br/>

### 3. 요구사항

#### - 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요.

> - `/` - 목록 페이지
> - `/[id]` - 상세 페이지
> - 마크다운을 JavaScript로 변환해주는 도구는 `remark`(마크다운 Parser), `remark-html`(remark로 파싱한 데이터를 html로 변환) 을 참고
> - 각 마크다운의 meta data는 `gray-matter`, `frontmatter` 참고
> - 마크다운을 React에 삽입할 때는 `dangerouslySetInnerHTML` 을 사용 ([참고 링크](https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml))
> - (추가 구현) 코드 하이라이터는 `highlight.js`, `prism.js` 를 참고

#### 접근 방법

- 페이지의 경우 상수로 경로를 작성했다.
  - 📂constants > 📜path.ts
- Next.js 에서는 app router와 page router를 지원하는데, 안정성 이슈로 Next.js 12버전을 사용하는 기업이 있다는 것을 고려하여, page router로 페이지를 구현했다.
- 마크다운 파일을 parse하기 전에, 파일을 찾아 읽는 선행 작업이 우선되어야한다.
  - `path`, `fs` 내장 함수로 마크다운 파일의 폴더 경로를 찾아서, 파일들을 모두 읽는다.
  - 파일을 읽고 난 이후 remark 함수로 javascript 객체로 변환한다.
  - 변환된 javascript 객체에서 meta 데이터와 markdown 문법을 얻을 수 있다.
    - meta 데이터는 gray-matter 라이브러리를 사용한다.
    - 문자열로 된 markdown 문법은 remark-html 라이브러리를 사용한다.
  - meta 데이터를 gray-matter 라이브러리로 변환하면 javascript 객체로 변환된다.
  - 문자열인 markdown 문법은 remark-html 라이브러리를 사용하여 변환하면, html 마크업 언어로 변환된다.
  - html는 react의 문법중 하나인 dangerouslySetInnerHTML을 사용하여 삽입한다.
- 코드 하이라이터는 highlight.js, prism.js는 아직 구현하면 업데이트 해야겠다.
  - 정적 페이지에 스타일을 주려면 \_app.tsx파일 내부에 정의를 해야한다.
  - highlight.js와 useEffect를 사용하여 전체 코드 중 `<code>`를 찾아 자동으로 하이라이트 스타일을 주도록 했다.
    - 더 나은 방법이 있을거 같은데.... 더 연구를 해봐야겠다.
    - 서버에서 정적 페이지를 한번만 만들기 때문에, 렌더링 이후에 동작하는 useEffect가 실행되지 않는다...
    - 그래서 \_app.tsx 파일인 정적 페이지에서 실행하지 않고, CSR이 동작하는 페이지에 넣어줬다.
      - 깜빡거리긴하지만..... 일단 동작은 한다.

---

<br/>

### 4. 요구사항

#### Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.

> - Next.js 13을 설치하고 Pages Router를 사용하셔도 됩니다.
> - 정적 페이지를 생성할 때 필요한 데이터 생성 → `getStaticProps`
> - 각 포스트를 그려줄 상세 페이지 경로를 생성 → `getStaticPaths`

#### 접근 방법

- app router를 사용하면 getStaticProps와 getStaticPaths 함수를 정의하지 않고 import 해야한다.
  - 기능이 비슷할지라도 명칭이 다르다.
- page router를 사용하여 getStaticProps와 getStaticPaths 함수를 정의하여 사용했다.
  - getStaticProps 함수 내부에는 node.js 코드가 실행되기 때문에 서버 관련 로직을 작성할 수 있다.
  - 지금은 간단한 파일 읽지만, 실제 데이터를 불러올 때 클라이언트 입맛에 맞게 데이터를 변환하여 사용할 수 있는 장점도 있다.
  - getStaticPaths 함수는 정적 페이지를 생성할 수 있는데 도움을 준다.
    - 즉, 서버에 html 문서를 만들 수 있는 기능을 제공한다.
    - 이번 과제에서는 사용하지 않지만, fallback 기능을 사용하면 잘못된 라우팅을 요청할 경우 Next.js에서 제공하는 기본 404 페이지를 보여주거나, 직접 다른 페이지로 라우팅 할 수 있는 기능을 제공한다.

---

<br/>

### 5. 요구사항

#### 참고 사항

> - 가급적 TypeScript로 진행하시는 걸 추천드립니다.
> - 과제의 목적이 디자인에 있지는 않기 때문에 UI 관련 라이브러리는 자유롭게 사용하셔도 좋습니다. 단, 라이브러리의 종류와 Next.js 간 호환이 잘 맞지 않아 에러가 발생하는 경우가 있을 수 있으니 유의하여 사용해주세요.
> - CSS-in-JS 라이브러리 사용 시 `_document.js`(Next.js 공식 문서 참고)에 각 라이브러리(`styled-components`, `emotion`, …)에 알맞은 세팅을 추가해주세요.
> - (선택) [Vercel](https://vercel.com/)이나 [Netlify](https://www.netlify.com/)를 활용하면 정적 페이지를 간단하게 배포할 수 있습니다.
> - 과제 완료 후 과제 제출 스레드에 해당 프로젝트의 github 링크로 제출해주세요. 프로젝트에 대한 간단한 소개가 README에 작성되어 있으면 좋습니다.
> - 이 외에 추가 구현하고 싶은 기능이 있으면 자유롭게 구현해주세요.

#### 접근 방법

- 언제나 어려운 typescript의 type을 공부하기 위해 typescript를 사용했다.
- UI는 velog를 참고했다.
  - styled-components에는 정적 페이지를 생성할 수 있도록 기능을 제공해주기 때문에 좋았다.
- styled-components를 사용하려면 \_\_document에 세팅을 해줘야한다.
  - 또한, 정적 페이지를 생성할 때도 스타일을 사용하려면 swc를 사용해야한다.
    ```js
    // next.config.js
    ...
    compiler {
      styledComponents: true,
    }
    ```
- vercel로 배포했다.
  - lowercase로 폴더이름을 했다가 나중에 PascalCase로 폴더 이름을 바꿨는데 원격 저장소에는 lowercase 폴더만 있어서 당황했던 경험을 가졌다.
- 사용자가 마크다운 파일을 생성하는 것이 아닌, 사이트에서 글쓰기로 타이핑하면 파일이 생성되는 진짜 블로그처럼 기능을 구현해보고 싶다.
  - 우선 진도를 따라가고 나중에 추가로 해야겠다.

---

<br/>

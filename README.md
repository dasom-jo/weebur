# 쇼핑몰 페이지 구현 과제

## 프로젝트 소개
Next.js를 활용한 쇼핑몰 페이지 구현 사전과제입니다.

## 기술 스택
- **Framework:** Next.js 15.3.1
- **Language:** TypeScript
- **Styling:** SASS
- **State Management:** React Query (@tanstack/react-query)
- **HTTP Client:** Axios
- **Development Tools:**
  - ESLint
  - TypeScript
  - Next.js built-in tools

## 주요 기능
- 상품 목록 표시
- 상품 상세 정보 조회
- 반응형 디자인 구현

## 프로젝트 구조
```
src/
├── app/
│   ├── components/    # 재사용 가능한 컴포넌트
│   ├── provider/      # React Query 등 Provider 설정
│   ├── page.tsx      # 메인 페이지
│   ├── layout.tsx    # 전체 레이아웃
│   └── globals.scss  # 전역 스타일
├── service/          # API 관련 서비스 로직
└── lib/             # 유틸리티 함수 및 공통 로직
```

## 실행 방법
1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 구현 특징
- Next.js 13+ App Router 사용
- React Query를 활용한 효율적인 상태 관리
- SASS를 활용한 모듈화된 스타일링
- TypeScript를 활용한 타입 안정성 확보

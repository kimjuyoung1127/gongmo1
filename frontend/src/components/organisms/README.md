# Organisms 컴포넌트

이 디렉토리는 Atomic Design 패턴의 **Organisms** 레벨 컴포넌트들을 포함합니다.
Organisms는 Molecule, Atom, 기타 Organism들이 결합하여 생성된 복잡한 UI 구성 요소입니다. 페이지의 특정 섹션을 형성하며, 비즈니스 로직과 상태 관리가 포함될 수 있습니다.

## 컴포넌트 목록

### 1. `CommentSection.tsx`
**설명**: 특정 게시글에 대한 댓글 목록을 표시하고, 새 댓글을 작성하거나 기존 댓글을 삭제하는 기능을 제공합니다.

- **주요 기능**:
  - 댓글 목록 렌더링 (`CommentItem` 사용)
  - 새 댓글 작성 폼 (인증된 사용자만 접근 가능)
  - 댓글 삭제 기능
  - `useComments` 커스텀 훅을 통한 데이터 및 상태 관리
  - 다국어 지원 (`useDictionary`)

### 2. `PostForm.tsx`
**설명**: 게시글을 작성하거나 수정하기 위한 폼 컴포넌트입니다.

- **주요 기능**:
  - 카테고리 선택, 제목, 내용 입력 필드 제공
  - 게시글 생성 및 수정 API 호출 (`postService` 사용)
  - 폼 유효성 검사 (필수 입력 항목 체크)
  - 다국어 카테고리 이름 표시
  - 작업 완료 후 페이지 이동 처리

### 3. `PostList.tsx`
**설명**: 게시글 목록을 카드 형태로 보여주고, 페이지네이션 기능을 제공합니다.

- **주요 기능**:
  - `PostCard`를 사용한 게시글 리스트 렌더링
  - 페이지네이션 컨트롤 (이전/다음 페이지)
  - 로딩 스피너 및 에러 메시지 표시
  - 게시글이 없을 경우 안내 메시지 표시
  - 현재 언어 설정에 따른 카테고리 명칭 표시

## 의존성
이 컴포넌트들은 주로 다음 요소들에 의존합니다:
- **Atoms**: `Button`, `Input`, `Textarea`, `Select`, `LoadingSpinner`, `Alert` 등
- **Molecules**: `CommentItem`, `PostCard` 등
- **Contexts**: `DictionaryContext` (다국어 지원)
- **Hooks**: `useComments`, `useRouter` 등
- **Types**: `Post`, `Category`, `PostCreate` 등 (backend Pydantic 모델과 매칭)

// 먼저 변수와 상수를 지정
const list = document.getElementById("list");
// const createBtn = document.getElementById("create-btn");
// 'Add' 버튼과 입력 필드에 대한 참조를 가져온다.
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");

// todos 배열 처리, 초기 항목들을 화면에 표시하는 로직
// document.addEventListener("DOMContentLoaded", () => {
//     todos.forEach((todo) => {
//         const { itemEl } = createTodoElement(todo);
//         list.prepend(itemEl);
//     });
// });

// 먼저 투두리스트를 배열 안에 넣어주고, 여기 데이터를 이용해서 리스트(요소)를 화면에 하나씩 생성할 예정
// let todos = [
//     { id: new Date().getTime(), text: "밥먹기", complete: false },
//     { id: new Date().getTime(), text: "물마시기", complete: false },
//     { id: new Date().getTime(), text: "화장실가기", complete: false },
// ];
let todos = [];

// 클릭이벤트가 발생했을 때 리스너를 등록
// createBtn.addEventListener("click", () => {});
// createBtn.addEventListener("click", createNewTodo);

// 'Add' 버튼 클릭 이벤트 리스너를 등록
addBtn.addEventListener("click", createNewTodo);

// createNewTodo 함수 생성
function createNewTodo() {
    // 데이터
    // 새로운 아이템 객체 생성
    // const item = { id: new Date().getTime(), text: "", complete: false };
    // unshift 메서드, 배열 처음에 새로운 아이템을 추가
    // todos.unshift(item);

    // 입력 필드에서 텍스트를 가져와 공백을 제거
    const text = todoInput.value.trim();

    if (text) {
        // 텍스트가 비어있지 않은 경우에만 새로운 항목을 추가
        // 새로운 할 일 객체를 만들고, 사용자가 입력한 텍스트를 할당
        const item = { id: new Date().getTime(), text: text, complete: false };
        todos.unshift(item); // 할 일 목록에 새로운 항목을 추가

        // 변경 사항을 저장하고, 화면을 업데이트
        saveToLocalStorage(); // 변경사항을 로컬 스토리지에 저장
        displayTodos(); // 화면을 새로고침하여 모든 할 일 목록을 다시 표시
        todoInput.value = ""; // 입력 필드를 초기화
    }

    // 요소 생성하기
    // 반환 값 넣어주기
    // const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // // 리스트 요소 안에 방금 생성한  아이템 요소 추가
    // list.prepend(itemEl);

    // inputEl.removeAttribute("disabled");
    // inputEl.focus();

    // // 로컬스토리지 저장 함수를 여기서 호출
    // saveToLocalStorage();
}
// 매개변수로 item 가져오기
function createTodoElement(item) {
    // document.createElement은 자바스크립트에서 새로운 HTML 요소를 생성할 때 사용하는 메서드
    const itemEl = document.createElement("div");
    // 생성된 요소에 클래스, ID, 텍스트 내용 등을 추가
    // classList를 사용하는 주된 이유는 HTML 요소의 클래스를 편리하게 조작
    // className 속성을 직접 조작하여 클래스를 추가하거나 제거하는 것보다 classList를 사용하는 것이 코드를 더 간결하고 이해하기 쉽게
    // classList의 add(), remove(), toggle() 메소드를 사용하면 특정 조건에 따라 클래스를 추가하거나 제거하는 로직을 쉽게 구현
    itemEl.classList.add("item");

    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;

    // 체크하면 글자에 줄이 생기는 함수
    if (item.complete) {
        itemEl.classList.add("complete");
    }

    // 사용자의 입력을 받지 않은 특정 초기값 설정
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    // setAttribute 메소드는 HTML 요소(element)에 새로운 속성(attribute)을 추가하거나, 이미 존재하는 속성의 값을 변경하는 데 사용
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    // classList.add("") 메소드는 해당 HTML 요소에 새로운 클래스를 추가
    // Material Icons 폰트 라이브러리를 사용할 때 이용되는 클래스명
    editBtnEl.classList.add("material-icons");
    // innerText 프로퍼티를 사용하는 이유는 HTML 요소의 가시적(화면에 표시되는) 텍스트 콘텐츠를 가져오거나 설정
    // 사용자에게 실제로 보여지는 텍스트를 처리해야 하는 경우에는 innerText가 더 적합
    // 버튼에는 사용자가 볼 수 있는 텍스트로서 "edit"이 표시
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    // remove_circle 아이콘은 글자 그대로 원(circle) 안에 빼기(-) 기호가 있는 형태
    // 사용자에게 해당 버튼이 무언가를 제거하거나 삭제하는 기능을 수행한다는 것을 직관적으로 이해시키는 데 도움
    removeBtnEl.innerText = "remove_circle";

    // 체크 박스를 누르면 체인지 이벤트가 발생했을 때 함수를 호출
    // item. 클릭을 했을 땐 TRUE, complete
    checkboxEl.addEventListener("change", () => {
        item.complete = checkboxEl.checked;

        // 체크박스를 실행했을 때 div 태그 안에 넣어주기
        if (item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }
        saveToLocalStorage();
    });

    // 클릭 이벤트가 발생했을 때
    // 편집 버튼을 클릭할 때 입력 필드를 활성화하고 포커스를 맞추는 기능을 구현
    // 할 일 수정 기능 수정
    // 사용자가 입력 필드를 수정하고 다른 곳을 클릭했을 때 (blur 이벤트 발생 시),
    // 변경사항을 todos 배열에 반영하고 로컬 스토리지에 저장
    editBtnEl.addEventListener("click", () => {
        // inputEl이라는 요소에서 disabled 속성을 제거하는 역할
        // 특정 입력 요소를 다시 사용할 수 있도록 활성화시키는 역할
        // disabled 속성은 HTML 요소를 비활성화시키는 데 사용
        // inputEl 요소를 다시 활성화하여 사용자가 클릭하거나 값을 입력할 수 있게 만듭니다.
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });

    // 클릭 이벤트가 발생했을 때, 해당 아이템을 삭제하는 로직 추가
    // 해당 버튼을 클릭했을 때 할 일 목록에서 아이템을 삭제하는 기능을 수행
    removeBtnEl.addEventListener("click", () => {
        // item.id와 일치하는 id 속성을 가진 요소를 todos 배열에서 제거하는 것
        // 배열에서 해당 아이템을 제거
        //  모든 요소로 구성된 새 배열을 생성합니다. 주어진 함수는 각 요소를 대상으로 호출되며, 이 경우 각 요소는 t로 표시
        todos = todos.filter((t) => t.id !== item.id);

        itemEl.remove(); // DOM에서 item 요소를 제거
        // list.removeChild(itemEl); // DOM에서 item 요소를 제거(더 넓은 범위의 브라우저 호환성)
        saveToLocalStorage(); // todos 데이터 변경할 때 마다 saveToLocalStorage() 호출하면 된다.
    });

    // 인풋이라는 이벤트가 발생했을 때 함수를 호출
    // 아이템에 글자 값을 넣어주기
    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });

    // 블러 이벤트가 발생을 했을 때
    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        item.text = inputEl.value; // 변경된 텍스트를 item 객체에 반영
        saveToLocalStorage(); // 변경사항을 저장
    });

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    // 엘리먼트 반환 해주기
    return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

// 로컬스토리지 저장 함수
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("my_todos");

    // 만약에 데이터가 있으면 스트링을 배열로 바꿔준다.
    // parse 메서드 사용
    if (data) {
        todos = JSON.parse(data);
    }
}

// 호출
// {} {}
// for 루프 순회
// 배열 안에 객체 순회
// 할 일 목록 출력 기능 수정
function displayTodos() {
    list.innerHTML = ""; // 목록 초기화
    loadFromLocalStorage(); // 로컬스토리지에 최신 데이터 로드

    todos.forEach((item) => {
        const { itemEl } = createTodoElement(item);
        list.appendChild(itemEl);
    });

    // for (let i = 0; i < todos.length; i++) {
    //     const item = todos[i];
    //     const { itemEl } = createTodoElement(item);

    //     list.append(itemEl);
    // }
}

displayTodos();

// classList를 사용하는 주된 이유는 HTML 요소의 클래스를 편리하게 조작
// JavaScript를 통해 페이지의 레이아웃이나 외관을 제어
// 사용 예:
// 클래스 추가: element.classList.add("new-class")
// 클래스 제거: element.classList.remove("unwanted-class")
// 클래스 토글: element.classList.toggle("toggle-class")
// 클래스 존재 여부 확인: element.classList.contains("class-name")





const app = document.getElementById("app");

function render(path) {
  if (path === "/") {
    app.innerHTML = "<h1>Home</h1><p>여기는 홈 화면입니다.</p>";
  } else if (path === "/about") {
    app.innerHTML = "<h1>About</h1><p>여기는 소개 화면입니다.</p>";
  } else if (path === "/contact") {
    app.innerHTML = "<h1>Contact</h1><p>여기는 연락처 화면입니다.</p>";
  } else {
    app.innerHTML = "<h1>404</h1><p>페이지를 찾을 수 없습니다.</p>";
  }
}

function navigateTo(url) {
  history.pushState(null, null, url);
  render(url);
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.getAttribute("href"));
  }
});

window.addEventListener("popstate", () => {
  render(location.pathname);
});

render(location.pathname);
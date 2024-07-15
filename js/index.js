let userSerachEndpoint = "https://api.github.com/search/users?q=";
let userReposEndpoint = "https://api.github.com/users";

window.onload = function () {
  let form = document.getElementById("github-form");
  let userList = document.getElementById("user-list");

  function showUser(user) {
    //showing their username, avatar and a link to their profile
    let userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <h2>${user.login}</h2>
      <img src="${user.avatar_url}" />
      <a href="${user.html_url}">Profile</a>
    `;

    userDiv.addEventListener("click", function () {
      fetch(`${userReposEndpoint}/${user.login}/repos`)
        .then((response) => response.json())
        .then((data) => {
          let repoList = document.createElement("ul");
          userDiv.appendChild(repoList);

          data.forEach((repo) => {
            let repoLi = document.createElement("li");
            repoLi.innerText = repo.name;
            repoList.appendChild(repoLi);
          });
        });
    });

    userList.appendChild(userDiv);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let searchValue = event.target.search.value;

    fetch(`${userSerachEndpoint}${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        userList.innerHTML = "";

        data.items.forEach((user) => {
          showUser(user);
        });
      });
  });
};
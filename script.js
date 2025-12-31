const ADMIN_EMAIL = "admin@hg.com";
const ADMIN_PASS = "123456";

let images = [];
for (let i = 1; i <= 10; i++) {
  images.push(`https://picsum.photos/800/400?random=${i}`);
}
let index = 0;

setInterval(() => {
  document.getElementById("sliderImage").src = images[index];
  index = (index + 1) % images.length;
}, 5000);

// REGISTER
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    email: regEmail.value,
    phone: regPhone.value,
    password: regPassword.value
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered Successfully");
  e.target.reset();
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  let email = loginEmail.value;
  let pass = loginPassword.value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    authSection.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    loadUsers();
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(u => u.email === email && u.password === pass);

  if (found) {
    authSection.classList.add("hidden");
    homePage.classList.remove("hidden");
  } else {
    alert("Login Failed");
  }
});

// ADMIN LOAD USERS
function loadUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  userTable.innerHTML = "";
  users.forEach((u, i) => {
    userTable.innerHTML += `
      <tr>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td>${u.password}</td>
        <td><button onclick="deleteUser(${i})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users"));
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function logout() {
  location.reload();
}

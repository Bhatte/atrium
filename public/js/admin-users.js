// The administration page loads staff accounts from the accounts endpoint.
(function () {
  var body = document.getElementById("admin-users");
  if (!body) return;

  fetch("/api/admin/users", { credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (users) {
      users.forEach(function (u) {
        var tr = document.createElement("tr");
        [u.id, u.displayName, u.username, u.department, u.role].forEach(function (value) {
          var td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
        });
        body.appendChild(tr);
      });
    })
    .catch(function () {
      body.innerHTML = '<tr><td colspan="5">Staff accounts could not be loaded.</td></tr>';
    });
})();

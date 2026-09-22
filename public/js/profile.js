// The profile page keeps its details in step with the server after a save.
(function () {
  var id = document.querySelector('input[name="userId"]');
  if (!id) return;

  fetch("/api/profile/" + id.value, { credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (profile) {
      if (!profile) return;
      var set = function (el, value) { if (el && value) el.textContent = value; };
      set(document.getElementById("profile-name"), profile.displayName);
      set(document.getElementById("profile-email"), profile.email);
      set(document.getElementById("profile-department"), profile.department);
    })
    .catch(function () { /* the page already shows the details server-side */ });
})();

const form = document.querySelector("form");
const deleteRestaurant = document.querySelector("#delete-restaurant");

// Remove 'was-validated' when the form is cleared
form.addEventListener("reset", () => {
  form.classList.remove("was-validated");
});

// Form validation
form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
  }
});

function confirmDelete(id) {
  deleteRestaurant.action = `/restaurant/${id}?_method=DELETE`;
  confirm("確定要刪除嗎？") ? deleteRestaurant.submit() : undefined;
}

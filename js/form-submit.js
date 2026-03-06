const form = document.getElementById("contact-form");
const toast = document.getElementById("success-toast");

function showToast() {
  toast.setAttribute("aria-hidden", "false");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.setAttribute("aria-hidden", "true");
  }, 3500);
}

function setFieldError(field, isError) {
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  wrapper.classList.toggle("has-error", isError);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;

  const requiredInputs = form.querySelectorAll(
    "input[required], textarea[required]",
  );
  requiredInputs.forEach((input) => {
    let invalid = false;

    if (input.type === "email") {
      invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    } else if (input.type === "checkbox") {
      invalid = !input.checked;
    } else {
      invalid = input.value === "";
    }

    setFieldError(input, invalid);
    if (invalid) hasError = true;
  });

  const queryChecked = form.querySelector('input[name="queryType"]:checked');
  const queryField = form.querySelector(".field.query");
  if (!queryChecked) {
    queryField.classList.add("has-error");
    hasError = true;
  } else {
    queryField.classList.remove("has-error");
  }

  if (!hasError) {
    form.reset();
    showToast();
  }
});

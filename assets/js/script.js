const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const consent = document.getElementById("consent");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const queryTypeError = document.getElementById("queryTypeError");
const messageError = document.getElementById("messageError");
const consentError = document.getElementById("consentError");

const errorClass = "input--error";
const okClass = "input--ok";
const hiddenClass = "is-hidden";
const radioErrorClass = "radio--error";
const toastShowClass = "toast--show";

function setFieldError(inputEl, errorEl, msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove(hiddenClass);

  inputEl.setAttribute("aria-invalid", "true");
  if (errorEl.id) inputEl.setAttribute("aria-describedby", errorEl.id);

  inputEl.classList.remove(okClass);
  inputEl.classList.add(errorClass);
}

function clearFieldError(inputEl, errorEl) {
  errorEl.textContent = "";
  errorEl.classList.add(hiddenClass);

  inputEl.removeAttribute("aria-invalid");
  inputEl.removeAttribute("aria-describedby");

  inputEl.classList.remove(errorClass);
  inputEl.classList.add(okClass);
}

function getSelectedQueryType() {
  const checked = form.querySelector('input[name="queryType"]:checked');
  return checked ? checked.value : "";
}

function setQueryTypeError(msg) {
  queryTypeError.textContent = msg;
  queryTypeError.classList.remove(hiddenClass);

  const cards = [...form.querySelectorAll('input[name="queryType"]')].map((r) =>
    r.closest("label"),
  );
  cards.forEach((c) => c.classList.add(radioErrorClass));
}

function clearQueryTypeError() {
  queryTypeError.textContent = "";
  queryTypeError.classList.add(hiddenClass);

  const cards = [...form.querySelectorAll('input[name="queryType"]')].map((r) =>
    r.closest("label"),
  );
  cards.forEach((c) => c.classList.remove(radioErrorClass));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

let toastTimer = null;
function showToast() {
  toast.classList.add(toastShowClass);

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove(toastShowClass);
  }, 3500);
}

[firstName, lastName, email, message].forEach((el) => {
  el.addEventListener("input", () => {
    const map = {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      message: messageError,
    };
    clearFieldError(el, map[el.id]);
  });
});

[...form.querySelectorAll('input[name="queryType"]')].forEach((r) => {
  r.addEventListener("change", () => clearQueryTypeError());
});

consent.addEventListener("change", () => {
  consentError.textContent = "";
  consentError.classList.add(hiddenClass);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  if (!firstName.value.trim()) {
    setFieldError(firstName, firstNameError, "This field is required");
    valid = false;
  } else {
    clearFieldError(firstName, firstNameError);
  }

  if (!lastName.value.trim()) {
    setFieldError(lastName, lastNameError, "This field is required");
    valid = false;
  } else {
    clearFieldError(lastName, lastNameError);
  }

  if (!email.value.trim()) {
    setFieldError(email, emailError, "This field is required");
    valid = false;
  } else if (!isValidEmail(email.value)) {
    setFieldError(email, emailError, "Please enter a valid email address");
    valid = false;
  } else {
    clearFieldError(email, emailError);
  }

  if (!getSelectedQueryType()) {
    setQueryTypeError("Please select a query type");
    valid = false;
  } else {
    clearQueryTypeError();
  }

  if (!message.value.trim()) {
    setFieldError(message, messageError, "This field is required");
    valid = false;
  } else {
    clearFieldError(message, messageError);
  }

  if (!consent.checked) {
    consentError.textContent =
      "To submit this form, please consent to being contacted";
    consentError.classList.remove(hiddenClass);
    valid = false;
  } else {
    consentError.textContent = "";
    consentError.classList.add(hiddenClass);
  }

  if (!valid) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  showToast();
  form.reset();
  clearQueryTypeError();
});

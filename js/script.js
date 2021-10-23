const form = document.querySelector(".content__form");
const inputs = document.querySelectorAll(".content__form-input");
const errorIcons = document.querySelectorAll(".content__form-error");
const errorMessage = document.querySelectorAll(".content__error-message");
const [firstNameInput, lastNameInput, emailInput, passwordInput] = [...inputs];
const [firstNameError, lastNameError, emailError, passwordError] = [
  ...errorMessage,
];

const checkeEmail = (input) => {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
  return regexEmail.test(input);
};
const checkPassword = (input) => {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  return regexPassword.test(input);
};

const findIconParent = (iconParent) =>
  [...errorIcons][[...inputs].indexOf(iconParent)];

const checkInputs = function () {
  const userNameValue = firstNameInput.value.trim();
  const userNameValue2 = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (userNameValue == null || userNameValue === "") {
    setErrorFor(firstNameInput, firstNameError, "First Name cannot be empty");
  } else {
    setSuccsessFor(firstNameInput, firstNameError);
  }

  if (userNameValue2 == null || userNameValue2 === "") {
    setErrorFor(lastNameInput, lastNameError, "Last Name cannot be empty");
  } else {
    setSuccsessFor(lastNameInput, lastNameError);
  }

  if (emailValue == null || emailValue === "") {
    setErrorFor(emailInput, emailError, "Email address cannot be empty");
  } else if (!checkeEmail(emailValue)) {
    setErrorFor(emailInput, emailError, "Looks like this is note an email");
  } else {
    setSuccsessFor(emailInput, emailError);
  }

  if (passwordValue == null || passwordValue === "") {
    setErrorFor(passwordInput, passwordError, "Password cannot be empty");
  } else if (
    (!checkPassword(passwordValue) &&
      !/[\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?\/]/g.test(
        passwordValue
      )) ||
    !/\d/g.test(passwordValue) ||
    passwordValue.length < 8
  ) {
    setErrorFor(
      passwordInput,
      passwordError,
      "Password must be minimum 8 characters, include at least one number and one special character"
    );
  } else {
    setSuccsessFor(passwordInput, passwordError);
  }
};

const setErrorFor = function (input, error, message) {
  input.setAttribute("aria-describedBy", input.id);
  input.setAttribute("aria-invalid", "true");
  input.style.outline = "1px solid hsl(0, 100%, 74%)";
  input.style.color = "hsl(0, 100%, 74%)";
  error.classList.remove("content__error-message--hidden");
  error.innerHTML = message;
  findIconParent(input).classList.remove("content__form-error--hidden");
};

const setSuccsessFor = function (input, error) {
  input.removeAttribute("aria-describedBy");
  input.removeAttribute("aria-invalid");
  input.style.outline = "1px solid hsl(154, 59%, 51%)";
  input.style.color = "hsl(154, 59%, 51%)";
  error.classList.add("content__error-message--hidden");
  input.classList.add("input__succsess");
  findIconParent(input).classList.add("content__form-error--hidden");
};

window.onload = function () {
  [...inputs].map((el) => (el.value = ""));
};

const successMessage = function () {
  if (
    [...errorIcons].every((el) =>
      el.classList.contains("content__form-error--hidden")
    )
  ) {
    setTimeout(() => {
      [...inputs].map((el) => {
        el.value = "";
        el.style.outline = `none`;
        el.style.color = "hsl(249, 10%, 26%)";
      });
    }, 1500);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  successMessage();
});

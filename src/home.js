/* Form validation */

const reserve_Form = document.getElementById("reserveForm");
const client_name = document.getElementById("reserveName");
const number = document.getElementById("reserveNumber");
const email = document.getElementById("reserveEmail");
const date = document.getElementById("reserveDate");
const successMessage = document.querySelector(".reservationMessage");
const submit = document.querySelector(".reserveBtn");
const successMessage_close = document.querySelector(".closeBtn");

reserve_Form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateInputs()) {
    displaySuccessMessage();
    reserve_Form.reset();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error"); 

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error"); 

  errorDisplay.innerText = '';
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
}

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const isValidPhoneNumber = (number) => {
  const re = /^\d{10}$/;
  return re.test(String(number));
}

const isFutureDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0); // Today's date at midnight
  const inputDate = new Date(date).setHours(0, 0, 0, 0);
  return inputDate > today;
}

const validateInputs = () => {
  const nameValue = client_name.value.trim();
  const numberValue = number.value.trim();
  const emailValue = email.value.trim();
  const dateValue = date.value.trim();
  let isValid = true;

  if (nameValue === '') {
    setError(client_name, 'Name cannot be blank');
    isValid = false;
  } else {
    setSuccess(client_name);
  }

  if (numberValue === '') {
    setError(number, 'Phone number cannot be blank');
    isValid = false;
  } else if (!isValidPhoneNumber(numberValue)) {
    setError(number, 'Provide a valid 10-digit phone number');
    isValid = false;
  } else {
    setSuccess(number);
  }

  if (emailValue === '') {
    setError(email, 'Email cannot be blank');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (dateValue === '') {
    setError(date, 'Date cannot be blank');
    isValid = false;
  } else if (!isFutureDate(dateValue)) {
    setError(date, 'Reservation date must be in the future');
    isValid = false;
  } else {
    setSuccess(date);
  }

  return isValid;
}

const displaySuccessMessage = () => {
  submit.addEventListener("click", () => {
    successMessage.classList.add("successMessage");
  })
  
  successMessage_close.addEventListener("click", () => {
    successMessage.classList.remove("successMessage");
  })
}



/* - - - - - - - - */
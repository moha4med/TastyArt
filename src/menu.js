/* Checkout validation */

const checkoutForm = document.getElementById("checkout-form");
const checkout_name = document.getElementById("checkoutName");
const checkout_number = document.getElementById("checkoutNumber");
const checkout_address = document.getElementById("checkoutAddress");
const successMessage = document.querySelector(".checkoutMessage");
const submit = document.querySelector(".confirm-btn");
const successMessage_close = document.querySelector(".closeBtn");

const cartTAB = document.querySelector(".cart-TAB");
const Sections = document.querySelectorAll(".wrapper");
const checkoutTAB = document.querySelector(".checkout-TAB");

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  if (validateCheckout()) {
    displaySuccessMessage();
    checkoutForm.reset();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".invlaid"); 

  errorDisplay.innerText = message;
  inputControl.classList.add("invlaid");
  inputControl.classList.remove("success");
}

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".invlaid"); 

  errorDisplay.innerText = '';
  inputControl.classList.add("success");
  inputControl.classList.remove("invlaid");
}

const isValidPhoneNumber = (number) => {
  const re = /^\d{10}$/;
  return re.test(String(number));
}

const validateCheckout = () => {
  const nameValue = checkout_name.value.trim();
  const numberValue = checkout_number.value.trim();
  const addressValue = checkout_address.value.trim();
  let isValid = true;

  if (nameValue === '') {
    setError(checkout_name, 'Name cannot be blank');
    isValid = false;
  } else {
    setSuccess(checkout_name);
  }

  if (numberValue === '') {
    setError(checkout_number, 'Phone number cannot be blank');
    isValid = false;
  } else if (!isValidPhoneNumber(numberValue)) {
    setError(checkout_number, 'Provide a valid 10-digit phone number');
    isValid = false;
  } else {
    setSuccess(checkout_number);
  }

  if (addressValue === '') {
    setError(checkout_address, 'Address cannot be blank');
    isValid = false;
  } else {
    setSuccess(checkout_address);
  }

  return isValid;
}

const displaySuccessMessage = () => {
  submit.addEventListener("click", () => {
    successMessage.classList.add("successCheckout");
    cartTAB.classList.remove("cart-show");
    Sections.forEach(section => {
      section.classList.remove("body-move");
    });
    checkoutTAB.classList.remove("checkout-show");
  })
  
  successMessage_close.addEventListener("click", () => {
    successMessage.classList.remove("successCheckout");
  })
}

/* - - - - - - - - - - */
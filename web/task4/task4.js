const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
   
    e.preventDefault(); //if some error occurs. without this we have to fill all the form again

    if (validateForm()) {
        alert("Form submitted successfully!");
    }
});


function validateName() {
    const name = document.getElementById("name").value;
    const error = document.getElementById("nameError");

    if (!/^[A-Za-z ]+$/.test(name)) {
        error.textContent = "Name should have aplabets only.";
        return false;
    }
    else{
        error.textContent = "";
        return true;
    }

}

function validateEmail() {
    const email = document.getElementById("email").value;
    const error = document.getElementById("emailError");

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        error.textContent = "Invalid email format";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const error = document.getElementById("passwordError");
    const strength = document.getElementById("passwordStrength");

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let percentage = (score/5)*100;
    percentage = Math.floor(percentage);

    strength.textContent = `Strength: ${percentage}%`;

    if (percentage < 80) {
        error.textContent = "Password is weak";
        return false;
    }

    error.textContent = "";
    return true;
}


function validateDOB() {
    const dob = new Date(document.getElementById("dob").value);
    const error = document.getElementById("dobError");

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
        error.textContent = "You must be at least 18 years old";
        return false;
    }

    error.textContent = "";
    return true;
}

function validatePhone() {
    const phone = document.getElementById("phone").value;
    const error = document.getElementById("phoneError");

    if (!/^\d{10}$/.test(phone)) {
        error.textContent = "Phone must be exactly 10 digits";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateForm() {
    return (validateName() && validateEmail() && validatePassword() && validateDOB() && validatePhone());
}

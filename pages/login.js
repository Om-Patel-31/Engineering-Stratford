document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = 'EngStratford@2024';
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    const resultMessage = document.getElementById('resultMessage');
    let attempts = 3;
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const enteredPassword = passwordInput.value;
        if (enteredPassword === correctPassword) {
            resultMessage.textContent = 'Password is correct!';
            resultMessage.style.color = 'green';
        } else {
            attempts--;
            if (attempts > 0) {
                resultMessage.textContent = `Password is incorrect! You have ${attempts} attempts left.`;
                resultMessage.style.color = 'red';
            } else {
                resultMessage.textContent = 'You have been locked out due to too many incorrect attempts.';
                resultMessage.style.color = 'red';
                passwordInput.disabled = true;
                submitButton.disabled = true;
            }
        }
    });
});
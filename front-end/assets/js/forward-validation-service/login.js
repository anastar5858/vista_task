const loginForwarder = async (emailInput, passwordInput, markErrElem) => {
    const payload = {
        email: emailInput.current.value,
        password: passwordInput.current.value,
    }
    const loginRequest = await fetch('http://localhost:8080/api/login', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (loginRequest.ok) {
        const loginResponse = await loginRequest.json();
        if (loginResponse === 'invalid') markErrElem.current.firstChild.textContent = 'Invalid Credentials';
        else {
            sharedRegister(true);
        }
    } else {
        // todo: handle server error
    }
}
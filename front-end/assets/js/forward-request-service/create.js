const validateRequestInput = async (titleInput, descriptionTextBox, initialStatus, button) => {
    const title = titleInput.current.value.trim();
    const desc = descriptionTextBox.current.value.trim();
    // client-side validation
    // no empty data
    if (title === '' || desc === '' || initialStatus === '') return btnErrorHandler('Missing Input', 'error', button);
    // forward to server after validations
    const payload = {
        title,
        desc,
        status: initialStatus,
    }
    const createRequestRequest = await fetch('http://localhost:8080/api/create-request', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if (createRequestRequest.ok) {
        const createRequestResponse = await createRequestRequest.json();
        if (createRequestResponse === 'invalid') return btnErrorHandler('Could not process. Check input ot try re-logging!', 'error', button);
        console.log(createRequestResponse)
    } else {
        // todo: handle server error
    }
}
const btnErrorHandler = (message, type, button) => {
    const currentText = button.textContent;
    button.disabled = true;
    button.textContent = message;
    button.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => {
        button.disabled = false;
        button.textContent = currentText;
        button.style.color = 'black';
    }, 2000);
}
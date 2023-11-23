const React = ('react');
const languageObj = require('../raw/language.json');

const CreateForm = (props) => {
    const language = props.language
    console.log(language);
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const titleRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const [status, setStatus] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [languageData, setLanguageData] = React.useState({});
    React.useEffect(() => {
        setLanguageData(languageObj)
    }, []);
   return (
    <>
        <form id='request-from' className='plain-surface'>
            <section className='sec-flex'>
                <input id='request-title' ref={titleRef} className='w-30 middle media-wide' type='text' placeholder={Object.keys(languageData).length > 0 ? languageData.create.titlePlaceholder[language] : ''}></input>
                <textarea id='request-desc' ref={descriptionRef} className='middle' placeholder={Object.keys(languageData).length > 0 ? languageData.create.descPlaceholder[language] : ''} rows='10' cols={windowWidth < 870 ? '40' : '100'}></textarea>
            </section>
            <section className='sec-flex w-center'>
                <label id='pending-demo' onClick={() => setStatus('pending')} className="radio-container" htmlFor='pending' >
                    <strong>{Object.keys(languageData).length > 0 ? languageData.create.pending[language] : ''}</strong>
                    <input id='pending' type='radio' name='status'></input>
                    <span className="radio-dot"></span>
                </label>
                <label onClick={() => setStatus('in-progress')} className="radio-container" htmlFor='progress'>
                    <strong>{Object.keys(languageData).length > 0 ? languageData.create.inProgress[language] : ''}</strong>
                    <input id='progress' type='radio' name='status'></input>
                    <span className="radio-dot"></span>                 
                </label>
                <label onClick={() => setStatus('completed')} className="radio-container" htmlFor='completed'>
                    <strong>{Object.keys(languageData).length > 0 ? languageData.create.completed[language] : ''}</strong>
                    <input id='completed' type='radio' name='status'></input>
                    <span className="radio-dot"></span> 
                </label>
            </section>
            <section className='sec-flex w-center'>
                <label id='request-crawler-demo' htmlFor='request-crawler'>
                        <strong>{Object.keys(languageData).length > 0 ? languageData.create.autoBack[language] : ''}</strong>
                        <input onClick={(e) => e.currentTarget.checked ? setChecked(true) : setChecked(false)} id='request-crawler' className='middle' type='checkBox' name='img'></input>
                </label>
            </section>
            <section id='request-btn' >
                <button id='request-btn-demo' onClick={(e) => {
                    e.preventDefault();
                    validateRequestInput(titleRef, descriptionRef, status, e.currentTarget, checked, language, languageData);
                }} className='middle'>{Object.keys(languageData).length > 0 ? languageData.create.addBtn[language] : ''}</button>
            </section>
        </form>
    </>
   ) 
}


const validateRequestInput = async (titleInput, descriptionTextBox, initialStatus, button, checked, language, languageData) => {
    const title = titleInput.current.value.trim();
    const desc = descriptionTextBox.current.value.trim();
    // client-side validation
    // no empty data
    if (title === '' || desc === '' || initialStatus === '') return btnErrorHandler(languageData.errors.missingInput[language], 'error', button);
    // forward to server after validations
    const payload = {
        title,
        desc,
        status: initialStatus,
        autoImg: checked,
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
        if (createRequestResponse === 'invalid') return btnErrorHandler(languageData.errors.noProcess[language], 'error', button);
        else return btnErrorHandler(languageData.success.requestCreated[language], 'success', button);
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
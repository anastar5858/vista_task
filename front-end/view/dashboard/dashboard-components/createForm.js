const CreateForm = (props) => {
    const language = props.language
    console.log(language);
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const titleRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const [status, setStatus] = React.useState('');
    const [checked, setChecked] = React.useState(false);
   return (
    <>
        <form id='request-from' className='plain-surface'>
            <section className='sec-flex'>
                <input id='request-title' ref={titleRef} className='w-30 middle media-wide' type='text' placeholder='Title'></input>
                <textarea id='request-desc' ref={descriptionRef} className='middle' placeholder='Description' rows='10' cols={windowWidth < 870 ? '40' : '100'}></textarea>
            </section>
            <section className='sec-flex w-center'>
                <label id='pending-demo' onClick={() => setStatus('pending')} className="radio-container" htmlFor='pending'>
                    <strong>Pending</strong>
                    <input id='pending' type='radio' name='status'></input>
                    <span className="radio-dot"></span>
                </label>
                <label onClick={() => setStatus('in-progress')} className="radio-container" htmlFor='progress'>
                    <strong>In-progress</strong>
                    <input id='progress' type='radio' name='status'></input>
                    <span className="radio-dot"></span>                 
                </label>
                <label onClick={() => setStatus('completed')} className="radio-container" htmlFor='completed'>
                    <strong>Completed</strong>
                    <input id='completed' type='radio' name='status'></input>
                    <span className="radio-dot"></span> 
                </label>
            </section>
            <section className='sec-flex w-center'>
                <label id='request-crawler-demo' htmlFor='request-crawler'>
                        <strong>Auto Background?</strong>
                        <input onClick={(e) => e.currentTarget.checked ? setChecked(true) : setChecked(false)} id='request-crawler' className='middle' type='checkBox' name='img'></input>
                </label>
            </section>
            <section id='request-btn' >
                <button id='request-btn-demo' onClick={(e) => {
                    e.preventDefault();
                    validateRequestInput(titleRef, descriptionRef, status, e.currentTarget, checked);
                }} className='middle'>Add</button>
            </section>
        </form>
    </>
   ) 
}
const CreateForm = () => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const titleRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const [status, setStatus] = React.useState('');
    const [checked, setChecked] = React.useState(false);
   return (
    <>
        <form id='request-from' className='plain-surface'>
            <section className='sec-flex'>
                <input ref={titleRef} className='w-30 middle media-wide' type='text' placeholder='Title'></input>
                <textarea ref={descriptionRef} className='middle' placeholder='Description' rows='10' cols={windowWidth < 870 ? '40' : '100'}></textarea>
            </section>
            <section className='sec-flex w-center'>
                <label onClick={() => setStatus('pending')} className="radio-container" htmlFor='pending'>
                    <strong>Pending</strong>
                    <input id='pending' type='radio' value='pending' name='status'></input>
                    <span className="radio-dot"></span>
                </label>
                <label onClick={() => setStatus('in-progress')} className="radio-container" htmlFor='progress'>
                    <strong>In-progress</strong>
                    <input id='progress' type='radio' value='In-progress' name='status'></input>
                    <span className="radio-dot"></span>                 
                </label>
                <label onClick={() => setStatus('completed')} className="radio-container" htmlFor='completed'>
                    <strong>Completed</strong>
                    <input id='completed' type='radio' value='Completed' name='status'></input>
                    <span className="radio-dot"></span> 
                </label>
            </section>
            <section className='sec-flex w-center'>
                <label htmlFor='auto-img'>
                        <strong>Auto Background?</strong>
                        <input onClick={(e) => e.currentTarget.checked ? setChecked(true) : setChecked(false)} id='auto-img' type='checkBox' value='auto-img' name='img'></input>
                </label>
            </section>
            <section  id='request-btn' >
                <button onClick={(e) => {
                    e.preventDefault();
                    validateRequestInput(titleRef, descriptionRef, status, e.currentTarget, checked);
                }} className='middle'>Add</button>
            </section>
        </form>
    </>
   ) 
}
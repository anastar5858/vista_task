const ManageView = () => {
    const cardContainerRef = React.useRef(null);
    const [request, setRequests] = React.useState([]);
    const [cardMode, setCardMode] = React.useState('default');
    const [indexCounter, setIndexCounter] = React.useState(0);
    const [currentRequest, setCurrentRequest] = React.useState({});
    // for filtering
    const allFilterRef = React.useRef(null);
    const userFilterRef = React.useRef(null);
    const [filter, setFilter] = React.useState('all');
    const [statusFilter, setStatusFilter] = React.useState([]);
    // for updating the status live
    const [status, setStatus] = React.useState('');
    // for checking if the current displayed card belongs to the logged in user
    const [isOwner, setIsOwner] = React.useState(false);
    // for deleting the current request
    const [deleteIndicator, setDeleteIndicator] = React.useState(false);
    // for photo display feature
    const [displayPhoto, setDisplayPhoto] = React.useState(false);
    const [currentRequestHasPhoto, setCurrentRequestHasPhoto] = React.useState(false);
    const disableOtherFilter = () => {
        allFilterRef.current.disabled = true;
        userFilterRef.current.disabled = true;
    }
    const enableOtherFilter = () => {
        allFilterRef.current.disabled = false;
        userFilterRef.current.disabled = false;
    }
    const resetPhotoFeature = () => {
        if (displayPhoto) {
            // check box was active
            const checkBox = document.getElementById('photo-mode');
            if (checkBox) {
                if (checkBox.checked) {
                    checkBox.checked = false;
                    setDisplayPhoto(false);
                    setCurrentRequestHasPhoto(false);
                    defaultCard()
                } 
            }
        } else {
            setDisplayPhoto(false);
            setCurrentRequestHasPhoto(false);
            defaultCard()
        }
    }
    const defaultCard = () => {
        const container = document.getElementById('cardContainer');
        if (container) {
            const ellipse = container.firstChild;
            if (ellipse) {
                setCurrentRequestHasPhoto(false);
                ellipse.style.removeProperty('background');
                ellipse.style.removeProperty('background-size');
                ellipse.style.removeProperty('background-repeat');
                ellipse.style.removeProperty('background-position');
            }
        } 
    }
    React.useEffect(() => {
        disableStatusCheckboxes()
        if (filter === 'all') return fetchAllRecords(setRequests, setCurrentRequest, setIndexCounter);
        if (filter === 'mine') return fetchMyRecords(setRequests, setCurrentRequest, setIndexCounter, setFilter);
        if (filter === 'status') return fetchStatusRecord(setRequests, setCurrentRequest, setIndexCounter, statusFilter, setFilter);
    }, [filter, statusFilter, deleteIndicator])
    React.useEffect(() => {
        disableStatusCheckboxes()
        if (statusFilter.length > 0) disableOtherFilter();
        if (statusFilter.length === 0) enableOtherFilter()
        // check the status filter
    }, [indexCounter, statusFilter]);
    React.useEffect(() => {
        // setting the current filter
        if (request.length > 0) {
            setCurrentRequest(request[indexCounter]);
        }
    } ,[indexCounter])
    React.useEffect( () => {
        disableStatusCheckboxes()
        if (status !== '' && status !== currentRequest.status) {
            updateRecordStatus(currentRequest, status, setRequests, setCurrentRequest);
        }
    }, [status])
    // todo: every time current request changes check if the current user is the creator to add the edit and delete functionality
    React.useEffect(() => {
        if (Object.keys(currentRequest).length > 0) {
            checkOwnership(currentRequest, setIsOwner)
        }
    }, [currentRequest])
    const disableStatusCheckboxes = () => {
        const pendingOp = document.getElementById('pending-manage');
        const progressOp =  document.getElementById('progress-manage');
        const completedOp = document.getElementById('completed-manage');
        if (pendingOp) pendingOp.checked = false;
        if (progressOp) progressOp.checked = false;
        if (completedOp) completedOp.checked = false;
    }
    React.useEffect(() => {
        if (Object.keys(currentRequest).length > 0 && displayPhoto) {
            if (currentRequest.picture) {
                if (currentRequest.picture !== '') {
                    setCurrentRequestHasPhoto(true);
                } else {
                    setCurrentRequestHasPhoto(false);
                }
            }
        } else if (Object.keys(currentRequest).length > 0 && !displayPhoto) {
            defaultCard()
        }
    }, [displayPhoto]);
    React.useEffect(() => {
        if (Object.keys(currentRequest).length > 0 && currentRequestHasPhoto) {
            const container = document.getElementById('cardContainer');
            if (container) {
                const ellipse = container.firstChild;
                if (ellipse) {
                    ellipse.style.background = `url(${currentRequest.picture})`;
                    ellipse.style.backgroundSize = 'cover';
                    ellipse.style.backgroundRepeat = 'no-repeat';
                }
            }
        }
    }, [currentRequestHasPhoto])
  return (
    <>
    <div className='flex-row plain-surface' style={{margin: '1rem 0 1rem 0', flexWrap: 'wrap'}}>
    {/* animation mode switchers */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem', marginBottom: '1rem'}}>
        <strong>Animation Options:</strong>
        <label id='default-demo' className="radio-container label" htmlFor='default'>
            <strong>No Complex Animation</strong>
            <input  onClick={() => setCardMode('default')}  id='default' type='radio' value='default' name='animation'></input>
            <span className="radio-dot"></span>
        </label>
        <label className="radio-container label" htmlFor='fly'>
            <strong>Fly/Rowing Animation</strong>
            <input onClick={() => setCardMode('fly')}  id='fly' type='radio' value='fly' name='animation'></input>
            <span className="radio-dot"></span>                 
        </label>
        <label className="radio-container label" htmlFor='rocket'>
            <strong>Rocket Animation</strong>
            <input onClick={() => setCardMode('rocket')}  id='rocket' type='radio' value='rocket' name='animation'></input>
            <span className="radio-dot"></span> 
        </label>
    </section>
    {/* navigation system */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}}>
        <strong>Navigation:</strong>
        <label id='prev-demo' className="radio-container label" htmlFor='prev'>
            <strong>Previous</strong>
            <input onClick={(e) => {
                resetPhotoFeature();
                animationHanlder(cardMode, cardContainerRef, setIndexCounter, 0, indexCounter)
            }}  id='prev' type='radio' value='prev' name='navigation'></input>
            <span className="radio-dot"></span>
        </label>
        <label className="radio-container label" htmlFor='next'>
            <strong>Next</strong>
            <input onClick={(e) => {
                resetPhotoFeature();
                const comparingTo = request.length - 1
                animationHanlder(cardMode, cardContainerRef, setIndexCounter, comparingTo, indexCounter)
            }}  id='next' type='radio' value='next' name='navigation'></input>
            <span className="radio-dot"></span>                 
        </label>  
    </section>
    {/* requests filter */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem', marginBottom: '1rem'}}>
        <strong>Filter:</strong>
        <label id='all-demo' className="radio-container label" htmlFor='all'>
            <strong>All</strong>
            <input ref={allFilterRef} onClick={() => setFilter('all')}  id='all' type='radio' value='all' name='filter'></input>
            <span className="radio-dot"></span>
        </label>
        <label id='mine-demo' className="radio-container label" htmlFor='mine'>
            <strong>My Requests</strong>
            <input ref={userFilterRef} onClick={() => setFilter('mine')}  id='mine' type='radio' value='mine' name='filter'></input>
            <span className="radio-dot"></span>                 
        </label> 
        <details id='status-filter-demo' className='flex-column'>
            <summary>Based On State:</summary>
            <label htmlFor='pen-check'>Pending</label>
            <input onClick={(e) => {
                const checkedIndicator = e.currentTarget.checked;
                const status = e.currentTarget.value;
                if (checkedIndicator) {
                    setFilter('status');
                    if (!statusFilter.includes(status)) setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        newStatusArr.push(status);
                        return newStatusArr
                    });
                } else {
                    setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        let indexToRemove = newStatusArr.indexOf(status);
                        newStatusArr.splice(indexToRemove, 1);
                        return newStatusArr
                    });
                }
            }} type='checkbox' id='pen-check' value='pending'></input>
            <label htmlFor='prog-check'>In-progress</label>
            <input className='checkbox' onClick={(e) => {
                const checkedIndicator = e.currentTarget.checked;
                const status = e.currentTarget.value;
                if (checkedIndicator) {
                    setFilter('status');
                    if (!statusFilter.includes(status)) setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        newStatusArr.push(status);
                        return newStatusArr
                    });
                } else {
                    setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        let indexToRemove = newStatusArr.indexOf(status);
                        newStatusArr.splice(indexToRemove, 1);
                        return newStatusArr
                    });
                }
            }} type='checkbox' id='prog-check' value='in-progress'></input>
            <label htmlFor='comp-check'>Completed</label>
            <input className='checkbox' onClick={(e) => {
                const checkedIndicator = e.currentTarget.checked;
                const status = e.currentTarget.value;
                if (checkedIndicator) {
                    setFilter('status');
                    if (!statusFilter.includes(status)) setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        newStatusArr.push(status);
                        return newStatusArr
                    });
                } else {
                    setStatusFilter((prev) => {
                        const newStatusArr = [...prev];
                        let indexToRemove = newStatusArr.indexOf(status);
                        newStatusArr.splice(indexToRemove, 1);
                        return newStatusArr
                    });
                }
            }} type='checkbox' id='comp-check' value='completed'></input>
        </details>
    </section>
    {/* background photo mode */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}}>
        <label id='photo-mode-demo' className="label" htmlFor='photo-mode'>
            <strong>Enable Photo Mode?</strong>
            <input  onClick={(e) => e.currentTarget.checked ? setDisplayPhoto(true) : setDisplayPhoto(false)}  id='photo-mode' className='middle' type='checkbox' name='photo-mode'></input>
        </label>
    </section>
    {/* end of main div */}
    </div>
    {/* the three card view */}
    <div ref={cardContainerRef} id="cardContainer">
        <div id={cardMode === 'default' ? 'ellipse-plain' : cardMode === 'rocket' ? 'ellipse-rocket' : 'ellipse'}>
            {Object.keys(currentRequest).length > 0 && (
                <>
                    <h3 id='request-title' className='p-1'>{currentRequest.title}</h3>
                    <p id='request-desc' className='p-1'><strong>{currentRequest.desc}</strong></p>
                    <em id='request-status' className='p-1'>
                    <label className="radio-container" htmlFor={`${currentRequest.status}`}>
                    <strong>{currentRequest.status}</strong>
                    <input id={`${currentRequest.status}`} type='radio' value={`${currentRequest.status}`} name='status' disabled></input>
                    <span className="radio-dot"></span>
                    </label>
                    </em>
                    <small id='creator-sign' className='p-1'>Created By:<br />{currentRequest.creator}</small>
                    <small id='date-sign' className='p-1'>Created On:<br />{new Date(currentRequest.date).toLocaleDateString()}</small>
                    {/* live edit a request */}
                    <strong id='live-edit-status' className='flex-column'>
                        <p>Edit the status:</p>
                        <label className="radio-container" htmlFor='pending-manage'>
                            <strong>Pending</strong>
                            <input onClick={() => setStatus('pending')}  id='pending-manage' type='radio' value='pending' name='status'></input>
                            <span className="radio-dot"></span>
                        </label>
                        <label className="radio-container" htmlFor='progress-manage'>
                            <strong>In-progress</strong>
                            <input onClick={() => setStatus('in-progress')}  id='progress-manage' type='radio' value='In-progress' name='status'></input>
                            <span className="radio-dot"></span>                 
                        </label>
                        <label className="radio-container" htmlFor='completed-manage'>
                            <strong>Completed</strong>
                            <input  onClick={() => setStatus('completed')} id='completed-manage' type='radio' value='Completed' name='status'></input>
                            <span className="radio-dot"></span> 
                        </label>
                        {isOwner && (<button id='delete-request-btn' onClick={(e) => deleteRecord(currentRequest, setDeleteIndicator, e.currentTarget)}>Delete</button>)}
                    </strong>
                    {/* rendered only if the currently viewed request card belongs to the signed in user */}
                </>
            )}
        </div>
    </div>
    </>
  ) 
}
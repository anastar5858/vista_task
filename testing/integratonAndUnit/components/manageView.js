const React = require('react');
const languageObj = require('../raw/language.json');

const ManageView = (props) => {
    const language = props.language
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
    const [languageData, setLanguageData] = React.useState({});
    // utility functions >>>
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
    const disableStatusCheckboxes = () => {
        const pendingOp = document.getElementById('pending-manage');
        const progressOp =  document.getElementById('progress-manage');
        const completedOp = document.getElementById('completed-manage');
        if (pendingOp) pendingOp.checked = false;
        if (progressOp) progressOp.checked = false;
        if (completedOp) completedOp.checked = false;
    }
    // useEffects >>>>>
    React.useEffect(() => {
        disableStatusCheckboxes()
        if (filter === 'all')  fetchAllRecords(setRequests, setCurrentRequest, setIndexCounter);
        if (filter === 'mine') fetchMyRecords(setRequests, setCurrentRequest, setIndexCounter, setFilter);
        if (filter === 'status') fetchStatusRecord(setRequests, setCurrentRequest, setIndexCounter, statusFilter, setFilter);
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
    React.useEffect(() => {
        setLanguageData(languageObj)
    }, []);
  return (
    <>
    <div className='flex-row plain-surface' style={{margin: '1rem 0 1rem 0', flexWrap: 'wrap'}}>
    {/* animation mode switchers */}
    <section id='animation-section-container' className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem', marginBottom: '1rem'}} dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''}>
        <strong>{Object.keys(languageData).length > 0 ? languageData.manage.animOptions[language] : ''}</strong>
        <label data-testid='default-demo' id='default-demo' className="radio-container label" htmlFor='default'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.noComplexAnim[language] : ''}</strong>
            <input  onClick={() => setCardMode('default')}  id='default' type='radio' value='default' name='animation'></input>
            <span className="radio-dot"></span>
        </label>
        <label data-testid='fly-demo' id='fly-demo' className="radio-container label" htmlFor='fly'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.flyAnim[language] : ''}</strong>
            <input onClick={() => setCardMode('fly')}  id='fly' type='radio' value='fly' name='animation'></input>
            <span className="radio-dot"></span>                 
        </label>
        <label data-testid='rocket-demo' id='rocket-demo' className="radio-container label" htmlFor='rocket'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.rocketAnim[language] : ''}</strong>
            <input onClick={() => setCardMode('rocket')}  id='rocket' type='radio' value='rocket' name='animation'></input>
            <span className="radio-dot"></span> 
        </label>
    </section>
    {/* navigation system */}
    <section id='navigation-section-container' className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}} dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''}>
        <strong>{Object.keys(languageData).length > 0 ? languageData.manage.navigation[language] : ''}</strong>
        <label data-testid='prev-demo' id='prev-demo' className="radio-container label" htmlFor='prev'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.prev[language] : ''}</strong>
            <input onClick={(e) => {
                resetPhotoFeature();
                setIndexCounter(indexCounter > 0 ? indexCounter - 1 : indexCounter)
            }}  id='prev' type='radio' value='prev' name='navigation'></input>
            <span className="radio-dot"></span>
        </label>
        <label data-testid='next-demo' id='next-demo' className="radio-container label" htmlFor='next'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.next[language] : ''}</strong>
            <input onClick={(e) => {
                resetPhotoFeature();
                const comparingTo = request.length - 1
                setIndexCounter(indexCounter < comparingTo ? indexCounter + 1 : indexCounter)    
            }}  id='next' type='radio' value='next' name='navigation'></input>
            <span className="radio-dot"></span>                 
        </label>  
    </section>
    {/* requests filter */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem', marginBottom: '1rem'}} dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''}>
        <strong>{Object.keys(languageData).length > 0 ? languageData.manage.filter[language] : ''}</strong>
        <label data-testid='all-demo' id='all-demo' className="radio-container label" htmlFor='all'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.all[language] : ''}</strong>
            <input ref={allFilterRef} onClick={() => setFilter('all')}  id='all' type='radio' value='all' name='filter'></input>
            <span className="radio-dot"></span>
        </label>
        <label data-testid='mine-demo' id='mine-demo' className="radio-container label" htmlFor='mine'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.mine[language] : ''}</strong>
            <input ref={userFilterRef} onClick={() => setFilter('mine')}  id='mine' type='radio' value='mine' name='filter'></input>
            <span className="radio-dot"></span>                 
        </label> 
        <details id='status-filter-demo' className='flex-column'>
            <summary>{Object.keys(languageData).length > 0 ? languageData.manage.basedOn[language] : ''}</summary>
            <label id='status-filter-demo-pending' htmlFor='pen-check'>{Object.keys(languageData).length > 0 ? languageData.create.pending[language] : ''}</label>
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
            <label htmlFor='prog-check'>{Object.keys(languageData).length > 0 ? languageData.create.inProgress[language] : ''}</label>
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
            <label data-testid='comp-check' htmlFor='comp-check'>{Object.keys(languageData).length > 0 ? languageData.create.completed[language] : ''}</label>
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
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}} >
        <label id='photo-mode-demo' className="label" htmlFor='photo-mode'>
            <strong>{Object.keys(languageData).length > 0 ? languageData.manage.photoMode[language] : ''}</strong>
            <input data-testid='photo-mode-demo' onClick={(e) =>  e.currentTarget.checked ? setDisplayPhoto(true) : setDisplayPhoto(false)}  id='photo-mode' className='middle' type='checkbox' name='photo-mode'></input>
        </label>
    </section>
    {/* end of main div */}
    </div>
    {/* the three card view */}
    <div data-testid='cardContainer' ref={cardContainerRef} id="cardContainer">
        <div id={cardMode === 'default' ? 'ellipse-plain' : cardMode === 'rocket' ? 'ellipse-rocket' : 'ellipse'}>
            {Object.keys(currentRequest).length > 0 && (
                <>
                    <h3 data-testid='request-title' id='request-title' className='p-1'>{currentRequest.title}</h3>
                    <p data-testid='request-desc' id='request-desc' className='p-1'><strong>{currentRequest.desc}</strong></p>
                    <em data-testid='request-status' id='request-status' className='p-1'>
                    <label className="radio-container" htmlFor={`${currentRequest.status}`}>
                    <strong>{currentRequest.status}</strong>
                    <input id={`${currentRequest.status}`} type='radio' value={`${currentRequest.status}`} name='status' disabled></input>
                    <span className="radio-dot"></span>
                    </label>
                    </em>
                    <small data-testid='creator-sign'  id='creator-sign' dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''} className='p-1'>{Object.keys(languageData).length > 0 ? languageData.manage.createdBy[language] : ''}<br />{currentRequest.creator}</small>
                    <small data-testid='date-sign'  id='date-sign' dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''} className='p-1'>{Object.keys(languageData).length > 0 ? languageData.manage.createdOn[language] : ''}<br />{new Date(currentRequest.date).toLocaleDateString()}</small>
                    {/* live edit a request */}
                    <strong id='live-edit-status' className='flex-column' dir={Object.keys(languageData).length > 0 ? languageData.direction[language] : ''}>
                        <p>{Object.keys(languageData).length > 0 ? languageData.manage.editStatus[language] : ''}</p>
                        <label data-testid='pending-manage' className="radio-container" htmlFor='pending-manage'>
                            <strong>{Object.keys(languageData).length > 0 ? languageData.create.pending[language] : ''}</strong>
                            <input onClick={() => setStatus('pending')}  id='pending-manage' type='radio' value='pending' name='status'></input>
                            <span className="radio-dot"></span>
                        </label>
                        <label data-testid='progress-manage' className="radio-container" htmlFor='progress-manage'>
                            <strong>{Object.keys(languageData).length > 0 ? languageData.create.inProgress[language] : ''}</strong>
                            <input onClick={() => setStatus('in-progress')}  id='progress-manage' type='radio' value='In-progress' name='status'></input>
                            <span className="radio-dot"></span>                 
                        </label>
                        <label data-testid='completed-manage' id='live-edit-completed' className="radio-container" htmlFor='completed-manage'>
                            <strong>{Object.keys(languageData).length > 0 ? languageData.create.completed[language] : ''}</strong>
                            <input  onClick={() => setStatus('completed')} id='completed-manage' type='radio' value='Completed' name='status'></input>
                            <span className="radio-dot"></span> 
                        </label>
                        {isOwner && (<button data-testid='delete-request-btn' id='delete-request-btn' onClick={(e) => deleteRecord(currentRequest, setDeleteIndicator, e.currentTarget)}>Delete</button>)}
                    </strong>
                    {/* rendered only if the currently viewed request card belongs to the signed in user */}
                </>
            )}
        </div>
    </div>
    </>
  ) 
}


const fetchAllRecords = async (setRequests, setCurrentRequest, setIndexCounter) => {
    const allRequestsRequest = await fetch('http://localhost:8080/api/all-requests', {
        method: 'GET',
        credentials: 'include',
    });
    if (allRequestsRequest.ok) {
        const allRequestsResponse = await allRequestsRequest.json();
        setRequests(allRequestsResponse);
        setCurrentRequest(allRequestsResponse[0]);
        setIndexCounter(0);
    } else {
        // todo: handle server error
    }
}
const fetchMyRecords = async (setRequests, setCurrentRequest, setIndexCounter, setFilter) => {
    const myRequestsRequest = await fetch('http://localhost:8080/api/my-requests', {
        method: 'GET', 
        credentials: 'include',
    });
    if (myRequestsRequest.ok) {
        const myRequestsResponse = await myRequestsRequest.json();
        if (myRequestsResponse.length > 0) {
            setRequests(myRequestsResponse);
            setCurrentRequest(myRequestsResponse[0]);
            setIndexCounter(0);
        } else {
            setFilter('all');
        }
    } else {
        // todo: handle server error
    }
}
const fetchStatusRecord = async (setRequests, setCurrentRequest, setIndexCounter, statusFilter, setFilter) => {
    const statusRequestsRequest = await fetch(`http://localhost:8080/api/status-requests/${JSON.stringify(statusFilter)}`, {
        method: 'GET', 
        credentials: 'include',
    });
    if (statusRequestsRequest.ok) {
        const statusRequestsResponse = await statusRequestsRequest.json();
        if (statusRequestsResponse.length > 0) {
            setRequests(statusRequestsResponse);
            setCurrentRequest(statusRequestsResponse[0]);
            setIndexCounter(0);
        } else {
            setFilter('all');
        }
    } else {
        // todo: handle server error
    }
}

const updateRecordStatus = async (record, newStatus, setRequests, setCurrentRequest) => {
    const statusUpdateRequestRequest = await fetch(`http://localhost:8080/api/update-request-status`, {
        method: 'PUT', 
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({...record, newStatus,}),
    });
    if (statusUpdateRequestRequest.ok) {
        const statusUpdateRequestResponse = await statusUpdateRequestRequest.json();
        setRequests(statusUpdateRequestResponse.allRequests);
        setCurrentRequest(statusUpdateRequestResponse.updatedRecord);
    } else {
        // todo: handle server error
    }
}
const checkOwnership =  async (record, setIsOwner) => {
    const payload = {
        creator: record.creator,
    }
    const ownershipRequest = await fetch(`http://localhost:8080/api/check-ownership/${JSON.stringify(payload)}`, {
        method: 'GET',
        credentials: 'include',
    });
    if (ownershipRequest.ok) {
        const ownershipResponse = await ownershipRequest.json();
        if (ownershipResponse) setIsOwner(true);
        else setIsOwner(false);
    } else {
        // todo: handle server error
    }
}

const deleteRecord = async (record, setDeleteIndicator, btn) => {
    const deleteRequest = await fetch(`http://localhost:8080/api/delete-record`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(record),
    });
    if (deleteRequest.ok) {
        const deleteResponse = await deleteRequest.json();
        console.log('hi', deleteResponse)
        if (deleteResponse) {
            setDeleteIndicator((prev) => !prev);
            btnErrorHandler('deleted', 'success', btn)
        } 
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

module.exports = {
    ManageView,
}
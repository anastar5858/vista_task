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
    const disableOtherFilter = () => {
        allFilterRef.current.disabled = true;
        userFilterRef.current.disabled = true;
    }
    const enableOtherFilter = () => {
        allFilterRef.current.disabled = false;
        userFilterRef.current.disabled = false;
    }
    // todo: all = all requests, mine = current logged in user requests status`status` requests based on status
    React.useEffect(() => {
        const fetchAllRecords = async () => {
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
        const fetchMyRecords = async () => {
            const myRequestsRequest = await fetch('http://localhost:8080/api/my-requests', {
                method: 'GET', 
                credentials: 'include',
            });
            if (myRequestsRequest.ok) {
                const myRequestsResponse = await myRequestsRequest.json();
                if (myRequestsResponse?.length > 0) {
                    setRequests(myRequestsResponse);
                    setCurrentRequest(myRequestsResponse[0]);
                    setIndexCounter(0);
                }
                console.log(myRequestsResponse);
            } else {
                // todo: handle server error
            }
        }
        const fetchStatusRecord = async () => {
            const statusRequestsRequest = await fetch(`http://localhost:8080/api/status-requests/${JSON.stringify(statusFilter)}`, {
                method: 'GET', 
                credentials: 'include',
            });
            if (statusRequestsRequest.ok) {
                const statusRequestsResponse = await statusRequestsRequest.json();
                if (statusRequestsResponse?.length > 0) {
                    setRequests(statusRequestsResponse);
                    setCurrentRequest(statusRequestsResponse[0]);
                    setIndexCounter(0);
                }
                console.log(statusRequestsResponse);
            } else {
                // todo: handle server error
            }
        }
        console.log(filter, statusFilter);
        if (filter === 'all') return fetchAllRecords();
        if (filter === 'mine') return fetchMyRecords();
        if (filter === 'status') return fetchStatusRecord();
    }, [filter, statusFilter])
    React.useEffect(() => {
        // setting the current filter
        if (request.length > 0) {
            setCurrentRequest(request[indexCounter]);
        }
        console.log('what', statusFilter, statusFilter.length > 0);
        if (statusFilter.length > 0) disableOtherFilter();
        if (statusFilter.length === 0) enableOtherFilter()
        // check the status filter
    }, [indexCounter, statusFilter])
    // todo: every time current request changes check if the current user is the creator to add the edit and delete functionality
  return (
    <>
    <div className='flex-row'>
    {/* animation mode switchers */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}}>
        <strong>Animation Options:</strong>
        <label onClick={() => setCardMode('default')} className="radio-container label" htmlFor='default'>
            <strong>No Complex Animation</strong>
            <input id='default' type='radio' value='default' name='animation'></input>
            <span className="radio-dot"></span>
        </label>
        <label onClick={() => setCardMode('fly')} className="radio-container label" htmlFor='fly'>
            <strong>Fly Animation</strong>
            <input id='fly' type='radio' value='fly' name='animation'></input>
            <span className="radio-dot"></span>                 
        </label>
        <label onClick={() => setCardMode('rocket')} className="radio-container label" htmlFor='rocket'>
            <strong>Rocket Animation</strong>
            <input id='rocket' type='radio' value='rocket' name='animation'></input>
            <span className="radio-dot"></span> 
        </label>
    </section>
    {/* navigation system */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}}>
        <strong>Navigation:</strong>
        <label className="radio-container label" htmlFor='prev'>
            <strong>Previous</strong>
            <input onClick={() => {
                animationHanlder(cardMode, cardContainerRef, setIndexCounter, 0, indexCounter)
            }}  id='prev' type='radio' value='prev' name='navigation'></input>
            <span className="radio-dot"></span>
        </label>
        <label className="radio-container label" htmlFor='next'>
            <strong>Next</strong>
            <input onClick={() => {
                animationHanlder(cardMode, cardContainerRef, setIndexCounter, request.length - 1, indexCounter)
            }}  id='next' type='radio' value='next' name='navigation'></input>
            <span className="radio-dot"></span>                 
        </label>  
    </section>
    {/* requests filter */}
    <section className='flex-column w-center plain-surface p-1' style={{marginTop: '1rem'}}>
        <strong>Filter:</strong>
        <label className="radio-container label" htmlFor='all'>
            <strong>All</strong>
            <input ref={allFilterRef} onClick={() => setFilter('all')}  id='all' type='radio' value='all' name='filter'></input>
            <span className="radio-dot"></span>
        </label>
        <label className="radio-container label" htmlFor='mine'>
            <strong>My Requests</strong>
            <input ref={userFilterRef} onClick={() => setFilter('mine')}  id='mine' type='radio' value='mine' name='filter'></input>
            <span className="radio-dot"></span>                 
        </label> 
        <details className='flex-column'>
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
            }} type='checkbox' id='prog-check' value='in-progress'></input>
            <label htmlFor='comp-check'>Completed</label>
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
            }} type='checkbox' id='comp-check' value='completed'></input>
        </details>
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
                </>
            )}
        </div>
    </div>
    </>
  ) 
}
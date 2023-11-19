const ManageView = () => {
    const cardContainerRef = React.useRef(null);
    const [request, setRequests] = React.useState([]);
    const [cardMode, setCardMode] = React.useState('default');
    const [indexCounter, setIndexCounter] = React.useState(0);
    const [currentRequest, setCurrentRequest] = React.useState({});
    React.useEffect(() => {
        const fetchAllRecords = async () => {
            const allRequestsRequest = await fetch('http://localhost:8080/api/all-requests', {
                method: 'GET',
                credentials: 'include',
            });
            if (allRequestsRequest.ok) {
                const allRequestsResponse = await allRequestsRequest.json();
                setRequests(allRequestsResponse);
                setCurrentRequest(allRequestsResponse[indexCounter]);
            } else {
                // todo: handle server error
            }
        }
        fetchAllRecords()
    }, [])
    React.useEffect(() => {
        if (request.length > 0) {
            setCurrentRequest(request[indexCounter]);
        }
    }, [indexCounter])
  return (
    <>
    {/* navigation system */}
    <div id='.flex-column'>
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
    </div>
    {/* animation mode switchers */}
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
    {/* the three card view */}
    <div ref={cardContainerRef} id="cardContainer">
        <div id={cardMode === 'default' ? 'ellipse-plain' : cardMode === 'rocket' ? 'ellipse-rocket' : 'ellipse'}>
            {Object.keys(currentRequest).length > 0 && (
                <>
                    <h3 id='request-title'>{currentRequest.title}</h3>
                    <p id='request-desc'><strong>{currentRequest.desc}</strong></p>
                    <em id='request-status'>
                    <label className="radio-container" htmlFor={`${currentRequest.status}`}>
                    <strong>{currentRequest.status}</strong>
                    <input id={`${currentRequest.status}`} type='radio' value={`${currentRequest.status}`} name='status' disabled></input>
                    <span className="radio-dot"></span>
                    </label>
                    </em>
                    <small id='creator-sign'>Created By:<br />{currentRequest.creator}</small>
                    <small id='date-sign'>Created On:<br />{new Date(currentRequest.date).toLocaleDateString()}</small>
                </>
            )}
        </div>
    </div>
    </>
  ) 
}
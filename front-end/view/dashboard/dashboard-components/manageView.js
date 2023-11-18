const ManageView = () => {
    const [request, setRequests] = React.useState([]);
    const [testSample, setTestSample] = React.useState({});
    React.useEffect(() => {
        const fetchAllRecords = async () => {
            const allRequestsRequest = await fetch('http://localhost:8080/api/all-requests', {
                method: 'GET',
                credentials: 'include',
            });
            if (allRequestsRequest.ok) {
                const allRequestsResponse = await allRequestsRequest.json();
                setRequests(allRequestsResponse);
                setTestSample(allRequestsResponse[0]);
            } else {
                // todo: handle server error
            }
        }
        fetchAllRecords()
    }, [])
  return (
    <>
    <h1>Hello World!</h1>
    </>
  ) 
}
const fetchAllDemos = async (setListOfDemo) => {
    // fetch the demos of this page only
    const demosResponse = await fetch(`http://localhost:8080/api/fetch-demos/${encodeURIComponent(document.URL)}`);
    if (demosResponse.ok) {
        const data = await demosResponse.json();
        console.log(data)
        setListOfDemo(data);
    } else {
        // todo: handle server error
    }
}
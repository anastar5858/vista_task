const Footer = () => {
    const [listOfDemos, setListOfDemo] = React.useState([]);
    const [demosVisualiser, setDemosVisualiser] = React.useState(false);
    const [activeDemo, setActiveDemo] = React.useState([]);
    React.useEffect(() => {
        fetchAllDemos(setListOfDemo);
    }, [])
    return (
        <>
            <button onClick={ () => setDemosVisualiser((prev) => !prev)} id={'demooLists'} style={{bottom: '0', position: 'fixed'}}> {!demosVisualiser ? 'Help demos' : 'Hide help demo'}</button>
            {demosVisualiser && (
                        <div id='demosListContainer' style={{ backgroundColor:'lightgray', bottom: '5%', zIndex: 1, display: 'flex', flexDirection: 'column', maxHeight: '50%', position: 'fixed', gap: '1rem' }}>
                            {/* ul holding a  list of all published demos of the application */}
                            <ul style={{fontWeight:'bold'}}>
                                <strong>This is the list of website features demonstrations</strong>
                                {listOfDemos.map((demo) => {
                                    // extract the name
                                    const name = demo.title
                                    return (
                                        <li key={`${name}`}>
                                            <div  id={`${name}`} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                                <span>{name}</span>
                                                <button onClick={(e) => {
                                                    for (const demo of listOfDemos) {
                                                        if (demo.title === e.currentTarget.parentElement.id) {
                                                            e.currentTarget.style.backgroundColor = 'violet';
                                                            setActiveDemo(demo);
                                                        } else {
                                                            const demoCon = [...document.getElementById(demo.title).children]
                                                            console.log(demoCon[1]);
                                                            demoCon[1].style.backgroundColor = 'buttonface';
                                                        }
                                                    }
                                                }}>Prepare this demo</button>
                                            </div>
                                            {/* <ReviewDemo demoSteps={props.demoSteps} /> <FaTrafficLight style={{backgroundColor:equalityIndicator ? 'purple' : 'red'}} /> */}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

            )}
        </>

    )
}
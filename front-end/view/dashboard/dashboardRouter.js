let sharedRouter
const DashboardRouter = () => {
    const [route, SetRoute] = React.useState('create');
    React.useEffect(() => {
        sharedRouter = SetRoute
    }, [])
    return (
        <>
            {route === 'create' && (<CreateForm />)}
            {route === 'manage' && (<ManageView />)}
        </>
    ) 
}
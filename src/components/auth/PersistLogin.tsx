import { useEffect, useState } from "react"
import useRefresh from "../../hooks/useRefresh"
import { Outlet } from "react-router-dom"

function PersistLogin() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const refresh = useRefresh()

    useEffect(() => {
        refresh().finally(() => setLoading(false));
    }, [refresh])

    if (isLoading) return <h1>Loading...</h1>
    return <Outlet />
}

export default PersistLogin
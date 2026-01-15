
function useRefreshToken() {
    const refresh = async () => {
        const response = await fetch('127.0.0.1:8000/api/auth/login/', {
            headers: new Headers({'content-type': 'application/json'}),
            mode: 'cors'
        })
        console.log(response)
    }

    return refresh
}

export default useRefreshToken
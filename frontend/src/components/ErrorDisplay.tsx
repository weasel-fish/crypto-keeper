type ErrorDisplayProps = {
    error: string
}


// ErrorDisplay ...... displays errors!
function ErrorDisplay({error}: ErrorDisplayProps) {
    return (
        <>
            <p>{error}</p>
        </>
    )
}

export default ErrorDisplay
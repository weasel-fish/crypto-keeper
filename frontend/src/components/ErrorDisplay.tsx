type ErrorDisplayProps = {
    error: string
}

function ErrorDisplay({error}: ErrorDisplayProps) {
    return (
        <>
            <p>{error}</p>
        </>
    )
}

export default ErrorDisplay
const Student = (student) => {
    const { name, id, dispatch, isHere } = student

    return (
        <div>
            <span
                style={{
                    textDecoration: isHere ? 'line-through' : 'none',
                    color: isHere ? 'gray' : 'black'
                }}
                onClick={() => dispatch({
                    type: 'mark',
                    payload: { id }
                })}>
                    {name}
                </span>
            <button onClick={() => dispatch({
                type: 'delete',
                payload: { id }
            })}>
                삭제
            </button>
        </div>
    )
}

export default Student

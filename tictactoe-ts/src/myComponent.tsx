import React, { useState, Component } from 'react';

type Props = {
    str: string
}

export const MyComponent = (props: Props): React.ReactElement<Props> => {
    const [count, setCounter] = useState<number>(0);
    const [something, setSomething] = useState<string>('oops');

    return (
        <>
            <div>
                {props.str}
                {count}
            </div>
            <button onClick={() => { setCounter(count + 1) }}>Click Me</button>
        </>
    )
}

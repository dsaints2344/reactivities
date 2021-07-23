import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any
}

const ValidationErrors: React.FC<Props> = (props) => {
    return(
        <Message error>
            {props.errors && (
                <Message.List>
                    {props.errors.map((err: any, i: any) => (
                        <Message.Item key={i}>
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationErrors;
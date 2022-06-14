import React from 'react'

interface IErrorMessageProps {
  errorMessage: string;
}

export const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({ errorMessage }) => (
    <div>
        {errorMessage}
    </div>
)

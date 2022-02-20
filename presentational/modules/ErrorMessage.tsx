import React from 'react'

interface IErrorMessageProps {
  errorMessage: string;
}

export const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({ errorMessage }) => {    
  return (
    <div>
        {errorMessage}
    </div>
)}

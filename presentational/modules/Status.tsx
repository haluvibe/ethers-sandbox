import React from 'react'

interface IStatusProps {
  status: string;
}

export const Status: React.FunctionComponent<IStatusProps> = ({ status }) => {    
  return (
    <div>
        {status}...
    </div>
)}

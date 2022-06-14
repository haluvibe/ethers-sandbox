
interface IEnterPinViewProps {
    value: string,
    updateValue: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const EnterPinView: React.FunctionComponent<IEnterPinViewProps> = ({
    updateValue,
    value
}) => (
    <>
        <h1>Enter Pin:</h1>
        <label>Pin:</label>
        <input type="number" step="1" value={value} onChange={updateValue} />
    </>
)

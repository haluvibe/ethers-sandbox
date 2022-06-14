interface IUserProfileViewProps {
    username: string,
    updateUserName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const UserProfileView: React.FunctionComponent<IUserProfileViewProps> = ({
    username,
    updateUserName
}) => (
    <div className="GunDocs">
        <h1>User Profile:</h1>
        <label>Username:</label>
        <input value={username} onChange={updateUserName} />
    </div>
);


import { ErrorMessage } from "../presentational/modules/ErrorMessage";
import { UserProfileView } from "../presentational/modules/UserProfile.View";
import { useUserProfile } from "./useUserProfile";

export const UserProfile: React.FunctionComponent = () => {

    const {
        userErrorMessage = null,
        publicKey = null,
        pin = null,
        ...rest
    } = useUserProfile()
    
    if (userErrorMessage) {
        return <ErrorMessage errorMessage={userErrorMessage} />;
    }

    if (!publicKey || !pin) {
        return null;
    }

    return (
        <UserProfileView {...rest} />
    );
};

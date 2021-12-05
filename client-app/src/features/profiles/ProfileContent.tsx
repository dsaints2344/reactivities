import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
    profile: Profile;
}
const ProfileContent: React.FC<Props> = ({ profile }) => {
    const { profileStore } = useStore();

    const panes = [
        { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
        { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: "Events", render: () => <ProfileActivities/>},
        { menuItem: "Followers", render: () => <ProfileFollowings /> },
        { menuItem: "Following", render: () => <ProfileFollowings /> },
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="right"
            panes={panes}
            onTabChange={(e, data) =>
                profileStore.setActiveTab(Number(data.activeIndex))
            }
        />
    );
};

export default observer(ProfileContent);

import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
    Card,
    Header,
    Tab,
    Image,
    Grid,
    Button,
    GridColumn,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

const ProfilePhotos: React.FC<Props> = ({ profile }) => {
    const [addPhoneMode, setAddPhotoMode] = useState<boolean>(false);
    const {
        profileStore: { isCurrentUser },
    } = useStore();
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="image" content="Photos" />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhoneMode ? "Cancel" : "Add Poto"}
                            onClick={() => setAddPhotoMode(!addPhoneMode)}
                        />
                    )}
                </Grid.Column>
                <GridColumn width={16}>
                    {addPhoneMode ? (
                        <PhotoUploadWidget/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </GridColumn>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfilePhotos);

import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
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
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

const ProfilePhotos: React.FC<Props> = ({ profile }) => {
    const [addPhotoMode, setAddPhotoMode] = useState<boolean>(false);
    const {
        profileStore: {
            isCurrentUser,
            uploadPhoto,
            uploading,
            loading,
            setMainPhoto,
            deletePhoto,
        },
    } = useStore();
    const [target, setTarget] = useState("");

    const handleSetMainPhoto = (
        photo: Photo,
        e: SyntheticEvent<HTMLButtonElement>
    ) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    };

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    };

    const handleDeletePhoto = (
        photo: Photo,
        e: SyntheticEvent<HTMLButtonElement>
    ) => {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    };
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="image" content="Photos" />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? "Cancel" : "Add Poto"}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget
                            uploadPhoto={handlePhotoUpload}
                            loading={uploading}
                        />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color="green"
                                                content="Main"
                                                name={'main' + photo.id}
                                                loading={target === 'main' + photo.id && loading}
                                                disabled={photo.isMain}
                                                onClick={(e) => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                basic
                                                color="red"
                                                icon="trash"
                                                loading={target === photo.id && loading}
                                                onClick={(e) => handleDeletePhoto(photo, e)}
                                                disabled={photo.isMain}
                                                name={photo.id}
                                            />
                                        </Button.Group>
                                    )}
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

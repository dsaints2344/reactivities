import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

const ActivityDashboard: React.FC<Props> = (props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    activities={props.activities}
                    selectActivity={props.selectActivity}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {props.selectedActivity &&  !props.editMode &&(
                    <ActivityDetails
                        activity={props.selectedActivity}
                        cancelSelectActivity={props.cancelSelectActivity}
                        openForm={props.openForm}
                    />
                )}
                {props.editMode && <ActivityForm  closeForm={props.closeForm} activity={props.selectedActivity}/>} 
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;

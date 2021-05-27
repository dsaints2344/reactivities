import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityItemList from "./ActivityListItem";


const ActivityList = () => {
    const { activityStore } = useStore();
    const { activitiesByDate } = activityStore;


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((activity) => (
                    <ActivityItemList key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);

import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Item, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityItemList from "./ActivityListItem";


const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupActivities } = activityStore;


    return (
        <>
            {groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map((activity) => (
                                <ActivityItemList key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>

    );
};

export default observer(ActivityList);

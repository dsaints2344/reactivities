import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Segment, Button, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MytextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {ActivityFormValues } from "../../../app/models/activity";

const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loadActivity,
        loadingInitial,
    } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("the activity title is required"),
        description: Yup.string().required("the activity description is required"),
        category: Yup.string().required(),
        date: Yup.string().required("Date is required").nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)));
        }
    }, [id, loadActivity]);

    const handleFormSubmit = (activity: ActivityFormValues) => {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
        } else {
            updateActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`)
            );
        }
    };

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

    return (
        <Segment clearing>
            <Header color="teal" content="Activity Details" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={(values) => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeholder="Title" />
                        <MytextArea rows={3} placeholder="Description" name="description" />
                        <MySelectInput
                            options={categoryOptions}
                            placeholder="Category"
                            name="category"
                        />
                        <MyDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <Header color="teal" content="Location Details" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                        />
                        <Button
                            as={Link}
                            to="/activities"
                            floated="right"
                            type="button"
                            content="Cancel"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
};

export default observer(ActivityForm);

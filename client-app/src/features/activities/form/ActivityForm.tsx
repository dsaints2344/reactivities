import React, { useState } from 'react'
import {Form, Segment, Button} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

interface Props {
    createOrEdit: (activity: Activity) => void
    submitting: boolean;

}

const ActivityForm: React.FC<Props> = (props) => {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)
    const handleSubmit = () => {
        props.createOrEdit(activity)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title'  value={activity.title} name="title" onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description'  value={activity.description} name="description" onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name="category" onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name="date" onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name="city" onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handleInputChange}/>
                <Button loading={props.submitting} floated="right" positive type="submit" content="Submit"/>
                <Button onClick={closeForm} floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
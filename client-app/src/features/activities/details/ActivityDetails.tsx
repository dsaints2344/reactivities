import React from 'react'
import {Button, Card, Icon, Image} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity
}

const ActivityDetails: React.FC<Props> = (props) => {
    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${props.activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{props.activity.title}</Card.Header>
                <Card.Meta>
                    <span>{props.activity.date}</span>
                </Card.Meta>
                <Card.Description>{props.activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic color="blue" content="Edit"/>
                    <Button basic color="grey" content="Cancel"/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails
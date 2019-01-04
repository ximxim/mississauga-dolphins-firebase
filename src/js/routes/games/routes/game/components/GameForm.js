import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Input,
    Label,
    FormText,
    FormFeedback,
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FirebaseImageUploader, DateTimePicker } from '../../../../../components/ui';
import { imageAspects } from '../../../../../utils/imageAspects';

import { EventsType } from '../../../../../redux/modules/Events/types';

type Props = {
    game: EventsType,
    editEvent: (EventsType) => void,
};

export default class GameForm extends Component<Props, *> {
    render() {
        const { game, editEvent } = this.props;
        if (!game) return null;
        return (
            <Formik
                initialValues={game}
                onSubmit={(values, { setSubmitting }) => {
                    editEvent({ values, callback: () => setSubmitting(false) });
                }}
                validationSchema={Yup.object().shape({
                    cover: Yup.object().shape({
                        source: Yup.string().required('Required'),
                    }),
                    title: Yup.string().required('Required'),
                    start_time: Yup.string().required('Required'),
                    description: Yup.string().required('Required'),
                    place: Yup.object().shape({
                        name: Yup.string().required('Required'),
                    }),
                })}
            >
                {props => this.renderForm(props)}
            </Formik>
        );
    }

    renderForm = props => (
        <Form id="game-form" onSubmit={props.handleSubmit}>
            {this.renderImageUpload(props)}
            {this.renderTitleField(props)}
            {this.renderStartTime(props)}
            {this.renderPlaceField(props)}
            {this.renderDivisionField(props)}
            {this.renderDescriptionField(props)}
            {this.renderMatchNoField(props)}
            {this.renderRoundTypeField(props)}
        </Form>
    );

    renderTitleField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="title">Title</Label>
            <Input
                type="text"
                value={props.values.title}
                name="title"
                id="title"
                className="has-input input-sm"
                placeholder="Home vs Visitor team"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                invalid={props.errors.title && props.touched.title}
            />
            <FormFeedback>{props.errors.title}</FormFeedback>
            <FormText>Example: Mississauga Dolphins vs. Ghaznavi</FormText>
        </FormGroup>
    );

    renderImageUpload = (props) => {
        const { game } = this.props;
        const cover = props.values.cover.source;
        const cta = cover ? 'Change Cover Photo' : 'Upload a Cover Photo';
        return (
            <FirebaseImageUploader
                filename={game.id}
                cta={cta}
                reference="events"
                aspect={imageAspects.small}
                preview={cover}
                name="cover"
                onChange={props.setFieldValue}
            />
        );
    }

    renderStartTime = props => (
        <DateTimePicker
            defaultValue={props.values.start_time}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
        />
    );

    renderPlaceField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="place">Place</Label>
            <Input
                type="text"
                value={props.values.place.name}
                name="place.name"
                id="place"
                className="has-input input-sm"
                placeholder="Enter Place"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                invalid={props.errors.place && props.touched.place}
            />
            <FormFeedback>{props.errors.place && props.errors.place.name}</FormFeedback>
            <FormText>Enter name of the place where this game will be played</FormText>
        </FormGroup>
    );

    renderDivisionField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="division">Division</Label>
            <Input
                type="text"
                value={props.values.division}
                name="division"
                id="division"
                className="has-input input-sm"
                placeholder="Enter Division"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
            />
            <FormText>Example: 1st Division - CN Pro</FormText>
        </FormGroup>
    );

    renderDescriptionField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="description">Description</Label>
            <Input
                type="textarea"
                rows="5"
                value={props.values.description}
                name="description"
                id="description"
                className="has-input input-sm"
                placeholder="Enter Description"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                invalid={props.errors.description && props.touched.description}
            />
            <FormFeedback>{props.errors.description}</FormFeedback>
            <FormText>Example: additional information that users will see</FormText>
        </FormGroup>
    );

    renderMatchNoField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="matchno">Match No.</Label>
            <Input
                type="text"
                value={props.values.match_no}
                name="match_no"
                id="matchno"
                className="has-input input-sm"
                placeholder="Enter Match Number"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
            />
            <FormText>Example: 452</FormText>
        </FormGroup>
    );

    renderRoundTypeField = props => (
        <FormGroup className="has-wrapper my-1">
            <Label for="roundtype">Round Type</Label>
            <Input
                type="text"
                value={props.values.round_type}
                name="round_type"
                id="roundtype"
                className="has-input input-sm"
                placeholder="Enter Round Type"
                onChange={props.handleChange}
                onBlur={props.onBlur}
            />
            <FormText>Example: Preliminary</FormText>
        </FormGroup>
    );
}

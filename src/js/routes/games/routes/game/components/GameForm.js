import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
    FirebaseImageUploader,
    DateTimePicker,
    TextInput,
    TextArea,
} from '../../../../../components/ui';
import { imageAspects } from '../../../../../utils/imageAspects';

import { EventsType } from '../../../../../redux/modules/Events/types';

type Props = {
    game: EventsType,
    editEvent: (event: EventsType) => void,
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
        <TextInput
            label="Title"
            value={props.values.title}
            name="title"
            placeholder="Home vs Visitor team"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.title}
            touched={props.touched.title}
            helpText="Example: Mississauga Dolphins vs. Ghaznavi"
        />
    );

    renderImageUpload = (props) => {
        const { game } = this.props;
        const cover = props.values.cover.thumbnail || props.values.cover.source;
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
        <TextInput
            label="Place"
            value={props.values.place.name}
            name="place.name"
            placeholder="Enter Place"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.place && props.errors.place.name}
            touched={props.touched.place}
            helpText="Enter name of the place where this game will be played"
        />
    );

    renderDivisionField = props => (
        <TextInput
            label="Division"
            value={props.values.division}
            name="division"
            placeholder="Enter Division"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.division}
            helpText="Example: 1st Division - CN Pro"
        />
    );

    renderDescriptionField = props => (
        <TextArea
            label="Description"
            value={props.values.description}
            name="description"
            placeholder="Enter Description"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.description}
            helpText="Example: additional information that users will see"
        />
    );

    renderMatchNoField = props => (
        <TextInput
            label="Match No."
            value={props.values.match_no}
            name="match_no"
            placeholder="Enter Match Number"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.match_no}
            helpText="Example: 452"
        />
    );

    renderRoundTypeField = props => (
        <TextInput
            label="Round Type"
            value={props.values.round_type}
            name="round_type"
            placeholder="Enter Round Type"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.round_type}
            helpText="Example: Preliminary"
        />
    );
}

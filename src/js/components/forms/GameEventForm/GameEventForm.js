import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import {
    FirebaseImageUploader,
    DateTimePicker,
    TextInput,
    TextArea,
} from '../../ui';
import { imageAspects } from '../../../utils/imageAspects';
import { EventsType } from '../../../redux/modules/Events/types';
import ENV from '../../../../env';

type Props = {
    game?: EventsType,
    action: () => void,
};

export default class GameForm extends Component<Props, *> {
    static defaultProps ={
        game: ENV.newGameEvent,
    };

    render() {
        const { game, action } = this.props;
        return (
            <Formik
                initialValues={game}
                onSubmit={async (values, { setSubmitting }) => {
                    const newEventId = `${values.match_no}x${moment().format('MMMM[-]Do[-]YYYY')}`;
                    const source = typeof values.cover.source === 'string'
                        ? values.cover.source
                        : await values.cover.source(values.id);
                    const thumbnail = typeof values.cover.thumbnail === 'string'
                        ? values.cover.thumbnail
                        : await values.cover.thumbnail(values.id);

                    action({
                        values: {
                            ...values,
                            id: values.id || newEventId,
                            cover: {
                                source,
                                thumbnail,
                            },
                        },
                        callback: () => setSubmitting(false),
                    });
                }}
                validationSchema={Yup.object().shape({
                    cover: Yup.object().shape({
                        source: Yup.string().required('Required'),
                    }),
                    title: Yup.string().required('Required'),
                    match_no: Yup.string().required('Required'),
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
                error={(props.errors.cover) ? props.errors.cover.source : null}
                onChange={val => props.setFieldValue('cover', val, true)}
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
            error={(props.errors.place) ? props.errors.place.name : null}
            touched={(props.touched.place) ? props.touched.place.name : null}
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
            error={props.errors.description}
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
            error={props.errors.match_no}
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

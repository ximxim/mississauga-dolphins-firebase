import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
    TextInput,
    FirebaseImageUploader,
} from '../../ui';
import { imageAspects } from '../../../utils/imageAspects';
import ENV from '../../../../env';

import { Player } from '../../../redux/modules/Players/types';

type Props = {
    player?: Player,
    action: () => void;
};

export default class PlayerForm extends Component<Props, *> {
    static defaultProps = {
        player: ENV.newPlayer,
    }

    render() {
        const { player, action } = this.props;
        return (
            <Formik
                initialValues={player}
                onSubmit={async (values, { setSubmitting }) => {
                    const source = typeof values.avatar.source === 'string'
                        ? values.avatar.source
                        : await values.avatar.source(values.id);
                    const thumbnail = typeof values.avatar.thumbnail === 'string'
                        ? values.avatar.thumbnail
                        : await values.avatar.thumbnail(values.id);
                    action({
                        values: {
                            ...values,
                            avatar: {
                                source,
                                thumbnail,
                            },
                        },
                        callback: () => setSubmitting(false),
                    });
                }}
                validationSchema={Yup.object().shape({
                    FIRST_NAME: Yup.string().required('Required'),
                    LAST_NAME: Yup.string().required('Required'),
                })}
            >
                {props => this.renderForm(props)}
            </Formik>
        );
    }

    renderForm = props => (
        <Form id="player-form" onSubmit={props.handleSubmit}>
            {this.renderImageUpload(props)}
            {this.renderFirstNameField(props)}
            {this.renderLastNameField(props)}
            {this.renderRoleField(props)}
            {this.renderBattingStyleField(props)}
            {this.renderBowlingStyleField(props)}
            {this.renderDateJoinedField(props)}
        </Form>
    );

    renderImageUpload = (props) => {
        const avatar = props.values.avatar
        && (props.values.avatar.thumbnail || props.values.avatar.source);
        const cta = avatar ? 'Change Avatar Photo' : 'Upload a Avatar Photo';
        return (
            <FirebaseImageUploader
                cta={cta}
                reference="players"
                aspect={imageAspects.small}
                preview={avatar}
                name="avatar"
                onChange={val => props.setFieldValue('avatar', val, true)}
            />
        );
    }

    renderFirstNameField = props => (
        <TextInput
            value={props.values.FIRST_NAME}
            label="First Name"
            name="FIRST_NAME"
            placeholder="Enter First Name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.FIRST_NAME}
            error={props.errors.FIRST_NAME}
            helpText="Example: John"
        />
    );

    renderLastNameField = props => (
        <TextInput
            value={props.values.LAST_NAME}
            label="Last Name"
            name="LAST_NAME"
            placeholder="Enter Last Name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.LAST_NAME}
            error={props.errors.LAST_NAME}
            helpText="Example: Smith"
        />
    );

    renderRoleField = props => (
        <TextInput
            value={props.values.ROLE}
            label="Role"
            name="ROLE"
            placeholder="Enter Role"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.ROLE}
            helpText="Example: Bowler"
        />
    );

    renderBattingStyleField = props => (
        <TextInput
            value={props.values.BATING_STYLE}
            label="Bating Style"
            name="BATING_STYLE"
            placeholder="Enter Bating Style"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.BATING_STYLE}
            helpText="Example: Right Handed"
        />
    );

    renderBowlingStyleField = props => (
        <TextInput
            value={props.values.BOWLING_STYLE}
            label="Bowling Style"
            name="BOWLING_STYLE"
            placeholder="Enter Bowling Style"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.BOWLING_STYLE}
            helpText="Example: Medium Fast"
        />
    );

    renderDateJoinedField = props => (
        <TextInput
            value={props.values.DATE_JOINED}
            label="Date Joined"
            name="DATE_JOINED"
            placeholder="Enter Date Joined"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.DATE_JOINED}
            helpText="Example: 2017"
        />
    );
}

import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '../../ui';
import { Information } from '../../../redux/modules/ClubInformation/types';

type Props = {
    information: Information,
    action: () => void;
};

export default class PlayerForm extends Component<Props, *> {
    render() {
        const { information, action } = this.props;
        return (
            <Formik
                initialValues={information}
                onSubmit={async (values, { setSubmitting }) => {
                    action({
                        values,
                        callback: () => setSubmitting(false),
                    });
                }}
                validationSchema={Yup.object().shape({
                    EMAIL: Yup.string().email(),
                    FACEBOOK: Yup.string().url(),
                    INSTAGRAM: Yup.string().url(),
                    NAME: Yup.string(),
                    PHONE: Yup.string(),
                    TWITTER: Yup.string().url(),
                    WEBSITE: Yup.string().url(),
                    YOUTUBE: Yup.string().url(),
                })}
            >
                {props => this.renderForm(props)}
            </Formik>
        );
    }

    renderForm = props => (
        <Form id="club-information" onSubmit={props.handleSubmit}>
            {this.renderNameField(props)}
            {this.renderEmailField(props)}
            {this.renderPhoneField(props)}
            {this.renderWebsiteField(props)}
            {this.renderFacebookField(props)}
            {this.renderInstagramField(props)}
            {this.renderTwitterField(props)}
            {this.renderYoutubeField(props)}
        </Form>
    );

    renderNameField = props => (
        <TextInput
            value={props.values.NAME}
            label="Name"
            name="NAME"
            placeholder="Enter Club Name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.NAME}
            touched={props.touched.NAME}
        />
    );

    renderEmailField = props => (
        <TextInput
            value={props.values.EMAIL}
            label="Email"
            name="EMAIL"
            placeholder="Enter Club Email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.EMAIL}
            touched={props.touched.EMAIL}
        />
    );

    renderPhoneField = props => (
        <TextInput
            value={props.values.PHONE}
            label="Phone"
            name="PHONE"
            placeholder="Enter Club Phone"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.PHONE}
            touched={props.touched.PHONE}
        />
    );

    renderWebsiteField = props => (
        <TextInput
            value={props.values.WEBSITE}
            label="Website"
            name="WEBSITE"
            placeholder="Enter Club Website"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.WEBSITE}
            touched={props.touched.WEBSITE}
        />
    );

    renderFacebookField = props => (
        <TextInput
            value={props.values.FACEBOOK}
            label="Facebook"
            name="FACEBOOK"
            placeholder="Enter Club Facebook Page"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.FACEBOOK}
            touched={props.touched.FACEBOOK}
        />
    );

    renderInstagramField = props => (
        <TextInput
            value={props.values.INSTAGRAM}
            label="Instagram"
            name="INSTAGRAM"
            placeholder="Enter Club Instagram Page"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.INSTAGRAM}
            touched={props.touched.INSTAGRAM}
        />
    );

    renderTwitterField = props => (
        <TextInput
            value={props.values.TWITTER}
            label="Twitter"
            name="TWITTER"
            placeholder="Enter Club Twitter Page"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.TWITTER}
            touched={props.touched.TWITTER}
        />
    );

    renderYoutubeField = props => (
        <TextInput
            value={props.values.YOUTUBE}
            label="Youtube"
            name="YOUTUBE"
            placeholder="Enter Club Twitter Page"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.TWITTER}
            touched={props.touched.TWITTER}
        />
    );
}

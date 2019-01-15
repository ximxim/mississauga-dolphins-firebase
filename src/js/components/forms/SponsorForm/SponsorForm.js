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

import { Sponsor } from '../../../redux/modules/Sponsors/types';

type Props = {
    sponsor?: Sponsor,
    action: () => void;
};

export default class PlayerForm extends Component<Props, *> {
    static defaultProps = {
        sponsor: ENV.newSponsor,
    }

    render() {
        const { sponsor, action } = this.props;
        return (
            <Formik
                initialValues={sponsor}
                onSubmit={async (values, { setSubmitting }) => {
                    const source = typeof values.IMAGE === 'string'
                        ? values.IMAGE
                        : await values.IMAGE.source(values.ID);
                    action({
                        values: {
                            ...values,
                            IMAGE: source,
                        },
                        callback: () => setSubmitting(false),
                    });
                }}
                validationSchema={Yup.object().shape({
                    NAME: Yup.string().required('Required'),
                    TAG_LINE: Yup.string().required('Required'),
                    IMAGE: Yup.string().required('Required'),
                    WEBSITE: Yup.string().url().required('Required'),
                })}
            >
                {props => this.renderForm(props)}
            </Formik>
        );
    }

    renderForm = props => (
        <Form id="sponsor-form" onSubmit={props.handleSubmit}>
            {this.renderImageUpload(props)}
            {this.renderNameField(props)}
            {this.renderTaglineField(props)}
            {this.renderWebsiteField(props)}
        </Form>
    );

    renderImageUpload = (props) => {
        const image = props.values.IMAGE;
        const cta = image ? 'Change Sponsor Photo' : 'Upload a Sponsor Photo';
        return (
            <FirebaseImageUploader
                cta={cta}
                reference="sponsors"
                aspect={imageAspects.medium}
                preview={image}
                name="IMAGE"
                error={props.errors.IMAGE}
                onChange={val => props.setFieldValue('IMAGE', val, true)}
            />
        );
    }

    renderNameField = props => (
        <TextInput
            value={props.values.NAME}
            label="Name"
            name="NAME"
            placeholder="Enter Sponsor Name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.NAME}
            error={props.errors.NAME}
            helpText="Example: Google Inc."
        />
    );

    renderTaglineField = props => (
        <TextInput
            value={props.values.TAG_LINE}
            label="Tag line"
            name="TAG_LINE"
            placeholder="Enter Tag Name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.TAG_LINE}
            error={props.errors.TAG_LINE}
            helpText="Example: This company is great for doing what they do"
        />
    );

    renderWebsiteField = props => (
        <TextInput
            value={props.values.WEBSITE}
            label="Website"
            name="WEBSITE"
            placeholder="Enter Website"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.WEBSITE}
            error={props.errors.WEBSITE}
            helpText="Example: https://google.com"
        />
    );
}

import React, { Component } from 'react';
import {
    FormGroup, Label, Input, FormFeedback, FormText,
} from 'reactstrap';

type Props = {
    value: string,
    error?: string,
    touched: boolean,
    label: string,
    name: string,
    placeholder: string,
    helpText?: string,
    rows?: string,
    onChange: () => void,
    onBlur: () => void,
};

export default class TextArea extends Component<Props, *> {
    static defaultProps = {
        error: null,
        helpText: null,
        rows: 5,
    };

    render() {
        const {
            value,
            error,
            touched,
            label,
            name,
            placeholder,
            helpText,
            rows,
            onChange,
            onBlur,
        } = this.props;
        return (
            <FormGroup className="has-wrapper my-1">
                <Label for={name}>{label}</Label>
                <Input
                    type="textarea"
                    value={value}
                    name={name}
                    id={name}
                    className="has-input input-sm"
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    invalid={error && touched}
                    rows={rows}
                />
                {this.renderFormFeedback(error)}
                {this.renderFormText(helpText)}
            </FormGroup>
        );
    }

    renderFormFeedback = error => error && <FormFeedback>{error}</FormFeedback>

    renderFormText = helpText => helpText && <FormText>{helpText}</FormText>
}

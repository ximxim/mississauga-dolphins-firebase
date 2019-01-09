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
    onChange: () => void,
    onBlur: () => void,
};

export default class TextInput extends Component<Props, *> {
    static defaultProps = {
        error: null,
        helpText: null,
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
            onChange,
            onBlur,
        } = this.props;
        return (
            <FormGroup className="has-wrapper my-1">
                <Label for={name}>{label}</Label>
                <Input
                    type="text"
                    value={value}
                    name={name}
                    id={name}
                    className="has-input input-sm"
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    invalid={!!error}
                />
                {this.renderFormFeedback(error)}
                {this.renderFormText(helpText)}
            </FormGroup>
        );
    }

    renderFormFeedback = error => error && <FormFeedback>{error}</FormFeedback>

    renderFormText = helpText => helpText && <FormText>{helpText}</FormText>
}

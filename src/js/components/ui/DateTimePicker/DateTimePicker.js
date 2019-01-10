import React, { Component } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';
import {
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

type Props ={
    defaultValue?: string,
    onChange?: () => void,
};

type State = {
    value: string,
};

// USE TO new Date(obj.START_TIME).toISOString()

export default class DateTimePicker extends Component<Props, State> {
    static defaultProps = {
        defaultValue: moment().format('LLLL'),
        onChange: () => {},
    }

    state = {
        value: moment(),
    }

    componentDidMount() {
        this.setState({ value: this.props.defaultValue });
    }

    render() {
        const { defaultValue } = this.props;
        const { value } = this.state;
        return (
            <DateTime
                value={value}
                defaultValue={defaultValue}
                onChange={this.onChange}
                renderInput={this.renderInput}
                disableCloseOnClickOutside={false}
            />
        );
    }

    onChange = (val) => {
        const value = val.format('LLL');
        this.setState({ value: val });
        this.props.onChange(value);
    }

    renderInput = (props, openCalendar) => (
        <FormGroup className="has-wrapper my-1">
            <Label for="datetime">Datetime</Label>
            <Input
                type="text"
                value={moment(this.state.value).format('LLLL')}
                name="datetime"
                id="datetime"
                className="has-input input-sm"
                placeholder="Enter Datetime"
                readOnly
                onFocus={openCalendar}
            />
        </FormGroup>
    )
}

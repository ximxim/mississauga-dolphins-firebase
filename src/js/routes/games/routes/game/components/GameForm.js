import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

import { FirebaseImageUploader, DateTimePicker } from '../../../../../components/ui';
import { imageAspects } from '../../../../../utils/imageAspects';

import { EventsType } from '../../../../../redux/modules/Events/types';

type Props = {
    game: EventsType,
};

type State = {
    value: EventsType,
};

export default class GameForm extends Component<Props, State> {
    state = {
        value: null,
    };

    componentDidMount() {
        const { game } = this.props;
        if (game) this.setState({ value: game });
    }

    render() {
        if (!this.state.value) return null;
        return (
            <Form>
                {this.renderImageUpload()}
                {this.renderTitleField()}
                {this.renderStartTime()}
                {this.renderDivisionField()}
                {this.renderDescriptionField()}
                {this.renderPlaceField()}
                {this.renderMatchNoField()}
                {this.renderRoundTypeField()}
            </Form>
        );
    }

    renderTitleField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="title">Title</Label>
            <Input
                type="text"
                value={this.state.value.title}
                name="title"
                id="title"
                className="has-input input-sm"
                placeholder="Home vs Visitor team"
                onChange={(event) => {
                    const title = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            title,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderImageUpload = () => {
        const { game } = this.props;
        return (
            <FirebaseImageUploader
                filename={game.id}
                cta="Upload a Cover Photo"
                reference="events"
                aspect={imageAspects.small}
                onChange={val => this.setState(state => (
                    {
                        value: {
                            ...state.value,
                            cover: val,
                        },
                    }
                ))}
            />
        );
    }

    renderStartTime = () => (
        <DateTimePicker
            defaultValue={this.state.value.start_time}
            onChange={val => this.setState(state => (
                {
                    value: {
                        ...state.value,
                        start_time: val,
                    },
                }
            ))}
        />
    );

    renderPlaceField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="place">Place</Label>
            <Input
                type="text"
                value={this.state.value.place.name}
                name="place"
                id="place"
                className="has-input input-sm"
                placeholder="Enter Place"
                onChange={(event) => {
                    const name = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            place: {
                                ...state.place,
                                name,
                            },
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderDivisionField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="division">Division</Label>
            <Input
                type="text"
                value={this.state.value.division}
                name="division"
                id="division"
                className="has-input input-sm"
                placeholder="Enter Division"
                onChange={(event) => {
                    const division = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            division,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderDescriptionField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="description">Description</Label>
            <Input
                type="textarea"
                rows="5"
                value={this.state.value.description}
                name="description"
                id="description"
                className="has-input input-sm"
                placeholder="Enter Description"
                onChange={(event) => {
                    const description = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            description,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderMatchNoField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="matchno">Match No.</Label>
            <Input
                type="text"
                value={this.state.value.match_no}
                name="matchno"
                id="matchno"
                className="has-input input-sm"
                placeholder="Enter Match Number"
                onChange={(event) => {
                    const match_no = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            match_no,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    renderRoundTypeField = () => (
        <FormGroup className="has-wrapper my-1">
            <Label for="roundtype">Round Type</Label>
            <Input
                type="text"
                value={this.state.value.round_type}
                name="roundtype"
                id="roundtype"
                className="has-input input-sm"
                placeholder="Enter Round Type"
                onChange={(event) => {
                    const round_type = event.target.value;
                    this.setState(state => ({
                        value: {
                            ...state.value,
                            round_type,
                        },
                    }));
                }}
            />
        </FormGroup>
    );

    getUpdatedGame = () => this.state.value;
}

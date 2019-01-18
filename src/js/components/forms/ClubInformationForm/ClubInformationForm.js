import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '../../ui';
import { Player } from '../../../redux/modules/Players/types';

type Props = {
    player: Player,
    action: () => void;
};

export default class PlayerForm extends Component<Props, *> {
    render() {
        const { player, action } = this.props;
        return (
            <Formik
                initialValues={player}
                onSubmit={async (values, { setSubmitting }) => {
                    action({
                        values,
                        callback: () => setSubmitting(false),
                    });
                }}
                validationSchema={Yup.object().shape({
                    GENERAL: Yup.object().shape({
                        MTCHS: Yup.number().integer('Please provide a number'),
                    }),
                    BOWLING: Yup.object().shape({
                        WKTS: Yup.number().integer('Please provide a number'),
                        OVERS: Yup.number().integer('Please provide a number'),
                        MDNS: Yup.number().integer('Please provide a number'),
                    }),
                    BATTING: Yup.object().shape({
                        RUNS: Yup.number().integer('Please provide a number'),
                        NO: Yup.number().integer('Please provide a number'),
                        INNINGS: Yup.number().integer('Please provide a number'),
                        HIGHEST: Yup.number().integer('Please provide a number'),
                        AVG: Yup.number().integer('Please provide a number'),
                        '6s': Yup.number().integer('Please provide a number'),
                        '50s': Yup.number().integer('Please provide a number'),
                        '4s': Yup.number().integer('Please provide a number'),
                        '100s': Yup.number().integer('Please provide a number'),
                    }),
                })}
            >
                {props => this.renderForm(props)}
            </Formik>
        );
    }

    renderForm = props => (
        <Form id="player-statistics-form" onSubmit={props.handleSubmit}>
            {this.renderMatchesField(props)}
            {this.renderOversField(props)}
            {this.renderWicketsField(props)}
            {this.renderMaidenField(props)}
            {this.renderRunsField(props)}
            {this.renderNoField(props)}
            {this.renderInningsField(props)}
            {this.renderHighestField(props)}
            {this.renderAverageField(props)}
            {this.render6sField(props)}
            {this.render50sField(props)}
            {this.render4sField(props)}
            {this.render100sField(props)}
        </Form>
    );

    renderMatchesField = props => (
        <TextInput
            value={props.values.GENERAL.MTCHS}
            label="Matches"
            name="GENERAL.MTCHS"
            placeholder="Enter Total Matches"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.GENERAL ? props.errors.GENERAL.MTCHS : false}
            touched={props.touched.GENERAL ? props.touched.GENERAL.MTCHS : false}
        />
    );

    renderOversField = props => (
        <TextInput
            value={props.values.BOWLING.OVERS}
            label="Overs"
            name="BOWLING.OVERS"
            placeholder="Enter Total Overs"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BOWLING ? props.errors.BOWLING.OVERS : false}
            touched={props.touched.BOWLING ? props.touched.BOWLING.OVERS : false}
        />
    );

    renderWicketsField = props => (
        <TextInput
            value={props.values.BOWLING.WKTS}
            label="Wickets"
            name="BOWLING.WKTS"
            placeholder="Enter Total Wickets"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BOWLING ? props.errors.BOWLING.WKTS : false}
            touched={props.touched.BOWLING ? props.touched.BOWLING.WKTS : false}
        />
    );

    renderMaidenField = props => (
        <TextInput
            value={props.values.BOWLING.MDNS}
            label="Maidens"
            name="BOWLING.MDNS"
            placeholder="Enter Maiden"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BOWLING ? props.errors.BOWLING.MDNS : false}
            touched={props.touched.BOWLING ? props.touched.BOWLING.MDNS : false}
        />
    );

    renderRunsField = props => (
        <TextInput
            value={props.values.BATTING.RUNS}
            label="Runs"
            name="BATTING.RUNS"
            placeholder="Enter Total Runs"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING.RUNS : false}
            touched={props.touched.BATTING ? props.touched.BATTING.RUNS : false}
        />
    );

    renderNoField = props => (
        <TextInput
            value={props.values.BATTING.NO}
            label="Nos"
            name="BATTING.NO"
            placeholder="Enter Total Nos"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING.NO : false}
            touched={props.touched.BATTING ? props.touched.BATTING.NO : false}
        />
    );

    renderInningsField = props => (
        <TextInput
            value={props.values.BATTING.INNINGS}
            label="Innings"
            name="BATTING.INNINGS"
            placeholder="Enter Total Innings"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING.INNINGS : false}
            touched={props.touched.BATTING ? props.touched.BATTING.INNINGS : false}
        />
    );

    renderHighestField = props => (
        <TextInput
            value={props.values.BATTING.HIGHEST}
            label="Highest"
            name="BATTING.HIGHEST"
            placeholder="Enter Highest"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING.HIGHEST : false}
            touched={props.touched.BATTING ? props.touched.BATTING.HIGHEST : false}
        />
    );

    renderAverageField = props => (
        <TextInput
            value={props.values.BATTING.AVG}
            label="Average"
            name="BATTING.AVG"
            placeholder="Enter Average"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING.AVG : false}
            touched={props.touched.BATTING ? props.touched.BATTING.AVG : false}
        />
    );

    render6sField = props => (
        <TextInput
            value={props.values.BATTING['6s']}
            label="6s"
            name="BATTING['6s']"
            placeholder="Enter Total 6s"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING['6s'] : false}
            touched={props.touched.BATTING ? props.touched.BATTING['6s'] : false}
        />
    );

    render50sField = props => (
        <TextInput
            value={props.values.BATTING['50s']}
            label="50s"
            name="BATTING['50s']"
            placeholder="Enter Total 50s"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING['50s'] : false}
            touched={props.touched.BATTING ? props.touched.BATTING['50s'] : false}
        />
    );

    render4sField = props => (
        <TextInput
            value={props.values.BATTING['4s']}
            label="4s"
            name="BATTING['4s']"
            placeholder="Enter Total 4s"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING['4s'] : false}
            touched={props.touched.BATTING ? props.touched.BATTING['4s'] : false}
        />
    );

    render100sField = props => (
        <TextInput
            value={props.values.BATTING['100s']}
            label="100s"
            name="BATTING['100s']"
            placeholder="Enter Total 100s"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            error={props.errors.BATTING ? props.errors.BATTING['100s'] : false}
            touched={props.touched.BATTING ? props.touched.BATTING['100s'] : false}
        />
    );
}

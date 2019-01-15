import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardHeader,
    CardImg,
    CardFooter,
    Button,
} from 'reactstrap';

import { SponsorForm } from '../../components/forms';
import {
    requestSponsors,
    addSponsor,
    editSponsor,
    deleteSponsor,
} from '../../redux/modules/Sponsors';
import { Sponsors as SponsorsType, Sponsor } from '../../redux/modules/Sponsors/types';
import requiresAuth from '../../utils/requiresAuth';
import { Modal } from '../../components/ui';

type Props = {
    sponsors: SponsorsType,
    editSponsor: () => void,
    addSponsor: () => void,
    deleteSponsor: () => void,
    requestSponsors: () => void,
};

type State = {
    selectedSponsor: Sponsor,
};

class Sponsors extends Component<Props, State> {
    state = {
        selectedSponsor: {},
    };

    componentDidMount() {
        this.props.requestSponsors();
    }

    render() {
        const { selectedSponsor } = this.state;
        return (
            <div className="row no-gutters">
                <div className="col-12 p-2">
                    <h2>Sponsors</h2>
                    <div className="row no-gutters">
                        {this.renderNewItemOption()}
                        {this.renderSponsors()}
                    </div>
                </div>
                <Modal
                    header="Add Sponsor"
                    body={this.renderAddSponsorBody}
                    footer={this.addSponsorOptions()}
                    ref={(o) => { this.addSponsorModal = o; }}
                />
                <Modal
                    header="Edit Sponsor"
                    body={() => this.renderEditSponsorBody(selectedSponsor)}
                    footer={this.renderEditSponsorFooter}
                    ref={(o) => { this.editSponsorModal = o; }}
                />
            </div>
        );
    }

    renderNewItemOption = () => (
        <div className="col-md-3 p-1">
            <Card className="h-100">
                <CardHeader className="text-center">
                    New Sponsor
                </CardHeader>
                <CardBody className="bg-primary">
                    <CardImg className="rounded" top width="100%" src="/img/sponsors.jpg" alt="add-sponsor" />
                    <CardImg className="pt-3 w-50 d-block m-auto" src="/img/logo.png" alt="logo" />
                </CardBody>
                <CardFooter>
                    <Button
                        outline
                        color="primary"
                        className="btn-block"
                        onClick={() => this.addSponsorModal && this.addSponsorModal.toggle()}
                    >
                        Add Sponsor
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );

    renderSponsors = () => {
        const { items } = this.props.sponsors;
        return _.map(items, (sponsor, index) => this.renderSponsorCard(sponsor, index));
    }

    renderSponsorCard = (sponsor, index) => (
        <div className="col-md-3 p-1" key={index}>
            <Card className="h-100">
                <CardHeader className="text-center">
                    <a
                        href={sponsor.WEBSITE}
                        className="text-white"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {sponsor.NAME}
                    </a>
                </CardHeader>
                <CardBody>
                    <CardImg className="rounded" top width="100%" src={sponsor.IMAGE} alt="sponsor" />
                    <CardSubtitle className="text-left my-3 body-font">
                        {sponsor.TAG_LINE}
                    </CardSubtitle>
                </CardBody>
                <CardFooter>
                    <Button
                        outline
                        color="primary"
                        className="btn-block"
                        onClick={() => this.handleSponsorEdit(sponsor)}
                    >
                        Edit Sponsor
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )

    renderAddSponsorBody = () => (
        <SponsorForm action={this.props.addSponsor} />
    );

    renderEditSponsorBody = sponsor => (
        <SponsorForm
            action={this.props.editSponsor}
            sponsor={sponsor}
        />
    );

    addSponsorOptions = () => ([
        {
            label: 'Cancel',
            key: 'cancel',
            color: 'secondary',
            onClick: () => this.addSponsorModal && this.addSponsorModal.toggle(),
        },
        {
            label: 'Submit',
            key: 'submit',
            color: 'primary',
            type: 'submit',
            form: 'sponsor-form',
        },
    ]);

    renderEditSponsorFooter = () => (
        <div className="d-flex justify-content-between w-100">
            <div>
                <Button
                    outline
                    color="danger"
                    onClick={this.handleDelete}
                >
                    Delete
                </Button>
            </div>
            <div>
                <Button
                    outline
                    color="secondary"
                    className="mr-1"
                    onClick={() => this.editSponsorModal && this.editSponsorModal.toggle()}
                >
                    Cancel
                </Button>
                <Button
                    outline
                    color="primary"
                    type="submit"
                    key="submit"
                    form="sponsor-form"
                >
                    {this.props.sponsors.loading ? 'Saving' : 'Save'}
                </Button>
            </div>
        </div>
    )

    handleSponsorEdit = (sponsor) => {
        this.setState({ selectedSponsor: sponsor });
        if (this.editSponsorModal) this.editSponsorModal.toggle();
    }

    handleDelete = () => {
        const { selectedSponsor } = this.state;
        this.props.deleteSponsor(selectedSponsor);
        this.setState({ selectedSponsor: {} });
        if (this.editSponsorModal) this.editSponsorModal.toggle();
    }
}

const mapStateToProps = state => ({
    sponsors: state.sponsors,
});

const mapDispatchToProps = {
    requestSponsors,
    addSponsor,
    editSponsor,
    deleteSponsor,
};

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(Sponsors));

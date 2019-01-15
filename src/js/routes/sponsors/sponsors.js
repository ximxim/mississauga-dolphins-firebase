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

import { requestSponsors } from '../../redux/modules/Sponsors';
import { Sponsors as SponsorsType } from '../../redux/modules/Sponsors/types';
import requiresAuth from '../../utils/requiresAuth';

type Props = {
    sponsors: SponsorsType,
    requestSponsors: () => void,
};

type State = {};

class Sponsors extends Component<Props, State> {
    componentDidMount() {
        this.props.requestSponsors();
    }

    render() {
        return (
            <div className="row no-gutters">
                <div className="col-12 p-2">
                    <h2>Sponsors</h2>
                    <div className="row no-gutters">
                        {this.renderNewItemOption()}
                        {this.renderSponsors()}
                    </div>
                </div>
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
                    <Button outline color="primary" className="btn-block">
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
                    <Button outline color="primary" className="btn-block">
                        Edit Sponsor
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    sponsors: state.sponsors,
});

const mapDispatchToProps = {
    requestSponsors,
};

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuth(Sponsors));

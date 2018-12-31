import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import { getClient } from '../../../utils/firebase';

type Props = {
    accept?: string,
    reference?: string,
    filename: string,
    children: Object,
};

type State = {};

class FirebaseFileUploader extends Component<Props, State> {
    static defaultProps = {
        accept: 'image/*',
        reference: 'images',
    };

    render() {
        const firebase = getClient();
        const {
            accept,
            reference,
            children,
            filename,
        } = this.props;

        return (
            <CustomUploadButton
                accept={accept}
                name="events"
                filename={filename}
                storageRef={firebase.storage().ref(reference)}
                onUploadStart={console.log}
                onUploadError={console.log}
                onUploadSuccess={this.handleSuccess}
                onProgress={console.log}
            >
                {children}
            </CustomUploadButton>
        );
    }

    handleSuccess = async (filename, task) => {
        const downloadLink = await task.snapshot.ref.getDownloadURL();
        console.log(downloadLink);
    }
}

export default connect()(FirebaseFileUploader);

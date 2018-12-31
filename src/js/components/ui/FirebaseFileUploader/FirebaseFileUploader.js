import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FileUploader from 'react-firebase-file-uploader';

import { getClient } from '../../../utils/firebase';
import { imageAspects } from '../../../utils/imageAspects';

type Props = {
    reference?: string,
    filename: string,
    aspect?: Object,
};

type State = {
    files: Array<Object>,
};

class FirebaseFileUploader extends Component<Props, State> {
    static defaultProps = {
        reference: 'images',
        aspect: imageAspects.small,
    };

    render() {
        const firebase = getClient();
        const {
            reference,
            filename,
        } = this.props;

        return (
            <FileUploader
                accept="image/*"
                name="events"
                filename={filename}
                storageRef={firebase.storage().ref(reference)}
                onUploadStart={console.log}
                onUploadError={console.log}
                onUploadSuccess={this.handleSuccess}
                onProgress={console.log}
                onChange={this.handleChange}
                ref={(o) => { this.fileUploader = o; }}
            />
        );
    }

    handleChange = (event) => {
        const { target: { files } } = event;
        const { aspect } = this.props;
        _.map(files, ((file) => {
            const URL = window.URL || window.webkitURL;
            const img = new Image();

            img.onload = () => {
                const { width, height } = img;
                if (aspect.formula({ height, width })) this.fileUploader.startUpload(file);
                else alert(aspect.error);
            };
            img.src = URL.createObjectURL(file);
        }));
    }

    handleSuccess = async (filename, task) => {
        const downloadURL = await task.snapshot.ref.getDownloadURL();
        console.log(downloadURL);
    }
}

export default connect()(FirebaseFileUploader);

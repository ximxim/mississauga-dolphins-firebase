import React, { Component } from 'react';
import _ from 'lodash';
import FileUploader from 'react-firebase-file-uploader';
import { toast } from 'react-toastify';

import { getClient } from '../../../utils/firebase';
import { imageAspects } from '../../../utils/imageAspects';
import { resize } from '../../../utils/resizeImage';
import { Preview } from './FirebaseImageUploader.styled';

type Props = {
    reference?: string,
    filename: string,
    aspect?: Object,
    onChange?: () => void,
    cta?: string,
    preview? : string,
    name: string,
};

type State = {
    value: {
        source: string,
        thumbnail: string,
    },
    uploading: Boolean,
};

class FirebaseFileUploader extends Component<Props, State> {
    static defaultProps = {
        reference: 'images',
        aspect: imageAspects.small,
        onChange: () => {},
        cta: 'Upload an image',
        preview: null,
    };

    state = {
        value: {
            source: null,
            thumbnail: null,
        },
        uploading: false,
    }

    render() {
        const firebase = getClient();
        const {
            reference,
            filename,
            cta,
            name,
        } = this.props;

        return (
            <div>
                {this.renderThumbnail()}
                <label className="btn btn-outline-primary d-block mt-2">
                    {cta}
                    <FileUploader
                        hidden
                        accept="image/*"
                        name={name}
                        filename={filename}
                        storageRef={firebase.storage().ref(reference)}
                        onUploadStart={this.handleStart}
                        onUploadError={this.handleError}
                        onUploadSuccess={this.handleSuccess}
                        onChange={this.handleChange}
                        ref={(o) => { this.fileUploader = o; }}
                    />
                </label>
            </div>
        );
    }

    renderThumbnail = () => {
        const { value: { thumbnail }, uploading } = this.state;
        const { preview } = this.props;
        let source = '/img/upload-image.jpg';
        let alt = 'Select an image';

        if (preview && !uploading) {
            source = preview;
            alt = 'thumbnail';
        } else if (uploading) {
            source = '/img/loading.gif';
            alt = 'loading';
        } else if (thumbnail) {
            source = thumbnail;
            alt = 'thumbnail';
        }

        return <Preview src={source} alt={alt} />;
    }

    handleStart = () => this.setState({ uploading: true });

    handleError = () => this.setState({ uploading: false });

    handleChange = (event) => {
        const { target: { files } } = event;
        const { aspect } = this.props;

        _.map(files, ((file) => {
            const URL = window.URL || window.webkitURL;
            const img = new Image();

            img.onload = async () => {
                const { width, height } = img;

                if (aspect.formula({ height, width })) {
                    const thumbnail = await resize({
                        file,
                        height: aspect.thumbnail.height,
                        width: aspect.thumbnail.width,
                        filename: `${file.name}_thumbnail`,
                    });

                    this.fileUploader.startUpload(file);
                    this.fileUploader.startUpload(thumbnail);
                } else toast.error(aspect.error);
            };
            img.src = URL.createObjectURL(file);
        }));
    }

    handleSuccess = async (filename, task) => {
        const downloadURL = await task.snapshot.ref.getDownloadURL();
        if (filename.indexOf('_thumbnail') > -1) {
            this.setState(state => ({
                value: {
                    ...state.value,
                    thumbnail: downloadURL,
                },
            }), this.checkIfDone);
        } else {
            this.setState(state => ({
                value: {
                    ...state.value,
                    source: downloadURL,
                },
            }), this.checkIfDone);
        }
    }

    checkIfDone = () => {
        const { source, thumbnail } = this.state.value;
        if (source && thumbnail) {
            this.setState({ uploading: false });
            this.props.onChange('cover', this.state.value, true);
        }
    }
}

export default FirebaseFileUploader;

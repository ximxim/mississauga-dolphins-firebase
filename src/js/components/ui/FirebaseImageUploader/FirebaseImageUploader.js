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
    aspect?: Object,
    onChange?: () => void,
    cta?: string,
    preview? : string,
    name: string,
    error: string,
};

type State = {
    value: {
        source: string,
        thumbnail: string,
    },
    uploading: Boolean,
    newUpload: null,
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
            cta,
            name,
            error,
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
                        randomizeFilename={false}
                        storageRef={firebase.storage().ref(reference)}
                        onUploadStart={this.handleStart}
                        onUploadError={this.handleError}
                        onUploadSuccess={this.handleSuccess}
                        onChange={this.handleChange}
                        ref={(o) => { this.fileUploader = o; }}
                    />
                </label>
                {error && <p className="text-danger fs-2 pt-1 mb-0">Required</p>}
            </div>
        );
    }

    renderThumbnail = () => {
        const { value: { thumbnail }, uploading, newUpload } = this.state;
        const { preview } = this.props;
        let source = '/img/upload-image.jpg';
        let alt = 'Select an image';

        if (newUpload && !uploading) {
            source = newUpload;
            alt = 'new image';
        } else if (preview && !uploading) {
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
                    this.setState({
                        value: {
                            source: filename => new Promise((resolve) => {
                                const source = filename
                                    ? new File([file], filename, { type: file.type })
                                    : file;
                                this.fileUploader.startUpload(source);
                                this.sourceHandler = resolve;
                            }),
                            thumbnail: filename => new Promise((resolve) => {
                                const newThumb = filename
                                    ? new File([thumbnail], `${filename}_thumbnail`, { type: file.type })
                                    : thumbnail;
                                this.fileUploader.startUpload(newThumb);
                                this.thumbHandler = resolve;
                            }),
                        },
                        newUpload: img.src,
                    });
                    this.props.onChange(this.state.value);
                } else toast.error(aspect.error);
            };
            img.src = URL.createObjectURL(file);
        }));
    }

    handleSuccess = async (filename, task) => {
        this.setState({ uploading: false });
        const downloadURL = await task.snapshot.ref.getDownloadURL();
        console.log(filename);
        if (filename.indexOf('_thumbnail') > -1) {
            console.log('is a thumbnail');
            this.thumbHandler(downloadURL);
        } else this.sourceHandler(downloadURL);
    }
}

export default FirebaseFileUploader;

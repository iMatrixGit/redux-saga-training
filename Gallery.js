import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { changeSelectedImage, loadImages } from './actions'

class Gallery extends Component {
    componentDidMount(){
        const { loadImages } = this.props;
        loadImages();
    }
    render(){
        const { images, selectedImage, changeSelectedImage, isLoading } = this.props;

        return (
            <div className={`image-gallery ${ isLoading ? 'loader' : null }`}>
                <div className="gallery-image">
                    <div>
                        <img src={images[selectedImage]} />
                    </div>
                </div>
                <div className="image-scroller">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => changeSelectedImage(index)}
                        >
                            <img src={image}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.array,
    selectedImage: PropTypes.number
};

export default connect(
    state => ({
        images: state.images,
        selectedImage: state.selectedImage,
        isLoading: state.isLoading
    }),
    dispatch => bindActionCreators({
        loadImages,
        changeSelectedImage
    }, dispatch)
)(Gallery)


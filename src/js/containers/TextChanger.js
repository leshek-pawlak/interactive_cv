import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class TextChanger extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        className: PropTypes.string,
        style: PropTypes.object,
        editMode: PropTypes.bool,
    }

    constructor(props) {
        super(props)
        this.state = {
            doubleClicked: false,
            textValue: props.value,
        }

        this.doubleClickHandle = this.doubleClickHandle.bind(this)
        this.textareaChangeHandler = this.textareaChangeHandler.bind(this)
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.editMode && this.state.doubleClicked) {
            this.setState({
                doubleClicked: false,
            })
        }
    }

    doubleClickHandle() {
        if (!this.props.editMode) {return}
        this.setState({
            doubleClicked: !this.state.doubleClicked,
        })
    }

    textareaChangeHandler(event) {
        this.setState({
            textValue: event.target.value,
        })
    }

    render() {
        return (
          <div style={this.props.style} className={this.props.className} onDoubleClick={this.doubleClickHandle}>
            {this.state.doubleClicked && <textarea defaultValue={this.state.textValue} onChange={this.textareaChangeHandler} />}
            {!this.state.doubleClicked && <div dangerouslySetInnerHTML={{__html: this.state.textValue}} />}
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        editMode: state.editMode,
    }
}

export default connect(mapStateToProps)(TextChanger)

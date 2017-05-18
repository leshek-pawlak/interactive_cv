import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactMaterialSelect from 'react-material-select'
import { setEditMode } from '../actions/index'
import TextChanger from './TextChanger'
import classNames from 'classnames'
import initialContent from '../initialData'

import '../../css/main.css'

class Home extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        editMode: PropTypes.bool,
    }

    constructor() {
        super()
        this.state = {
            content: initialContent,
        }
        // to have "this" in the functions we need to bind them.
        this.callbackFunction = this.callbackFunction.bind(this)
    }

    callbackFunction(selected) {
        // change edit mode
        this.props.actions.setEditMode(selected.value)
    }

    render() {
        // Get skills from content, sort them by number attribute and save as array.
        let skillsToSort = []
        for (let key in this.state.content.skills) {
            skillsToSort.push([
                <div className="float-wrapper" key={key}><TextChanger className="pull-left" value={key}/><div className="pull-right"><div className={`rate-${this.state.content.skills[key]}`}></div></div></div>, this.state.content.skills[key],
            ])
        }
        skillsToSort.sort(function(a, b) {
            return b[1] - a[1]
        })
        // remove number value we used to sort elements
        let skills = skillsToSort.map(skillArray => {
            return skillArray[0]
        })
        return (
        <div className={classNames('container', {'edit-mode': this.props.editMode})}>
          <ReactMaterialSelect defaultValue="read" label="Choose mode" resetLabel={false} onChange={this.callbackFunction.bind(this)}>
            <option dataValue="edit">Edit CV</option>
            <option dataValue="read">Just read</option>
          </ReactMaterialSelect>
          {this.props.editMode && <div className="rms-wrapper"><TextChanger value="<p>Double click on text to change it, and double click again to stop changing.</p>"/></div>}
          <div className="card introduction">
            <div className="animation-container">
              <img src="https://avatars3.githubusercontent.com/u/4362802?v=3&s=460"/>
            </div>
            {/* Best way to display many elements is map the array */}
            {this.state.content.me.map((content, i) => {
                return <TextChanger key={i} value={content}/>
            })}
          </div>
          <div className="card projects">
            <TextChanger value={this.state.content.titles[2]}/>
            <div className="legend">
              <TextChanger style={{ flexWrap: 'nowrap' }} value="Name" />
              <TextChanger value="Technologies" />
              <TextChanger style={{ flexWrap: 'nowrap' }} value="Period" />
            </div>
            {/* When the array have objects we can display them that way ... */}
            {this.state.content.projects.map((project, i) => {
                return <div className="project" key={i}><TextChanger style={{ flexWrap: 'nowrap' }} value={project.name}/><TextChanger value={project.technologies}/><TextChanger style={{ flexWrap: 'nowrap' }} value={project.period}/></div>
            })}
          </div>
          <div className="card half skills">
            <TextChanger value={this.state.content.titles[1]}/>
            {/* ... or prepare earlier array to display */}
            {skills}
          </div>
          <div className="card half experiences">
            <TextChanger value={this.state.content.titles[0]}/>
            {/* We can make map functions nested in the react template files */}
            {this.state.content.experiences.map((experience, i) => {
                return experience.map((description, k) => {
                    return <TextChanger key={`${i}_${k}`} value={description}/>
                })
            })}
          </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        editMode: state.editMode,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setEditMode,
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

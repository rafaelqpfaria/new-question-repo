import React, { Component } from 'react'

class createNewClass extends Component {

    static defaultProps = {
        onSubmit: () => { }
    }

    constructor(props) {
        super(props)
        this.state = {

            teacherName: '',
            disciplineName: '',
            classesPerWeek: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { target } = event,
            { name, value } = target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        const newCourse = this.state

        if (newCourse.teacherName && newCourse.disciplineName && newCourse.classesPerWeek) {
            this.props.onSubmit(newCourse)
            this.setState({
                teacherName: '',
                disciplineName: '',
                classesPerWeek: ''

            })
        }
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit}>
                <label>
                    <span>Professor</span>
                    <input name='teacherName' onChange={this.handleChange} type='text' value={this.state.teacherName} placeholder='Nome'></input>
                </label><br></br>
                <label>
                    <span>Disciplina</span>
                    <input name='disciplineName' onChange={this.handleChange} type='text' valeu={this.state.disciplineName} placeholder='Disciplina'></input>
                </label><br></br>
                <label>
                    <span>Aulas por semana</span>
                    <input name='classesPerWeek' onChange={this.handleChange} value={this.state.classesPerWeek} type='number'></input>
                </label><br></br>

                <button type='submit'>Adicionar Professor</button>
            </form>
        )
    }
}

export default createNewClass
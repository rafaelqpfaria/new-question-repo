import React , { Component, Components } from 'react'

class classes extends Component{
    static defaultProps = {
        course:{}
    }
    
    render(){
        const{props} = this,
            {course} = props
        return(

            <li>
                <div>{course.teacherName}</div>
                <div>{course.disciplineName}</div>
                <div>{course.classesPerWeek}</div>

            </li>

        )
    }

        
}

export default classes
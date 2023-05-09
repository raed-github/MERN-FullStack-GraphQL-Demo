
import { useState } from 'react'
import { graphql,compose } from 'react-apollo'
import { getInstructorsQuery,getCoursesQuery,addCourseMutation } from '../queries/queries'

const CourseForm = (props)=>{
    const [course,setCourse] = useState({})
    const onChange=(e)=>{
        e.preventDefault()
        setCourse({...course,[e.target.name]:e.target.value})
    }

    function instructors(){
        const data = props.instructors
        if(data.loading){
            return<option disabled>loading...</option>
        }else{
            return data.instructors.map((instructor)=>{
                return <option 
                    id={instructor.id} 
                    value={instructor.id}>
                    {instructor.name}
                </option>
            })     
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        if(course.name&&course.subject&&course.instructor){
            props.addCourseMutation({
                variables: {
                    name: course.name,
                    subject: course.subject,
                    instructorId: course.instructor
                }
                ,
                refetchQueries: [{ query: getCoursesQuery }]
            });
        }else{
            alert("all course fields are mandatory")
        }
        setCourse({})
    }

    return(
        <form onSubmit={submitForm}>
            <label>Course Name</label>
            <input 
                id="name" 
                name="name"
                onChange={onChange}
                value={course.name?course.name:""}
                type="text"/>

            <label>Course Subject</label>
            <input 
                id="subject" 
                name="subject"
                onChange={onChange}
                value={course.subject?course.subject:""}
                type="text"/>

            <label>Instructor</label>
            <select id="instructor"
            name="instructor"
            onChange={onChange}>
                <option></option>
                {instructors()}
            </select>
            <button>+</button>
        </form>
    )
}
export default compose(
    graphql(getInstructorsQuery,{name:'instructors'}),
    graphql(getCoursesQuery,{name:'courses'}),
    graphql(addCourseMutation,{name:'addCourseMutation'})
    )(CourseForm)
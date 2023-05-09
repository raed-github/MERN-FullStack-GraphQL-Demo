import { useState } from "react"
import { addInstructorMutation,getInstructorsQuery } from "../queries/queries"
import { graphql,compose } from 'react-apollo'

const InstructorForm = (props)=>{
    const [instructor,setInstructor] = useState({})
    const onChange=(e)=>{
        e.preventDefault()
        console.log(instructor)
        setInstructor({...instructor,[e.target.name]:e.target.value})
    }

    const submitForm = (e)=>{
        e.preventDefault()
        if(instructor.name&&instructor.age){
            props.addInstructorMutation({
                variables: {
                    name: instructor.name,
                    age: parseInt(instructor.age)
                }
                ,
                refetchQueries: [{ query: getInstructorsQuery }]
            });
        }else{
            alert("all instructor form fields are mandatory")
        }
        setInstructor({})
    }
    return(
        <form onSubmit={submitForm}>
            <label>Instructor Name</label>
            <input 
                    id="name" 
                    name="name"
                    onChange={onChange}
                    value={instructor.name?instructor.name:""}
                    type="text"/>

            <label>Age</label>
            <input 
                    id="age" 
                name="age"
                onChange={onChange}
                value={instructor.age?instructor.age:""}
                type="number"/>
            <button>+</button>
        </form>
    )
}

export default  compose(
    graphql(addInstructorMutation,{name:'addInstructorMutation'}),
    graphql(getInstructorsQuery,{name:'getInstructorsQuery'}),
    )(InstructorForm)
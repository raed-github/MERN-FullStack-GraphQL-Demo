import { gql } from 'apollo-boost';

const getInstructorsQuery=gql`
{
    instructors{
        id
        name
    }
}
`

const getCoursesQuery=gql`
{
    courses{
        id
        name
        subject
    }
}
`

const addCourseMutation = gql`
    mutation addCourse($name: String!, $subject: String!, $instructorId: ID!){
        addCourse(name: $name, subject: $subject, instructorId: $instructorId){
            name,
            subject
        }
    }
`

const addInstructorMutation = gql`
    mutation addInstructor($name: String!, $age: Int!){
        addInstructor(name: $name, age: $age) {
            name
        }
    }
`

export{ 
    getInstructorsQuery,
    getCoursesQuery,
    addCourseMutation, 
    addInstructorMutation }
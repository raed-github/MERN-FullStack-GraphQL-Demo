import { graphql } from 'react-apollo'
import { getCoursesQuery } from '../queries/queries'

const CourseList = (props)=>{
    function courses(){
        var data = props.data
        if(data.loading){
            return(<div>loading...</div>)
        }else{
            return data.courses.map((course)=>{
                return (
                    <tr>
                        <td>
                            {course.name}
                        </td>
                        <td>{course.subject}</td>
                    </tr>
                    )
            })
        }
    }
    return(
        <div className="course-list">
            <table>
                <thead>
                    <tr>
                        <th>
                            Course Name
                        </th>
                        <th>
                            Subject
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {courses()}
                </tbody>
            </table>
        </div>
    )
}
export default graphql(getCoursesQuery)(CourseList)
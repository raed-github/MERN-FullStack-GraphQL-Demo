
import CourseList from './component/CourseList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import CourseForm from './component/CourseForm';
import InstructorForm from './component/InstructorForm';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
})

const App = ()=>{
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>MERNStack Graphql demo</h1>
        <InstructorForm />
        <CourseForm />
        <CourseList />
      </div>
    </ApolloProvider>
  );
}

export default App;

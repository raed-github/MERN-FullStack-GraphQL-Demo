const graphql = require('graphql');
const _ = require('lodash');
const Instructor = require('../models/instructor')
const Course = require('../models/course')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

var courses=[
    {name:"course1",subject:"graphql",id:'1',instructorId:'1'},
    {name:"course2",subject:"graphql",id:'2',instructorId:'2'},
    {name:"course3",subject:"graphql",id:'3',instructorId:'3'},
    {name:"course4",subject:"graphql",id:'4',instructorId:'4'},
    {name:"course5",subject:"graphql",id:'5',instructorId:'1'},
    {name:"course6",subject:"graphql",id:'6',instructorId:'2'},
    {name:"course7",subject:"graphql",id:'7',instructorId:'3'},
    {name:"course8",subject:"graphql",id:'8',instructorId:'4'}
]

var instructors=[
    {name:"instructor1",age:"44",id:'1'},
    {name:"instructor2",age:"44",id:'2'},
    {name:"instructor3",age:"44",id:'3'},
    {name:"instructor4",age:"44",id:'4'}
]

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        subject: { type: GraphQLString },
        instructor: {
            type: InstructorType,
            resolve(parent, args){
                return Instructor.findById(parent.instructorId);
            }
        }
    })
})

const InstructorType = new GraphQLObjectType({
    name: 'Instructor',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent,args){
                return Course.find({ instructorId: parent.id });
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        course:{
            type:CourseType,
            args:{id:{ type:GraphQLID }},//course(id:'123'){name,subject}
            resolve(parent,args){
                return Course.findById(args.id);
            }
        },
        instructor:{
            type:InstructorType,
            args:{id:{ type:GraphQLID }},
            resolve(parent,args){
                return Instructor.findById(args.id);
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent,args){
                return Course.find({});
            }
        },
        instructors: {
            type: new GraphQLList(InstructorType),
            resolve(parent,args){
                return Instructor.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addInstructor:{
            type:InstructorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let instructor = new Instructor({
                    name: args.name,
                    age: args.age
                })
                return instructor.save()
            }
        },
        addCourse:{
            type:CourseType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                subject: {type: new GraphQLNonNull(GraphQLString)},
                instructorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                console.log(args)
                let course = new Course({
                    name: args.name,
                    subject: args.subject,
                    instructorId: args.instructorId
                })
                return course.save()
            }
        }
    }
})
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
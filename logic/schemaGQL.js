import { gql } from "apollo-server-express";

const typeDefs = gql `
type Query{
    me:User
    giveplan:[Plan]
    giveallplan:[Plan]
    giveOnePlan(id:String!):Plan
    oneplan(id:String!):[OnePlan]
    get_msg(id:String!):Data
    get_unCheck:[Uncheck]
    get_totalR:Int
    get_month:[Month]
    get_sold_plan:[Sold]
    get_waiting:[Waiting]
    get_refund:[Refund]
    get_help:[Help]
}
type Help{
    id:String
    by:User
    on:Plan
    time:String
}
type Refund{
    id:String
    by:[User]
    plan:String
    platform:String
}
type User{
    id:ID
    userName:String
    lastName:String
    firstName:String
    email:String
    password:String
    phone:String
}
type Waiting{
    id:String
    plan:String
    platform:String
    member:Int
    timeRN:String
    price:Int
}
type Sold{
    plan:String
    platform:String
    count:Int
    members:Int
}
type Month{
    month:String
    revenue:Int
}
type Uncheck{
    id:String
    userName:String!
    email:String
    members:Int
    plan:String
    platform:String
    price:Int
    timePeriod:Int
}
type Data{
    messages:[Message!]!
}
type Message{
    msg:String!
    side:Boolean!
    userName:String!
}
type OnePlan{
    left:String!
    plan:String!
    price:Int!
    timePeriod:Int!
    quality:String!
    Ldevice:Int!
    Ddevice:Int!
    platform:String!
    email:String
    password:String
    members:[User_with_plan]
}
type Plan{
    id: ID!
    plan: String!
    platform: String!
    starting: String!  
    ending: String!
    price: Int!
    email: String!
    password: String!
    members: [User_with_plan]
}
type User_with_plan{
    id:ID!
    userName:String!
}

type Mutation{
    signup(userNew:UserInput!):Token
    login(userOld:UserOldInput!):Token
    buyplan(buyplanNew:BuyPlanInput!):String
    checked(id:String!):String!
    sendmsg(MsgNew:MsgInput!):String
    mail_pass(mail_passNew:mail_passInput!):String
    cancle(cancle_new:cancleInput!):String
    refunded(id:String!):String
    remove_waiting:String
    help(complain:String!):String
    helped(id:String!):String
    notPaid(id:String!):String
}
input cancleInput{
    plan:String
    platform:String
    member:Int
}
input mail_passInput{
    id:String!
    email:String!
    password:String!
}
input MsgInput{
    id:String!
    msg:String!
}
input BuyPlanInput{
    plan:String!
    member:Int!
    platform:String!
    timePeriod:Int!
    Ldevice:Int!
    Ddevice:Int!
    quality:String!
    price:Int!
}
type Token{
    token:String!
}
input UserOldInput{
    userName:String!
    password:String!
}
input UserInput{
    firstName:String!
    lastName:String!
    userName:String!
    email:String!
    password:String!
    phone:String!
}
`
export default typeDefs;
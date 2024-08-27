import { gql } from "@apollo/client";

export const SIGNUP = gql `
mutation CreateNewUser($data: UserInput!) {
  signup(userNew: $data) {
    token
  }
}
`
export const MEINFO = gql `
query MEINFO{
  me{
    id
    userName
    firstName
    lastName
    email
    password
  }
}
`

export const LOGIN = gql `
mutation Login($data:UserOldInput!){
  login(userOld:$data){
    token
  }
}
`

export const BuyPlan = gql `
mutation BuyPlan($data:BuyPlanInput!){
  buyplan(buyplanNew:$data)
}
`

export const Get_Plan = gql `
query GivePlan{
	giveplan{
    id
    plan
    platform
  }
}
`
export const GetOnePlanData = gql `
query GiveOnePlanInfo($data:String!){
  oneplan(id:$data){
    left
    plan
    price
    quality
    Ldevice
    Ddevice
    timePeriod
    platform
    email
    password
    members{
      id
      userName
    }
  }
}
`
export const Get_msg = gql `
query Get_msg($data:String!){
  get_msg(id:$data){
    messages{
      msg
      side
      userName
    }
  }
}
`
export const Send_msg = gql `
mutation SendMsg($data:MsgInput!){
  sendmsg(MsgNew:$data)
}
`
export const Get_UnCHECK = gql `
query Get_Uncheck{
  get_unCheck{
      id
      userName
  		email
    	plan
    	platform
    	price
    	timePeriod
    	members
  }
}
`

export const CHECK = gql `
mutation Checked($data:String!){
	checked(id:$data)
}
`

export const GET_PLAN_INFO = gql `
query GivePlanInfo{
	giveallplan{
    id
    plan
    platform
    starting
    ending
    email
    password
    price
    members{
      id
      userName
    }
  }
}
`
export const GET_WAITING = gql `
query GET_WAITING{
  get_waiting{
    id
    timeRN
    plan
    platform
    member
  }
}
`
export const done_refunding = gql `
mutation done_refund($data:String!){
	refunded(id:$data)
}
`
export const done_checking = gql `
mutation done_checking($data:String!){
	helped(id:$data)
}
`
export const remove_waiting_after7 = gql `
mutation REmove_waiting{
  remove_waiting
}
`

export const ask_for_help = gql `
mutation AskHelp($data:String!){
  help(complain:$data)
}
`
export const Not_Paid = gql `
mutation RemoveForm_Unchecked($data:String!){
  notPaid(id:$data)
}
`
export const get_all_help = gql `
query GET_ALL_HELP{
  get_help{
  id
    by{
      userName
      email
      phone
    }
    on{
      id
      platform
      plan
    }
  }
}
`
export const get_refund = gql `
query Get_refund{
  get_refund{
  id
    by{
      userName
      email
      phone
    }
    plan
    platform
  }
}
`
export const Cancle = gql `
mutation cancle($data:cancleInput!){
  cancle(cancle_new:$data)
}
`
export const CHANGE = gql `
mutation Change_email_pass($data:mail_passInput!){
  mail_pass(mail_passNew:$data)
}
`
export const GET_SINGLE_PLAN_INFO = gql `
query GET_ONE_PLAN_INFO($data:String!){
  giveOnePlan(id:$data){
    id
    plan
    platform
    email
    password
    starting
    ending
    price
    members{
      id
      userName
    }
  }
}
`
export const GET_REVENUE = gql `
query Revenue{
  get_totalR
}
`

export const GET_REVENUE_MONTHLY = gql `
query GET_MONTHLY_REVENUE{
  get_month{
    month
    revenue
  }
}
`
export const GET_SOLD_PLAN = gql `
query GET_SOLD_PLAN{
  get_sold_plan{
    plan
    platform
    count
    members
  }
}
`
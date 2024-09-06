// Define TS interfaces
//what to include here? Tool name, id, other properties?
//Also, user info?
//add rating and price to Tools? I want to add these two but so many files have to be modified. Will make sure the app is running and will add these two later.

export interface Tools {
  id: number
  tool_name: string
  tool_owner: string
  description: string
  image: string
  availability: boolean
  category: string
  //user_rating: number
  //cost: number
  created_at: Date
}

export interface NewTool {
  tool_name: string
  tool_owner: string
  description: string
  image: string
  availability: boolean
}

export interface Roles {
  id: number
  name: string
}

export interface Users {
  auth_id: string
  username: string
  created_at: Date
}

export interface UsersData extends Users {
  id: number
}

export interface Transactions {
  id: number
  tool_id: number
  borrower_id: number
  lender_id: number
  start_date: Date
  end_date: Date
  rental_fee: number
  status: string
  created_at: Date
}

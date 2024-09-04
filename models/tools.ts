// Define TS interfaces
//what to include here? Tool name, id, other properties?
//Also, user info?

export interface Tools {
  id: number
  tool_name: string
  tool_owner: string
  description: string
  image: string
  availability: boolean
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
  id: number
  auth_id: string
  username: string
  created_at: Date
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

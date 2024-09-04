//Update this page: search functionality for tools
//Function: to search tools based on various criteria
//Parameters: search by ID, by name, by rating? Or by price?
//need a sort order ('asc', or 'desc')
//Function should: base query to 'tools' table; WHERE clause based on search parameters, ORDER BY if we need to sort on parameter, excecute and return results

//Considerations: input validation, error handling (ensure names are valid etc)
//Catch and handle database errors, return messages

//STRETCH: Consider implementing a function for advanced filtering
// This could allow for more complex queries, like searching for tools
// that match multiple categories or have multiple specific attributes

import db from '../connection.ts'
import { Tools } from '../../../models/tools.ts'

export async function getAllToolsDB() {
  const tool = await db('tool').select()
  return tool as Tools[]
}

export async function getToolByIdDB(id: number | string) {
  const tool = await db('tool').select().first().where({ id })
  return tool as Tools
}

export async function getToolsByCategoryDB(category: string) {
  const tool = await db('tool').select().where({ category })
  return tool as Tools[]
}

export async function addTool(data: ToolData) {
  const [id] = await db('tool').insert(data)
  return id
}

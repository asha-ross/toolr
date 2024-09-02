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

import db from './connection.ts'
import { Fruit, FruitData } from '../../models/tools.ts'

export async function getAllFruits() {
  const fruit = await db('fruit').select()
  return fruit as Fruit[]
}

export async function getFruitById(id: number | string) {
  const fruit = await db('fruit').select().first().where({ id })
  return fruit as Fruit
}

export async function addFruit(data: FruitData) {
  const [id] = await db('fruit').insert(data)
  return id
}

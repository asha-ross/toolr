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

// Get all tools from the database
export async function getAllToolsDB() {
  try {
    const tools = await db('tools').select('')
    return tools as Tools[]
  } catch (error) {
    console.error('Error fetching all tools:', error)
    throw new Error('Failed to fetch all tools')
  }
}

// Get a tool by its ID
export async function getToolByIdDB(id: number | string) {
  try {
    const tool = await db('tool').where({ id }).first()
    if (!tool) {
      throw new Error('Tool not found')
    }
    return tool as Tools
  } catch (error) {
    console.error(`Error fetching tool with ID ${id}:`, error)
    throw new Error('Failed to fetch tool by ID')
  }
}

// Get tools by category
export async function getToolsByCategoryDB(category: string) {
  try {
    const tools = await db('tool').where({ category })
    return tools as Tools[]
  } catch (error) {
    console.error(`Error fetching tools by category ${category}:`, error)
    throw new Error('Failed to fetch tools by category')
  }
}

// Add a new tool to the database
export async function addTool(data: Partial<Tools>) {
  try {
    const [id] = await db('tool').insert(data).returning('id')
    return id
  } catch (error) {
    console.error('Error adding new tool:', error)
    throw new Error('Failed to add tool')
  }
}

// Update a tool by its ID
export async function updateTool(id: number, data: Partial<Tools>) {
  try {
    const updatedRows = await db('tool')
      .where({ id })
      .update(data)
      .returning('*') 

    if (updatedRows.length === 0) {
      throw new Error('Tool not found')
    }

    return updatedRows[0] as Tools 
    console.error(`Error updating tool with ID ${id}:`, Error)
    throw new Error('Failed to update tool')
  } catch (error) {
    console.error(`Error updating tool with ID ${id}:`, error)
    throw new Error('Failed to update tool')
  }
}

// Delete a tool by its ID
export async function deleteTool(id: number) {
  try {
    const deletedRows = await db('tool')
      .where({ id })
      .del()

    if (deletedRows === 0) {
      throw new Error('Tool not found')
    }

    return deletedRows // Optionally return the number of deleted rows
  } catch (error) {
    console.error(`Error deleting tool with ID ${id}:`, error)
    throw new Error('Failed to delete tool')
  }
}

// Search for tools based on multiple criteria (name, rating, price, etc.)
// Includes sorting by specified parameter and order ('asc' or 'desc')
export async function searchTools(criteria: {
  name?: string,
  rating?: number,
  price?: number,
  sortBy?: 'name' | 'price' | 'rating',
  sortOrder?: 'asc' | 'desc'
}) {
  try {
    let query = db('tool').select()

    // Filter by name
    if (criteria.name) {
      query = query.where('name', 'like', `%${criteria.name}%`)
    }

    // Filter by rating
    if (criteria.rating) {
      query = query.where('rating', '>=', criteria.rating)
    }

    // Filter by price
    if (criteria.price) {
      query = query.where('price', '<=', criteria.price)
    }

    // Apply sorting
    if (criteria.sortBy) {
      const sortOrder = criteria.sortOrder || 'asc' 
      query = query.orderBy(criteria.sortBy, sortOrder)
    }

    const tools = await query
    return tools as Tools[]
  } catch (error) {
    console.error('Error searching for tools:', error)
    throw new Error('Failed to search tools')
  }
}
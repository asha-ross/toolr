//TODO: implement API routes for tools
//This file should define the following routes:
//- GET /api/v1/tools (get all tools)
// -GET /api/v1/tools/:id (get a specific tool by id)
// - POST /api/v1/tools (add a new tool)
// - PUT /api/v1/tools/:id (update an existing tool)
// - DELETE /api/v1/tools/:id (delete a tool)
// - GET /api/v1/tools/search (search for tools based on criteria)

import { Router } from 'express'

import * as db from '../db/functions/tools.ts'
import * as db_users from '../db/functions/users.ts'
import { StatusCodes } from 'http-status-codes'
// import checkJwt, { JwtRequest } from '../auth0.ts'
const router = Router()

//TODO: GET /api/v1/tools
//Returns all tools, potentially with pagination?
router.get('/', async (req, res) => {
  try {
    const tools = await db.getAllToolsDB()

    res.json(tools)
  } catch (error) {
    console.error('Error fetching tools:', error)
    res.status(500).json({ message: 'somthing went wrong on the server' })
  }
})

//TODO: GET /api/v1/tools/:id
//Returns a specific tool by id
router.get('/:id', async (req, res, next) => {
  try {
    const tool = await db.getToolByIdDB(Number(req.params.id))
    if (tool) {
      res.json(tool)
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Tool not found' })
    }
  } catch (err) {
    next(err)
  }
})

//TODO: POST /api/v1/tools
//Add a new tool
// router.post('/', async (req, res, next) => {
//   if (!req.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { tool_owner, tool_name, description, availability, image } = req.body
//     const id = await db.addTool({
//       tool_owner,
//       tool_name,
//       description,
//       availability,
//       image,
//     })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

// TODO: PUT /api/v1/tools/:id
//Update an existing tool
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedTool = await db.updateTool(Number(id), req.body)
    if (updatedTool) {
      res.status(StatusCodes.OK).json(updatedTool)
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Tool not found' })
    }
  } catch (error) {
    console.error(`Error updating tool with ID ${id}:`, error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error updating tool' })
  }
})

//TODO: DELETE /api/v1/tools/:id
//Delete a tool

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.deleteTool(Number(id))
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    console.error(`Error deleting tool with ID ${id}:`, error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error deleting tool' })
  }
})

//TODO: GET /api/v1/tools/search
//Search for tools based on various criteria
router.get('/search', async (req, res) => {
  const name = req.query.name as string | undefined
  const rating = req.query.rating ? Number(req.query.rating) : undefined
  try {
    const searchResults = await db.searchTools({ name, rating })
    if (searchResults.length > 0) {
      res.status(StatusCodes.OK).json(searchResults)
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No tools found matching the criteria' })
    }
  } catch (error) {
    console.error('Error searching for tools:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error searching for tools' })
  }
})

//Add a new user
router.post('/', async (req, res) => {
  const newUser = req.body
  console.log('the server side is working too', newUser)

  try {
    await db_users.addUser(newUser)
    res.sendStatus(200)
  } catch (error) {
    console.log('add user error')
    res.sendStatus(500)
  }
})

// Get user by auth_id
router.get('/api/v1/users/:auth_id', async (req, res) => {
  const { auth_id } = req.params
  const user = await db_users.getUserByAuthId(auth_id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

export default router

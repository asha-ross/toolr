//TODO: implement API routes for tools
//This file should define the following routes:
//- GET /api/v1/tools (get all tools)
// -GET /api/v1/tools/:id (get a specific tool by id)
// - POST /api/v1/tools (add a new tool)
// - PUT /api/v1/tools/:id (update an existing tool)
// - DELETE /api/v1/tools/:id (delete a tool)
// - GET /api/v1/tools/search (search for tools based on criteria)

import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/functions/tools.ts'

const router = Router()

//TODO: GET /api/v1/tools
//Returns all tools, potentially with pagination?
router.get('/', async (req, res) => {
  try {
    const tools = await db.getAllToolsDB()

    res.json({ tools: tools.map((tool) => tool.name) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//TODO: GET /api/v1/tools/:id
//Returns a specific tool by id
router.get('/:id', async (req, res, next) => {
  try {
    const tool = await db.getToolByIdDB(req.params.id)
    res.json(tool)
  } catch (err) {
    next(err)
  }
})

//TODO: POST /api/v1/tools
//Add a new tool
router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const { owner, name } = req.body
    const id = await db.addTool({ owner, name })
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

//TODO: PUT /api/v1/tools/:id
//Update an existing tool
router.put('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  const { id } = req.params
  try {
      const updatedTool = await updateTool(Number(id), req.body)
      if (updatedTool) {
          res.status(StatusCodes.OK).json(updatedTool)
      } else {
          res.status(StatusCodes.NOT_FOUND).json({ message: 'Tool not found' })
      }
  } catch (error) {
      console.error(`Error updating tool with ID ${id}:`, error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating tool' })
  }
})

//TODO: DELETE /api/v1/tools/:id
//Delete a tool

router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  const { id } = req.params
  try {
      await deleteTool(Number(id))
      res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
      console.error(`Error deleting tool with ID ${id}:`, error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting tool' })
  }
})

//TODO: GET /api/v1/tools/search
//Search for tools based on various criteria
router.get('/search', async (req, res) => {
  const { name, location, rating, availability } = req.query
    try {
        const searchResults = await searchTools({ name, location, rating, availability })
        if (searchResults.length > 0) {
            res.status(StatusCodes.OK).json(searchResults)
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'No tools found matching the criteria' })
        }
    } catch (error) {
        console.error("Error searching for tools:", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error searching for tools' })
    }
})

export default router

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

import * as db from '../db/tools.ts'

const router = Router()

//TODO: GET /api/v1/tools
//Returns all tools, potentially with pagination?
router.get('/', async (req, res) => {
  try {
    const tools = await db.getAllTools()

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
    const tool = await db.getToolById(req.params.id)
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
router.put('/:id', checkJwt, async (req: JwtRequest, res, next) => {})

//TODO: DELETE /api/v1/tools/:id
//Delete a tool

router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {})

//TODO: GET /api/v1/tools/search
//Search for tools based on various criteria
router.get('/search', async (req, res) => {})

export default router

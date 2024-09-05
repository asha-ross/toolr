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

const router = Router()

//TODO: GET /api/v1/tools
//Returns all tools, potentially with pagination?
router.get('/', async (req, res) => {
  try {
    const tools = await db.getAllToolsDB()

    res.json(tools)
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
// router.post('/', async (req, res, next) => {

//     res.sendStatus(StatusCodes.UNAUTHORIZED)


//   try {
//     const { owner, name } = req.body
//     const id = await db.addTool({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

//TODO: PUT /api/v1/tools/:id
//Update an existing tool
// router.put('/:id', checkJwt, async (req: JwtRequest, res, next) => {})

//TODO: DELETE /api/v1/tools/:id
//Delete a tool

// router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {})

//TODO: GET /api/v1/tools/search
//Search for tools based on various criteria
// router.get('/search', async (req, res) => {})

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
router.get('/api/users/:auth_id', async (req, res) => {
  const { auth_id } = req.params;
  const user = await db_users.getUserByAuthId(auth_id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



export default router

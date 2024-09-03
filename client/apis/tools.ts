//Tool Api:
//This should request access to all the tools listed on profiles, stored in the database table "tools"
//rootUrl will be something like '/api/v1/tools'?
//import models/interfaces for tools, users etc

import request from 'superagent'

const rootUrl = '/api/v1'

export function getTools(): Promise<Tool[]> {
  return request.get(rootUrl + '/tools').then((res) => {
    return res.body.tools
  })
}

// TODO: add addTool function
export function addTool(tool: NewTool): Promise<Tool> {
  // Use request.post() to send a POST request to rootUrl
  // Return the newly created tool from the response
}

// TODO: add editTool function
export function editTool(id: number, updates: Partial<Tool>): Promise<Tool> {
  // Use request.patch() or request.put() to send a PATCH/PUT request to `${rootUrl}/${id}`
  // Return the updated tool from the response
}

// TODO: add deleteTool function
export function deleteTool(id: number): Promise<void> {
  // Use request.delete() to send a DELETE request to `${rootUrl}/${id}`
  // Return success message "tool deleted"
}

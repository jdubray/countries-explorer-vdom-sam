import createActions from './actions'
import createState from './state'
import model, { Proposals } from './model'


let initialized=false


export const provide=()=>{
  let actions
  let state
  if(!initialized){
    actions = createActions(model.receive.bind(model), Proposals)
    state = createState(actions)
    model.state = state
    initialized=true
  }
  return {state, actions}
}


export default provide()
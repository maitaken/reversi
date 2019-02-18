import { githubUrl } from "builder-util-runtime";

const state = {
  field:[],
  order:false
}

let nextGrid = (grid,way) => {
  let [y,x] = grid
  switch(way) {
    case 'up':
      y--;
      break
    case 'down':
      y++;
      break
    case 'left':
      x--;
      break
    case 'right':
      x++;
      break
    case 'left-up':
      x--;y--;
      break
    case 'right-up':
      x++;y--;
      break
    case 'left-down':
      x--;y++;
      break
    case 'right-down':
      x++;y++;
      break
    default:
      console.log(way)
      break
  }
  return [y,x]
}

const mutations = {
  INIT_GAME (state) {
    let field = []
    for(let i = 0;i < 8;i++){
      let row = []
      for(let j = 0;j < 8;j++){
        row.push({
          'state':"none",
          'ableFlip':true
        })
      }
      field.push(row)
    }
    field[3][3]['state'] = "white"
    field[4][4]['state'] = "white"
    field[3][4]['state'] = "black"
    field[4][3]['state'] = "black"
    
    state.field = field
  },
  CHANGE_PLAYER (state) {
    state.order = !state.order
  },
  FLIP_STONE (state,{grid,way}) {
    const playerColor = (state.order) ? 'black' : 'white'
  
    let flipStone = (grid) => {
      let [y,x] = grid

      console.log(grid)
      console.log(grid.includes(-1,8))

      if(grid.includes(-1) || grid.includes(8) || state.field[y][x].state == 'none'){
        return false
      }
      else if(state.field[y][x].state != playerColor){

        if(flipStone(nextGrid(grid,way))){
          state.field[y][x].state = playerColor
          return true
        }
      }
      else{
        return true
      }
    }
    flipStone(grid)
  },
  PUT_STONE(state,grid) {
    state.field[grid[0]][grid[1]].state = (state.order) ? 'black' : 'white'
  }
}

const actions = {
  initGame ({ commit }) {
    commit('INIT_GAME')
  },
  changePlayer({ commit }) {
    commit('CHANGE_PLAYER')
  },
  putStone ({ commit }, grid) {
    commit('PUT_STONE',grid)

    for(let way of ['up','down','left','right','left-up','right-up','left-down','right-down']) {
      commit({
        'type': 'FLIP_STONE',
        'grid':nextGrid(grid,way),
        'way':way
      })
    }

    commit('CHANGE_PLAYER')
  }
}

export default {
  state,
  mutations,
  actions
}

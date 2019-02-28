const WAYS = ['up','down','left','right','left-up','right-up','left-down','right-down']

const state = {
  field:[],
  gameInfo:{
    blackCount:0,
    whiteCount:0,
    order:false,
    isGameOver:false
  },
  putGridExits:true,
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
          'ableFlip':false
        })
      }
      field.push(row)
    }
    field[3][3]['state'] = "white"
    field[4][4]['state'] = "white"
    field[3][4]['state'] = "black"
    field[4][3]['state'] = "black"
    
    state.gameInfo.isGameOver = false
    state.field = field
  },
  CHANGE_PLAYER (state) {
    state.gameInfo.order = !state.gameInfo.order
    console.log(state)
  },
  FLIP_STONE (state,{grid,way}) {
    const playerColor = (state.gameInfo.order) ? 'black' : 'white'
  
    let flipStone = (grid) => {
      let [y,x] = grid

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
    state.field[grid[0]][grid[1]].state = (state.gameInfo.order) ? 'black' : 'white'
  },
  SET_ABLE_FLIP(state) {
    const playerColor = (state.gameInfo.order) ? 'black' : 'white'

    let exitAnotherStone = (grid) => {
      
      let wayStoneExists = (grid,way,flag) => {
        let [y,x] = grid

        if(grid.includes(-1) || grid.includes(8) || state.field[y][x].state == 'none') {
          return false
        }
        else if(flag){
          if(state.field[y][x].state != playerColor){
            return wayStoneExists(nextGrid(grid,way),way,flag)
          }
          else{
            return true
          }
        }
        else{
          if(state.field[y][x].state != playerColor){
            return wayStoneExists(nextGrid(grid,way),way,true)
          }
          else{
            return false
          }
        }
      }

      for(let way of WAYS){
        if(wayStoneExists(nextGrid(grid,way),way,false)) {
          return true
        }
      }
      return false
    }

    let blackCount = 0,whiteCount = 0
    state.putGridExits = false

    state.field.forEach((row,y)=>{
      row.forEach((cell,x) => {

        if(cell.state != "none"){
          if(cell.state == "black") blackCount +=1
          else whiteCount += 1
          return
        }

        let ablePut = exitAnotherStone([y,x])
        cell.ableFlip = (ablePut) ? true : false
        if(ablePut) state.putGridExits = true
      })
    })

    state.gameInfo.blackCount = blackCount
    state.gameInfo.whiteCount = whiteCount
  },
  GAMEOVER(state) {
    state.gameInfo.isGameOver = true
  }
}

const actions = {
  initGame ({ commit }) {
    commit('INIT_GAME')
    commit('SET_ABLE_FLIP')
  },
  putStone ({state, commit }, grid) {
    commit('PUT_STONE',grid)

    for(let way of WAYS) {
      commit({
        'type': 'FLIP_STONE',
        'grid':nextGrid(grid,way),
        'way':way
      })
    }
    commit('CHANGE_PLAYER')
    commit('SET_ABLE_FLIP')

    console.log(state.putGridExits)

    if(!state.putGridExits) {
      commit('CHANGE_PLAYER')     
      commit('SET_ABLE_FLIP')
    }
    if(!state.putGridExits) {
      commit('GAMEOVER')
    }

  }
}

export default {
  state,
  mutations,
  actions
}

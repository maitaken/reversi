const state = {
  field:[],
  order:false
}

const mutations = {
  INIT_GAME (state) {
    console.log(11)
    let field = []
    for(let i = 0;i < 8;i++){
      let row = []
      for(let j = 0;j < 8;j++){
        row.push({
          'state':"none"
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
  }
}

const actions = {
  initGame ({ commit }) {
    commit('INIT_GAME')
  },
  changePlayer({ commit }) {
    commit('CHANGE_PLAYER')
  }
}

export default {
  state,
  mutations,
  actions
}

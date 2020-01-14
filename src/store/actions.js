import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shunffle} from 'common/js/util'


function findIndex(list,song){
    return list.findIndex((item) =>{
        return item.id === song.id
    })
}


export const selectPlay = function({commit,state},{list,index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if(state.mode === playMode.random){
        let randomList = shunffle(list)   
        commit(types.SET_PLAY_LIST, randomList)
        index = findIndex(randomList, list[index])
    }else{
        commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE,true)

}

export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_PLAY_LIST, list)
    let randomList = shunffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE,true)
}

export const insertSong = function({commit ,state}, song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    //记录下当前歌曲
    let currentSong = playlist[currentIndex] 

    //查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)

    //因为是插入歌曲，所以索引要加1
    currentIndex++
    //插入这首歌当当前索引位置
    playlist.splice(currentIndex, 0, song)

    //如果已经包含这首歌
    if(fpIndex > -1){
        //如果当前插入的序号大于之前列表中的序号
        if(currentIndex > fpIndex){
          playlist.splice(fpIndex, 1)
          currentIndex--
        }else{
            playlist.splice(findIndex+1 ,1)
        }
    }

    let currentSindex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSindex,0,song)

    if(fsIndex > -1){
        if(currentSindex > fsIndex){
            sequenceList.splice(fsIndex, 1)
        }else{
            sequenceList.splice(fsIndex+1, 1) 
        }
    }


    commit(types.SET_PLAY_LIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE ,true)
}
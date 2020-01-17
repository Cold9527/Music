import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shunffle} from 'common/js/util'

export const playlistMixin = {
    computed:{
        ...mapGetters([
            'playlist'
        ])
    },
    mounted(){
       this.handlePlaylist(this.playlist)  
    },
    activated(){
        this.handlePlaylist(this.playlist)  
    },
    watch:{
        playlist(newVal){
          this.handlePlaylist(newVal)  
        }
    },
    methods:{
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist methods')
        }
    }
}

export const playerMixin = {
    computed:{
        iconMode(){
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode ===
            playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playlist',
            'mode'
         ])          
    },
    methods: {
        changeMode(){
            const mode = (this.mode + 1) % 3
            this.setplaymode(mode) 
            let list = null
            if(mode === playMode.random){
               list = shunffle(this.sequenceList)
            }else{
              list = this.sequenceList
            }
            this._resetCurrentIndex(list)
            this.setplaylist(list)
        },
        _resetCurrentIndex(list){
            let index = list.findIndex((item) => {
              return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
            this.setPlayingState(true)
        },        
        ...mapMutations({
            setPlayingState:'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setplaymode:'SET_PLAY_MODE',
            setplaylist: 'SET_PLAY_LIST'
        })        
    }    
}

export const searchMixin = {
    data(){
        return {
            query:'',
        }
    },
    computed:{
        ...mapGetters([
            'searchHistory'
         ])
    
    },
    methods:{
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },        
        blurInput(){
            this.$refs.searchBox.blur()
         },
         saveSearch(){
            this.saveSearchHistory(this.query)
         },
         onQueryChange(query){
            this.query = query
         },
         ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
         ])   
    }
}
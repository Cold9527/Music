<template>
      <music-list :songs='songs' :title='title' :bgImage='bgImage'></music-list>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {getSongVkey} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
   name:'SingerDetail',
   data() {
      return {
        songs:[]
      }
   },
   computed:{
     title(){
       return this.singer.name
     },
     bgImage(){
       return this.singer.avatar
     },
     ...mapGetters([
        'singer'
     ])

   },
   components:{
     MusicList
   },
   created(){
     this._getDetail()
     
   },
   methods:{
     _getDetail(){
        if(!this.singer.id){
          this.$router.push('/singer')
      }      
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK){
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
      
     },
     _normalizeSongs(list) {
       let ret = []
       list.forEach((item) => {
         let {musicData} = item
         getSongVkey(musicData.songmid).then((res) => {
              const vkey = res.req_0.data.midurlinfo[0].purl;
             if(vkey){
                ret.push(createSong(musicData, vkey))   
             }     
         })
       })
       return ret
     }
   }

}
</script>

<style lang="stylus" scoped>
</style>

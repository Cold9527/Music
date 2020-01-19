<template>
        <music-list :rank='rank' :songs='songs' :title='title' :bgImage ='bgImage'></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongVkey} from 'api/singer'

export default {
   data() {
      return {
          songs:[],
          rank:true
      }
   },
   computed:{
       title(){
        return this.topList.topTitle 
       },
       bgImage(){
        if(this.songs.length){
            return this.songs[0].image
        }else{
            return this.topList.picUrl 
        }        
       },
       ...mapGetters([
           'topList'
       ])
   },   
   created(){
        this._getMusicList()
   },
   methods:{
       _getMusicList(){
           if(!this.topList.id){
               this.$router.back()
           }
           getMusicList(this.topList.id).then((res) => {
               if(res.code === ERR_OK){
                   this.songs = this._normalizeSongs(res.songlist)                           
               }
           })
       },
       _normalizeSongs(list){
           let ret = []
           list.forEach((item) => {
                let musicData = item.data
                getSongVkey(musicData.songmid).then((res) => {
                    const vkey = res.req_0.data.midurlinfo[0].purl;
                    if(vkey){
                        ret.push(createSong(musicData, vkey))   
                    }     
                })           
           })
           return ret
       }
   },
   components:{
      MusicList
   }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

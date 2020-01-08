<template>
    <music-list :songs='songs' :title ='title' :bgImage = 'bgImage'></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createDsic} from 'common/js/song'
import {getSongVkey} from 'api/singer'

export default {
   name:'',
   data() {
      return {
          songs:[]
      }
   },
   computed:{
       title(){
          return this.dsic.dissname
       },
       bgImage(){
           return this.dsic.imgurl
       },
       ...mapGetters([
           'dsic'
       ])
   },
   created(){
       this._getSongList()
   },
   methods:{
       _getSongList(){
           if(!this.dsic.dissid){
               this.$router.back()
           }
           getSongList(this.dsic.dissid).then((res) => {
               if(res.code === ERR_OK){
                   this.songs = this._normalizeSongs(res.cdlist[0].songlist)
               }
           })
       },
       _normalizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let DsicList = item
                getSongVkey(DsicList.mid).then((res) => {
                    const vkey = res.req_0.data.midurlinfo[0].purl;
                    if(vkey){
                        ret.push(createDsic(DsicList, vkey))   
                    }     
                })
            })
            return ret
       }
   },
   components:{
     MusicList,
   }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

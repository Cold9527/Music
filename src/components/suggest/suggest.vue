<template>
    <Scroll class='suggest' 
            :data='result' 
            :pullup = 'pullup'
            @scrollToEnd = 'searchMore'
            ref='suggest'>
        <ul class='suggest-list'>
            <li class='suggest-item' 
                v-for="item of result" 
                :key="item.index"
                @click="selectItem(item)">
                <div class='icon'>
                    <i :class='getIconCls(item)'></i>
                </div>
                <div class='name'>
                    <p class='text' v-html='getDisplayName(item)'></p>
                </div>
            </li>
            <loading v-show = 'hasMore' title=''></loading>
            <!-- <div v-show ='!hasMore'>没有更多了</div> -->
        </ul>
    </Scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongVkey} from 'api/singer'
import Scroll from 'base/srcoll/srcoll'
import loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20
export default {
   name:'',
   props:{
       query:{
           type:String,
           default:''
       },
       showSinger:{
           type:Boolean,
           default:true
       }
   },
   data() {
      return {
          page:1,
          result:[],
          vkey:[],
          pullup:true,
          hasMore:true
      }
   },
   methods:{
       selectItem(item){
           if(item.type === TYPE_SINGER){
               const singer = new Singer({
                   id:item.singermid,
                   name:item.singername
               })
               this.$router.push({
                   path:`/search/${singer.id}`,
               })
               this.setSinger(singer)  
           }
       },
       search(){
           this.page = 1
           this.hasMore = true
           this.$refs.suggest.scrollTo(0,0)
           search(this.query, this.page, this.showSinger, perpage).then((res)=>{
               if(res.code === ERR_OK){
                   this.result = this._getResult(res.data);
                   this._checkMore(res.data)
               }
           })
       },
       searchMore(){
           if(!this.hasMore){
               return
           }
           this.page++
           search(this.query, this.page, this.showSinger, perpage).then(res =>{
               if(res.code === ERR_OK){
                   this.result =this.result.concat( this._getResult(res.data))
                   this._checkMore(res.data)
               }             
           })
       },
       getIconCls(item){
           if(item.type === TYPE_SINGER){
               return 'icon-mine'
           }else{
                return 'icon-music'
           }
       },
       getDisplayName(item){
           if(item.type === TYPE_SINGER){
               return item.singername
           }else{
               return `${item.name}-${item.singer}`
           }
       },
       _checkMore(data){
           const song = data.song
           if(!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum){
               this.hasMore = false
           }
       },
       _getResult(data){
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
       },
       _normalizeSongs(list){
            let ret = []
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albummid) {
                    getSongVkey(musicData.songmid).then((res) => {
                        this.vkey = res.req_0.data.midurlinfo[0].purl; 
                    })
                    if(this.vkey){
                         ret.push(createSong(musicData, this.vkey))   
                    }
                    
                }               
            })
            return ret
       },
       ...mapMutations({
           setSinger:'SET_SINGER'
       })
   },
   watch:{
       query(){
           this.search()
       }
   },
   components:{
       Scroll,
       loading
   }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

<template>
    <Scroll class='suggest' 
            :data='result' 
            :pullup = 'pullup'
            @scrollToEnd = 'searchMore'
            :beforeScroll = 'beforeScroll'
            ref='suggest'
            @beforeScroll = 'listScroll'>
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
        <div class='no-result-wrapper' v-show='!hasMore && !result.length'>
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
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
import { mapMutations, mapActions } from 'vuex'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 1000
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
          pullup:true,
          hasMore:true,
          beforeScroll:true
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
           }else{
               this.insertSong(item)
           }
           
           this.$emit('select')
       },
       search(){
           this.page = 1
           this.hasMore = true
           this.$refs.suggest.scrollTo(0,0)
           search(this.query, this.page, this.showSinger, perpage).then((res)=>{
               if(res.code === ERR_OK){
                    this.result = this._normalizeSongs(res.data.song.list)
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
                    this.result = this.result.concat(this._normalizeSongs(res.data.song.list))           
                    this._checkMore(res.data)
               }             
           })
       },
       listScroll(){
           this.$emit("listScroll")
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
    //    _getResult(data){
    //         let ret = []
    //         if (data.zhida && data.zhida.singerid) {
    //             ret.push({...data.zhida, ...{type: TYPE_SINGER}})
    //         }            
    //         if (data.song) {
    //             ret = ret.concat(this._normalizeSongs(data.song.list)) 
    //         }            
    //         return ret
    //    },
       _normalizeSongs(list){
            let ret = []
            list.forEach((songlist) => {                           
                getSongVkey(songlist.songmid).then((res) => {
                    const vkey = res.req_0.data.midurlinfo[0].purl;
                    if(vkey){
                        ret.push(createSong(songlist, vkey))   
                    }   
                })            
            })
            return ret
      },    
       refresh(){
           this.$refs.suggest.refresh()
       },
       ...mapMutations({
           setSinger:'SET_SINGER'
       }),
       ...mapActions([
           'insertSong'
       ])
   },
   watch:{
       query(){
           this.search()
       }
   },
   components:{
       Scroll,
       loading,
       NoResult
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

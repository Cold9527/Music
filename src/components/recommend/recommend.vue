<template>
    <div class="recommend" ref='recommend'>
       <srcoll class="recommend-content" tag='div' :data='discList' ref='scroll'>
          <div>
              <div v-if="recommends.length" class="slider-wrapper">    
                <slider>
                    <div v-for="item of recommends" :key='item.index'>
                        <a :href="'https://y.qq.com/n/yqq/album/'+item.jump_info.url+'.html'">
                          <img class='needsclick' :src="item.pic_info.url" @load="loadImage"/>
                        </a>
                    </div>             
                </slider>       

              </div>
              <div class="recommend-list">
                  <h1 class="list-title">热门歌单推荐</h1>
                  <ul>
                    <li @click='selectItem(item)' v-for='item of discList' :key='item.index' class='item'>
                      <div class="icon">
                        <img v-lazy="item.imgurl" width="60" height="60"/>
                      </div>
                      <div class="text">
                        <h2 class='name' v-html='item.creator.name'></h2>
                        <p class='desc' v-html='item.dissname'></p>
                      </div>
                    </li>    
                  </ul>
              </div>
          </div>
          <div class='loading-container' v-show='!discList.length'>
            <Loading></Loading>
          </div>
       </srcoll> 
       <transition name='slide'>
          <router-view/>
       </transition>
    </div>
</template>

<script>
import Loading from "base/loading/loading"
import srcoll from "base/srcoll/srcoll.vue"
import slider from "base/slider/slider"
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'


export default {
   mixins:[playlistMixin],
   name:'Recommend',
   data() {
      return {
         recommends: [],
         discList:[]
      }
   },
   components:{
     slider,
     srcoll,
     Loading
   },
   mounted(){
      this._getRecommend() 
      this._getDiscList()
   }, 
   methods:{
      _getRecommend(){
         getRecommend().then((res) => {
           this.$nextTick(() => {
              if(res){
                this.recommends = res
              }   
           })
         })
      },
      _getDiscList(){
          getDiscList().then((res) => {
              if(res){
                this.discList =res.data.list               
           }
         })
      },
      loadImage(){
        if(!this.checkLoaded){
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }       
      },
      selectItem(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        this.setDsic(item)
      },
      handlePlaylist(playlist){
          const bottom = playlist.length > 0 ? '60px' : ''
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
      },
      ...mapMutations({
          setDsic : 'SET_DSIC'
      })
   }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  .slide-enter-active, .slide-leave-active
      transition: all 0.3s
  .slide-enter, .slide-leave-to
      transform:translate3d(100%, 0, 0)       
</style>

<template>
    <div class='search'>
       <div class='search-box-wrapper'>
          <search-box></search-box>
       </div>
    </div>
</template>

<script>
import  SearchBox from 'base/search-box/search-box'

export default {
   name:'Search',
   data() {
      return {
      }
   },
   components:{
      SearchBox
   }

}
</script>

<style>

</style>

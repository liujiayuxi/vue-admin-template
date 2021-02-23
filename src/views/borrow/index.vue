<!--
 * @Author: your name
 * @Date: 2021-02-08 16:53:48
 * @LastEditTime: 2021-02-22 10:45:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\borrow\index.vue
-->
<template>
  <div class="borrow-container">
    <search-input v-on:search="search" placeholder="请输入图书关键字"></search-input>
  </div>
</template>

<script>
import searchInput from '@/components/search-input.vue'
export default {
  components: { searchInput },

  data() {
    return {
      searchValue: ''
    }
  },
  watch: {

  },

  methods: {
    search(v) {
        this.searchValue = v;
        console.log(this.searchValue);
        // this.handleCurrentChange(1);
        // this.showList = this.contactList.filter(item => item.name.match(searchValue));
   },
  }
}
</script>


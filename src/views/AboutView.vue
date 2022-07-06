<template>
  <div id="app">
    <h1>示例：前后端交互</h1>
    
    <el-table :data="itemList" stripe style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="categoryName" label="商品种类名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      itemList: []
    }
  },
  created() {
    this.fetchItem()
  },
  methods: {
    fetchItem() {
      let that = this
      this.axios.get("/api/item/selectAll")
        .then(function (res) {
          console.log(res.data.data)
          that.itemList = res.data.data
        })
    }
  }
}


</script>
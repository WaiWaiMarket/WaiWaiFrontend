<template>
  <div id="app">
    <h1>示例：前后端交互</h1>
    
    <el-table :data="itemList" stripe style="width: 100%">
      <el-table-column prop="goodsid" label="商品id" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goodsprice" label="商品价格">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      itemList: [],
    }
  },
  created() {
    this.fetchItem()
  },
  methods: {
    fetchItem() {
      //http://localhost:9002/good/selectAllByPage?pageNum=1&pageSize=2
      request.get("/api/good/selectAllByPage?pageNum=1&pageSize=2")
        .then(res => {
                console.log(res);
                this.itemList = res.data.records;
          })
    }
  }
}


</script>
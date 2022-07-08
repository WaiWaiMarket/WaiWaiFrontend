<template>
  <div id="app">
    <h1>关于我们</h1>
    <span>
    </span>
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
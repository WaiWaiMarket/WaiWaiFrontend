<template>

    <el-menu text-color="#2d2d2d" id="navid" class="nav" mode="horizontal"  router>
        <el-menu-item class="logo" index="0" route="/">
            <img class="logoimg" src="@/assets/waiwailogo.png" height="56px" alt="logo">
        </el-menu-item>
        <el-menu-item :key="key" v-for="(item, key) in leftNavItems" :index="item.index" :route="item.indexPath">
            {{ item.name }}</el-menu-item>
        <el-submenu style="float:right;" class="right-item"
            v-if="Object.keys(rightNavItems).length === 0 ? false : true" index="10">
            <template slot="title">
                <i class="el-icon-s-fold" style="font-size:28px;color:#2d2d2d;"></i>
            </template>
            <el-menu-item :key="key" v-for="(item, key) in rightNavItems" :index="item.index" :route="item.indexPath">
                {{ item.name }}</el-menu-item>
        </el-submenu>
    </el-menu>


</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            navItems: [
                { name: "首页", indexPath: "/", index: "1" },
                { name: "关于", indexPath: "/about", index: "2" },
                { name: "用户信息", indexPath: "/userinfo", index: "3"},
            ],
            screenWidth: document.body.clientWidth,
        };
    },
    mounted() {
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth
        }
    },
    methods: {

    },
    watch: {
        screenWidth(newValue) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if (!this.timer) {
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = newValue;
                this.timer = true;
                setTimeout(() => {
                    //console.log(this.screenWidth);
                    this.timer = false;
                }, 400);
            }
        }
    },
    computed: {
        leftNavItems: function () {
            return this.screenWidth >= 600 ? this.navItems : {};
        },
        rightNavItems: function () {
            return this.screenWidth < 600 ? this.navItems : {};
        }
    }
}
</script>

<style>
a {
    text-decoration: none
}
</style>
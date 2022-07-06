<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-main">
                <h4>© 2022 WaiWaiMarker</h4>
                <!--<h4>友情链接</h4>
                <a href="https://www.sdu.edu.cn" target="_blank" class="footer-main-link">山东大学</a>
                <a href="https://www.wh.sdu.edu.cn" target="_blank" class="footer-main-link">山东大学威海</a>-->
            </div>
        </div>
    </footer>
</template>

<style>
.footer {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    background-color: #f7fbfd;
    width: 100%;
    padding: 20px 150px;
    box-sizing: border-box;
    height: auto;
}

.footer .container {
    box-sizing: border-box;
    width: auto;
}

.footer .footer-main {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
}

.footer .footer-main-link {
    display: inline-grid;
    margin: 0;
    line-height: 2;
    font-size: 14px;
    color: #666;
    padding-left: 10px;
}

.footer .container h4 {
    font-size: 18px;
    color: #333;
    line-height: 1;
    margin: 0 0 15px;
}

</style>
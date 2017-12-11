<template>
    <div class="sidebar-shrink">
        <Menu :active-name="$route.name" @on-select="changeMenu"  accordion>
            <template v-for="(item,index) in menuList">
                <MenuItem v-if="item.children.length<=1"  :key="item.path"  :name="item.children[0].name">
                    <Icon :type="item.icon" size='14' :key="item.path"></Icon>
                    <span class="layout-text" v-show="!timershow" :key="item.path">{{ item.title }}</span>
                </MenuItem>
                <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
                    <template slot="title">
                        <Icon :type="item.icon" size='14'></Icon>
                        <span class="layout-text" v-show="!timershow">{{ item.title }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="child.name">
                            <Icon :type="child.icon" size="14" :key="child.name"></Icon>
                            <span class="layout-text" v-show="!timershow" :key="child.name">{{ child.title }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookies from 'js-cookie';
export default {
   data(){
        return{
        }
    },
    name: 'sidebarMenu',
    props:[
        'hideMenuText',
        // 'menuList',
        'timershow'
        // 'pageOpenedList'
    ],  
    watch:{
        '$route' (to) {
            this.$store.commit('current_page_name', to.name);
        }
    },
    beforeCreate(){
        
    },
    computed:mapState(['menuList','pageOpenedList','todos','current_page_name','count']),
    methods:{
        changeMenu(active){
            if (Cookies.get('cachePage')) {
                let page_count = [];
                page_count = Cookies.get('cachePage');
                page_count=JSON.parse(page_count);
                if (page_count.indexOf(active) == -1) {
                    page_count.unshift(active);
                }
                Cookies.set('cachePage', page_count, { expires: 7 });
            }else{
                let page_count = [];
                page_count.unshift(active);
                Cookies.set('cachePage', page_count, { expires: 7 });
            }
            for (let i = 0; i < this.menuList.length; i++) {
                if (active == this.menuList[i].children[0].name && this.menuList[i].children.length == 1) {
                    let children =  this.menuList[i].children[0];
                    console.log(this.pageOpenedList.indexOf(children))
                    if (JSON.stringify(this.pageOpenedList).indexOf(JSON.stringify(children)) == -1) {
                        this.pageOpenedList.push(children);
                    }
                }else if(this.menuList[i].children.length !=1) {
                    for(let j = 0;j < this.menuList[i].children.length;j++){
                        if(active == this.menuList[i].children[j].name){
                            let children =  this.menuList[i].children[j];
                            console.log(children)
                            console.log(this.pageOpenedList.indexOf(children))
                            if(JSON.stringify(this.pageOpenedList).indexOf(JSON.stringify(children)) == -1){
                                this.pageOpenedList.push(children);
                            }
                            
                        }
                    }
                }
            }
            this.$store.commit('count', 9);
            this.$store.commit('pageOpenedList', this.pageOpenedList);
            this.$router.push({
                name: active
            });
        }
   }

};
</script>
<style type="text/css">
.sidebar-shrink ul{
    width: 100%!important;
}
</style>
<style scoped lang="less">
.sidebar-shrink{
    // background: #495060;
    ul{
        position: static;
        // background: #495060;
        color: #fff;
        width: 100%;
    }
    .ivu-menu-item{
        color: #fff;
    }
}

</style>

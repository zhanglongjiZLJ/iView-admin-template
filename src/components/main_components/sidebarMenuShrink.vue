<template>
    <div class="sidebarsharink">
         <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" color="#fff"  :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ child.title }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button  style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" color="#fff"  :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.title }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookies from 'js-cookie';
export default {
   data(){
    return{
        select_menu:true,
    }
   },
   props:[
        // 'hideMenuText',
        // 'menuList',
        // 'pageOpenedList'
    ], 
   computed:{

   },
   watch:{
        '$route' (to) {
            this.$store.commit('current_page_name', to.name);
        }
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
            this.$store.commit('count', 5);
            this.$store.commit('pageOpenedList', this.pageOpenedList);
            this.$router.push({
                name: active
            });
        }
   }

};
</script>
<style type="text/css">
.sidebar ul{
    width: 100%!important;
}
</style>
<style scoped lang="less">
.sidebarsharink{
    ul{
        position: static;
        color: #fff;
        width: 100%;
    }
}

</style>

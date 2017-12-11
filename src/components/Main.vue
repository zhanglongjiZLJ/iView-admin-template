<template>
    <div class="layout main-wrap"  :class="{'layout-hide-text': hideMenuText}">
      <Menu mode="horizontal"  active-name="1">
            <div class="layout-logo" v-if="!hideMenuText"  :style="{width: !hideMenuText?'200px':''}" style="font-size:30px">
              iView
            </div>
            <div class="layout-logo" v-else   :style="{width: hideMenuText?'60px':''}">
              iView
            </div>
            <div class="layout-header" :style="{left: hideMenuText?'60px':'200px'}">
                <Button type="text" @click="toggleClick">
                    <Icon :class="hideMenuText?'rotate-button0':'rotate-button90'"   type="navicon" size="32" color="#fff"></Icon>
                </Button>
            </div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Dropdown>
                        <Icon type="ios-person" size=20></Icon>个人中心
                        <DropdownMenu slot="list">
                            <DropdownItem>个人信息</DropdownItem>
                            <DropdownItem>切换账号</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </MenuItem>
                <MenuItem name="2" @click.native="exit">
                    <Icon type="android-exit" size=20></Icon>退出
                </MenuItem>
            </div>
        </Menu>
        <div class="layout-container">
            <div class="layout-menu-left" :style="{width: hideMenuText?'60px':'200px'}">
              <sidebar v-if="!hideMenuText" :hideMenuText="hideMenuText" :timershow = "timershow"></sidebar>
              <sidebarshrink v-else  :hideMenuText="hideMenuText"  ></sidebarshrink>
            </div>
            <div class="layout-right" :style="{left: hideMenuText?'60px':'200px'}">
                <tags></tags>
                <div class="layout-content">
                    <div class="layout-content-main">
                       <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import sidebar from './main_components/sidebarMenu'
import sidebarshrink from './main_components/sidebarMenuShrink'
import tags from './main_components/tags'
export default {
    data () {
        return {
          current_page_name: '',
          hideMenuText:false,
          timershow:false
        }
    },
    mounted(){
      if(location.hash.length > 7){
        this.current_page_name = location.hash.substr(7);
        for(let i = 0;i < this.menuList.length;i++){
          for(let j = 0;j < this.menuList[i].children.length;j++){
            if(this.menuList[i].children[j].name == this.current_page_name){
              this.pageOpenedList.push({
                icon: this.menuList[i].children[j].icon,
                name:this.current_page_name,
                path:"/main/"+this.current_page_name,
                title:this.menuList[i].children[j].title
              });
            }
          }
        }
        this.$store.commit('current_page_name', this.current_page_name);
        this.$store.commit('pageOpenedList', this.pageOpenedList);
        console.log(this.pageOpenedList)
      }
    },
    // computed: {
    //     menuList () {
    //         return this.$store.state.menuList;
    //     },
    //     pageOpenedList(){
    //       return this.$store.state.pageOpenedList;
    //     }
    // },
    computed:mapState(['menuList','pageOpenedList','todos']),
    // computed:mapState({
    //   menuList:state=>state.menuList,
    //   pageOpenedList:state=>state.pageOpenedList
    // }),




    watch:{
      pageOpenedList(val,ildVal){
        console.log(val)
      },
      hideMenuText(val, oldVal){
        var _this = this;
        if (_this.timershow == true) {
          setTimeout(function() {
            _this.timershow = _this.hideMenuText;
          }, 200);
        }else{
          _this.timershow = _this.hideMenuText;
        }
      }
    },
    methods: {
        toggleClick () {
            console.log(this.todos)
            this.hideMenuText = !this.hideMenuText;
        },
        exit(){
          this.$router.push({
              name: 'login'
          });
          this.$store.commit('pageOpenedList', this.pageOpenedList.splice(0,1));
        }
    },
    components:{sidebar,sidebarshrink,tags}
}
</script>
<style type="text/css">
.main-wrap .ivu-menu-horizontal .ivu-menu-item{
    padding: 0 10px!important;
}
.layout-hide-text .ivu-menu-submenu-title-icon{
  display: none;
} 
.layout-hide-text .ivu-menu-submenu{
  width: 60px;
}
.main-wrap .ivu-menu-light{
  background-color: transparent;
}
.main-wrap .ivu-menu-light:after{
  background: #213835;
}
.main-wrap .ivu-menu-horizontal:after{
  background: #213835;
}
.main-wrap .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
  background: linear-gradient(-45deg, #13465C 0%, #284A6D 100%)!important;
  opacity: .8;
}
.main-wrap .ivu-icon-ios-close-empty:before{
  color: #fff;
}

</style>
<style scoped lang="less">
.layout{
    position: relative;
    height: 100%;
    .layout-logo{
        width: 100px;
        height: 60px;
        float: left;
        position: relative;
        top: 0;
        text-align: center;
        color: #fff;
        white-space: nowrap;
        transition: width .2s ease-out;
    }
    .layout-header{
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        position: absolute;
        left: 200px;
        .rotate-button90{
          transform:rotate(0);
          -ms-transform:rotate(0);   /* IE 9 */
          -moz-transform:rotate(0);  /* Firefox */
          -webkit-transform:rotate(0); /* Safari 和 Chrome */
          -o-transform:rotate(0);  /* Opera */
          transition: all .2s ease-out;
        }
        .rotate-button0{
          transform:rotate(-90deg);
          -ms-transform:rotate(-90deg);   /* IE 9 */
          -moz-transform:rotate(-90deg);  /* Firefox */
          -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
          -o-transform:rotate(-90deg);  /* Opera */
          transition: all .2s ease-out;
        }
    }
    .layout-nav{
        width: 180px;
        float: right;
        .ivu-menu-item{
          color: #fff;
        }
        .ivu-menu-item-active,.ivu-menu-item:hover{
          border-bottom: none;
        }
    }
    .layout-container{
        position:absolute;
        top: 60px;
        left: 0;
        bottom: 0;
        width: 100%;
      }
      .layout-menu-left{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-right:1px solid #213835;
          transition: width .2s ease-out;
          .layout-text{
              white-space:nowrap;
          }
      }
      .layout-right{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        transition: left .2s ease-out;
        .layout-content{
            position: absolute;
            top: 41px;
            left: 0;
            right: 0;
            bottom: 0;
            min-height: 300px;
            margin: 15px;
            overflow: hidden;
            border-radius: 4px;
            overflow-y: auto;
            border: 1px solid #213835;
            .layout-content-main{
                padding: 10px;
                height: 100%;
                a{
                  color: #9ba7b5;
                }
            }
        }
      }
}

.layout .ivu-row-flex{
  height: 100%;
}
.ivu-col{
    transition: width .2s ease-out;
}
.main-wrap i{
  vertical-align: middle;
}
</style>
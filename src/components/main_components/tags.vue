<template>
   	<div class="layout-breadcrumb" >
	  <Tag type="dot" class="main-tag-dot" 
	   v-for="item in pageOpenedList"  
	   :key="item.name" 
	    :name="item.name" 
	   @on-close="closePage" 
	    @click.native="linkTo(item)"
	    :closable="item.name==='/main/home'?false:true"
	    :style="{color:(item.name==current_page_name)?'#2d8cf0!important':''}"
	   :color="item.name==current_page_name?'blue':'default'">{{ item.title }}</Tag>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data () {
		return {
		}
	},
	created(){
		console.log(this.current_page_name)
	},
	computed:mapState(['menuList','pageOpenedList','todos','current_page_name']),
	methods:{
	    closePage(event,name){
	        for(let i = 0;i < this.pageOpenedList.length;i++){    
	            if(this.pageOpenedList[i].name === name){
	              this.pageOpenedList.splice(i,1);
	            }
	        }
	        if (this.current_page_name === name) {
	            let lastPageName = '';
	            if (this.pageOpenedList.length > 1) {
	                lastPageName = this.pageOpenedList[1].name;
	            } else {
	                lastPageName = this.pageOpenedList[0].name;
	            }
	            this.$router.push({
	                name: lastPageName
	            });
	            this.$store.commit('current_page_name', lastPageName);
	      }
	    },

	    linkTo (item) {
	    	alert(111)
	        let routerObj = {};
	        routerObj.name = item.name;
	        if (item.argu) {
	            routerObj.params = item.argu;
	        }
	        if (item.query) {
	            routerObj.query = item.query;
	        }
	        this.$router.push(routerObj);
	        this.$store.commit('current_page_name', item.name);
	    }
	}

};
</script>

<style scoped lang="less">
.layout-breadcrumb{
    padding: 10px 15px;
    .main-tag-dot{
      background: linear-gradient(-45deg, #13465C 0%, #284A6D 100%)!important;
      color: #fff!important;
      border: none!important;
    }
}

</style>

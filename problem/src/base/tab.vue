<template>
    <div class="tabbox">
        <ul class="tab" >
            <li :style="{background: active==i?background:''}" :class="{active:active==i}" @click="tabclick(i)" v-for="(item,i) in tab" :key="i">{{item}}</li>
        </ul>
    </div>
</template>

<script>
	export default {
		props:['background','tab'],	
		data(){
			return {
                active:0
			}
		},
 		mounted(){
			console.log(this.tto)
         },		
         methods:{
             tabclick(i){
                 this.active=i
                 this.$parent.handleClick(i)
             }
         }
	}	
</script>

<style scoped="scoped" lang="less">
.tabbox{
    text-align: center;
	.tab{
        display: inline-block;
        cursor: pointer;
        border-radius:4px; 
        border: 1px solid #6666;
        li{
            width: 100px; 
            line-height: 40px;          
            display: inline-block;                      
            border-right:1px solid #6666;
        }
        li:last-child{
            border-right:none;
        }
        .active{
            color: white;
        }
	}   
}
</style>
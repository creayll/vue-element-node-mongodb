<template>
	<div class="solve">
		<table class="screen container">
			<tr v-for="(item,i) in tab" :key='i'>
				<!-- <th :class="{'active':trindex==-i&&tdindex==222}" @click="trindex=-i;tdindex=222" :style="{background:trindex==-i&&tdindex==222?color:''}">{{item.large}}</th> -->
				<th :class="{'active':trindex==-i&&tdindex==222}" @click="tabclick('large',item._id,i)" :style="{background:trindex==-i&&tdindex==222?color:''}">{{item.large}}</th>
				<td>
					<ul class="rightbox">
						<!-- <li v-for="(list,j) in item.small" :key='j' :class="{'active':tdindex==j&&trindex==i}" @click="tdindex=j;trindex=i" :style="{background:tdindex==j&&trindex==i?color:''}">{{list.name}}</li>						 -->
						<li v-for="(list,j) in item.small" :key='j' :class="{'active':tdindex==j&&trindex==i}" @click="tabclick('small',list._id,i,j)" :style="{background:tdindex==j&&trindex==i?color:''}">{{list.name}}</li>
					</ul>
				</td>
			</tr>
		</table>

		<eltitle title="待解决问题" :background='color' :more='true'/>

		<div class="content">
			<div class="container">
				<ul class="solt">
					<li @click="sort('all',0)">默认</li>
					<li @click="sort('time',timeisup)">时间<i :class="[timeisup==1 ? 'down' : 'up']" class="el-icon-bottom"></i></li>
					<li @click="sort('price',priceisup)">奖励金<i :class="[priceisup==1 ? 'down' : 'up']" class="el-icon-bottom"></i></li>
				</ul>
				<solvelist v-if="data" :background='color' :data='data'/>
				<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	import solvelist from 'base/solvelist'
	import eltitle from 'base/title'
	export default {
	  	data () {
		    return {
        trindex:222,
        tdindex:222,
				tab:null,
				data:null,
				size:0,
				allnum:0,
				timeisup:1,
				priceisup:1,
				query:{
					page:1,
					limit:4,
					type:'all',
					Lifting:0
				}
		    }
	    },
	   	methods:{
			tabclick(type,id,i,j){
				this.query.page=1
				if(type=='large'){
					this.trindex=-i;
					this.tdindex=222
				}else{
					this.tdindex=j;
					this.trindex=i
				}
				this.query.tabtype=type
				this.query.id=id
				this.init(this.query)
			},
			sort(type,Lifting){		// 排序
				this.query.page=1
				//有３重情况　　最后一种不用判断　　但是不能用三元表达式
				if(Lifting==1){
					Lifting=-1
				}else if(Lifting==-1){
					Lifting=1
				}

				if(type=='time'){
					this.timeisup=Lifting==1?1:-1
				}else if(type=='price'){
					this.priceisup=Lifting==1?1:-1
				}

				this.query.type=type
				this.query.Lifting=Lifting
				this.init(this.query)
			},
   			init(query){
				axios.post(this.https+'home/problem',query)
					.then((res)=>{
						console.log(res.data)
						var data=res.data.data
						this.size=res.data.size
						this.allnum=res.data.allnum
						var now = new Date().getTime()
						console.log(now)
						var data1=[]
						var data2=[]
						if(data.length>0){
							data.forEach(element => {
								console.log(element.timeplacement)
								if(element.timeplacement&&new Date(element.timeplacement).getTime()>=now){
									element.istimeplacement=true
									data1.push(element)
								}else{
									element.istimeplacement=false
									data2.push(element)
								}
								this.data=[...data1,...data2]
								console.log(this.data)
							});
						}else{
							this.data=data
						}
					})
					.catch(function(error){
						console.log(error);
					})
			},
			handleCurrentChange(page){
				this.query.page=page
				this.init(this.query)
			},
	   	},
 		mounted(){
			axios.get(this.https+'home/problem/Navigationread')
				.then((res)=>{
					console.log(res.data)
					this.tab=res.data.data
				})
				.catch(function(error){
					console.log(error);
				})
			this.init(this.query)
 		},
		computed: {
		  // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
		  	...mapState("themecolor",{
		   		color: state => state.color
			})
		},
		components: {
			eltitle,
			solvelist
		}
	}
</script>

<style scoped="scoped" lang="less">
	.solve{
		padding-top: 20px;
		background: white;
		padding-bottom: 20px;
		.content{
			margin-top:8px;
			.solt{
				li{
					display: inline-block;
					padding: 4px 10px;
					cursor: pointer;
					i{
						transition:all .5s;
					}
					.up{
						transform: rotateX(180deg)
					}
					.down{
						transform: rotateX(0deg)
					}
				}
			}
		}
		.screen{
			border: 1px solid gainsboro;
			line-height: 30px;
			border-collapse:collapse;
			td,th{
				border: 1px solid gainsboro;
			}
			th{
				text-align: center;
				font-weight:500;
				width: 90px;
				background: #f5f5f5;
				cursor: pointer;
			}
			.active{
                color: white;
			}
			.rightbox{
				display: inline-block;
				li{
					min-width: 70px;
					display: inline-block;
					cursor: pointer;
					text-align: center;
				}
			}
		}
	}
</style>


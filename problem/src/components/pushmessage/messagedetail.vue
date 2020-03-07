<template>
    <div class="messagedetail">
        <p class="title">{{data.title}}</p>
        <p class="time">{{$moment(data.creatAt).format('YYYY-MM-DD HH:mm')}}</p>
        <div class="content" v-html="data.content"></div>
    </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from "vuex";

export default {
    data(){
        return {
            data:JSON.parse(sessionStorage.getItem("messagedetail"))
        }
    },
    computed: {
        // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
        ...mapState("pushstore",{
            messgenum: state => state.messgenum
        })
    },	   
    mounted(){
        // if(!this.data.isread){
            var query = {
                _id:this.data._id
            }
            console.log()
            axios.post(this.https+'home/push/readMessagedetail',query)
                .then((res)=>{
                    console.log(res.data);   
                    this.$store.dispatch("pushstore/changereduce")	
                })
                .catch(function(error){
                    console.log(error);
                }) 	
        // }
    },
    methods:{

    }
}
</script>

<style scoped lang='less'>
    .messagedetail{
        padding: 10px;
        .title{
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0 2px;
        }
        .time{
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
        }
    }
</style>
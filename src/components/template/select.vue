<template>
  <div id="as-choice-questions-block" :class="pageSize== 'A3'?'as-choice-question-block-a3':'as-choice-question-block-a4'">
    <div class="as-cq-left-block">
      <div class="as-cq-v-h-loc-placeholder">
        <div></div>
      </div>
      <div class="as-cq-v-loc-block">
        <template v-for="(i,index) in leftGroup" >
          <div class="as-cq-v-group" :key="i._id">
            <div class="as-cq-v-c-num-placeholder">
              <div>&nbsp;</div>
            </div>
            <div class="as-cq-v-group-opt">
              <div v-for="(item,index2) in maxOpt[index]" :key="index2"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="as-cq-right-block">
      <div class="as-cq-h-loc-block">
        <div class="as-cq-h-group" v-for="(i,index) in groupSize" :key="index">
          <div v-for="(k,index2) in 5 " :key="index2" v-if="index *4+index2 +2 < qData.son.length"></div>
        </div>
      </div>
      <div class="as-cq-c-loc-block">
        <div class="as-cq-c-v-group" v-for="(vg,index) in chunk(qData.son,colSize)" :key="index">
          <div class="as-cq-c-group-q" v-for="(j,index2) in chunk(vg,5)" :key="index2">
            <div class="as-cq-c-group-q-opt" v-for="i in j" :qid="i.numEtyp" :key="i._id">
              <div class="as-cq-c-num">{{i.numEtyp}}</div>
              <div class="as-cq-c-group-opt">
                <div v-for="(k,index3) in i.optionCount" :key="index3">
                <span>{{optArr[index3]}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: "select-question",
  props:{
    qData:{
      required:true,
      type:Object
    },
    pageSize:{
      required:true,
      type:String
    }
  },
  data() {
    return {
      optArr :["A","B","C","D","E","F","G","H"],
      leftGroup:0,
      maxOpt:[],
      qCount:this.$props.qData.son.length,
      groupSize:4,
      colSize:20,
    };
  },
  created (){
    //根据当前页面类型 选择分组数量
    if(this.$props.pageSize == 'A3'){
      this.groupSize = 3;
      this.colSize= 15
    }
     //分组
    this.leftGroup = _.chunk(this.$props.qData.son,this.colSize).length;
    //选择题最多空数
    let arr =  _.chunk(this.$props.qData.son,this.colSize);
    arr.forEach((item,index)=>{
      this.maxOpt[index] = _.maxBy(item,'optionCount').optionCount;
    })
  },
  methods:{
    chunk (arr,num){
      return  _.chunk(arr,num);
    }
  }
  
};
</script>

<style scoped>
.as-choice-question-block-title {
  text-align: center;
  margin: 0.3cm 0cm 0.2cm 0cm;
}

.as-choice-question-block-a4 {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 0.5cm;
  margin-left: -0.22cm;
}
.as-choice-question-block-a3 {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: -0.708cm;
}
.as-cq-left-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.2cm;
}

/**纵向定位点区块**/

.as-cq-v-h-loc-placeholder {
  position: relative;
  margin-bottom: 0.2cm;
}

.as-cq-v-h-loc-placeholder div {
  position: relative;
  width: 0;
  height: 0;
  top: 0;
  right: 0cm;
  border-bottom: 0.254cm solid transparent;
  border-left: 0.508cm solid transparent;
}

.as-cq-v-c-num-placeholder {
  position: relative;
  width: 0.508cm;
  height: 0.254cm;
  top: 0;
  right: 0cm;
  font-size: 8pt;
  margin: 0.2cm 0cm;
  text-align: center;
}

.as-cq-v-loc-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 0.02cm white solid;
  border-bottom: 0.02cm white solid;
}

.as-cq-v-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.2cm 0cm;
}

.as-cq-v-group-opt {
  display: flex;
  flex-direction: column;
}

.as-cq-v-group-opt div {
  position: relative;
  width: 0;
  height: 0;
  top: 0;
  right: 0cm;
  border-bottom: 0.254cm solid black;
  border-left: 0.508cm solid black;
  margin-top: 0.07cm;
  margin-bottom: 0.07cm;
}

.as-cq-right-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/**题号定位点**/

.as-cq-h-loc-block {
  display: flex;
  flex-direction: row;
  margin-left: 0.02cm;
  margin-bottom: 0.2cm;
}

.as-cq-h-group {
  display: flex;
  flex-direction: row;
  margin-left: 0.3cm;
  margin-right: 0.3cm;
}

.as-cq-h-group div {
  position: relative;
  width: 0;
  height: 0;
  top: 0;
  right: 0cm;
  border-bottom: 0.254cm solid black;
  border-left: 0.508cm solid black;
  margin-left: 0.1cm;
  margin-right: 0.1cm;
}

/**选择题题目选项区块**/

.as-cq-c-loc-block {
  display: flex;
  flex-direction: column;
  border: 0.02cm black solid;
}

/**题号**/

.as-cq-c-group-num-block {
  display: flex;
  flex-direction: row;
}

.as-cq-c-group-num {
  display: flex;
  flex-direction: row;
  margin-left: 0.4cm;
  margin-right: 0.4cm;
  align-items: center;
  margin-top: 0.2cm;
  margin-bottom: 0.2cm;
}

.as-cq-c-group-num div {
  position: relative;
  width: 0.508cm;
  height: 0.254cm;
  top: 0;
  right: 0cm;
  font-size: 8pt;

  margin-left: 0.1cm;
  margin-right: 0.1cm;
  text-align: center;
}

/**题目选项**/

.as-cq-c-v-group {
  display: flex;
  flex-direction: row;
}

.as-cq-c-group-q {
  display: flex;
  flex-direction: row;
  margin: 0.2cm 0.3cm;
}

.as-cq-c-group-opt {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.as-cq-c-group-opt div {
  position: relative;
  width: 0.488cm;
  height: 0.234cm;
  border: 0.01cm solid black;
  margin-top: 0.07cm;
  margin-bottom: 0.07cm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.as-cq-c-group-opt div span {
  font-size: 8pt;
  text-align: center;
  vertical-align: middle;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.as-cq-c-group-q-opt {
  display: flex;
  flex-direction: column;
  margin: 0cm 0.1cm;
}

.as-cq-c-num {
  position: relative;
  width: 0.508cm;
  height: 0.254cm;
  top: 0;
  right: 0cm;
  font-size: 8pt;
  margin: 0.2cm 0cm;
  text-align: center;
}
</style>

<template>
    <div class="as-paper" size="a3">
    <div id="as-page-1" class="as-page-1">
      <div class="as-ext-loc-area">
        <div class="as-ext-loc-lt"></div>
        <div class="as-ext-loc-lb"></div>
        <div class="as-ext-loc-rt"></div>
        <div class="as-ext-loc-rb"></div>
        <!-- 超出位置 底线位置 -->
        <div v-if="showStopLine" class="as-stopLine"></div>
        <div class="as-foot">
            <div class="as-foot-answer-tips">请在题目答题区域内作答，超出限定范围的答案无效</div>
            <div class="as-foot-school">AM测试学校</div>
        </div>
        <div class="as-main-area">
            <div class="as-column as-column-1" attr-sort="1" >
                <div class="position-mark-container"></div>
                <div class="as-exam-title-block">
                    <div class="as-exam-title-container" id="title"  contenteditable="true">{{data.title}}</div>
                    <div class="as-exam-title-container">{{data.subtitle}}</div>
                </div>
                <div class="as-exam-identifier-class-block">
                    <div class="as-exam-identifier-block">
                        <span>识别码</span>
                        <img alt="" id="as-barcode" />
                    </div>
                    <div class="as-class-info-block">
                        <div>
                            <span>班级：</span>
                            <div class="as-school-class-blank">&nbsp;</div>
                        </div>
                        <div>
                            <span>姓名：</span>
                            <div class="as-student-name">&nbsp;</div>
                        </div>
                    </div>
                </div>
                 <div class="as-tips-examinee-identifier-block">
                    <div class="as-tips">
                        <div class="as-tips-sure">
                            <div><span class="as-tips-tiile">正确填涂:</span><span class="as-icon-sure"></span></div>
                            <div><span class="as-tips-tiile">错误填涂:</span>
                                <span class="as-icon as-icon-a"> <i></i></span>
                                <span class="as-icon as-icon-b"> <i>✓</i></span>
                                <span class="as-icon as-icon-c"><i></i></span>
                                <span class="as-icon as-icon-d"><i></i></span>
                                <span class="as-icon as-icon-e"><i>A</i></span>
                            </div>
                        </div>
                        <span class="as-tips-tiile-tips">注意:请勿折叠答题纸以及在识别码和条形码区域内涂改</span>
                    </div>
                    <div class="as-examinee-identifier-block">
                        <span>
                            条形码粘贴区域
                        </span>
                    </div>
                </div>
                <template v-for="list in data.breaknodes" >
                  <div v-if="list.type == 'headingBox'" class="as-other-question-block-title" :key="list._id">
                    {{list.text}}
                  </div>
                  <se-block v-if="list.type == 'selectSuperSink'" :pageSize="'A3'" :key="list._id" :qData="list"></se-block>
                </template>
                <div class="as-other-question-block">
                  <template v-for="(list,index) in  data.breaknodes">
                    <fq-block v-if="list.type == 'fillinSink' ||list.type == 'writeoutSink'" :colMaxHeight="colMaxHeight" :key="index" :order="index" :qData="list"></fq-block>
                  </template>
                </div>
            </div>
            <div class="as-column as-column-2" attr-sort="2">
               <div class="position-mark-container"></div>
               <div class="as-other-question-block">
                      
                </div>
            </div>
            <div class="as-column as-column-3" attr-sort="3">
               <div class="position-mark-container"></div>
               <div class="as-other-question-block">
                      
                </div>
            </div>
        </div>
      </div>
    </div>
    <div id="as-page-2" class="as-page-2">
        <div class="as-ext-loc-area">
            <div class="as-ext-loc-lt"></div>
            <div class="as-ext-loc-lb"></div>
            <div class="as-ext-loc-rt"></div>
            <div class="as-ext-loc-rb"></div>
            <!-- 超出位置 底线位置 -->
            <div v-if="showStopLine" class="as-stopLine"></div>
            <div class="as-foot">
                <div class="as-foot-answer-tips">请在题目答题区域内作答，超出限定范围的答案无效</div>
                <div class="as-foot-school">——AM测试学校——</div>
            </div>
            <div class="as-main-area">
              <template v-if="isComposeSink">
                <template v-for="(list,index) in  data.breaknodes">
                  <compose-sink v-if="list.type == 'composeSink'" :colMaxHeight="colMaxHeight" :key="index" :order="index" :qData="list"></compose-sink>
                </template>
              </template>
              <template v-else>
                  <div class="as-column as-column-4" attr-sort="4" >
                    <div class="position-mark-container"></div>
                    <div class="as-other-question-block">
                          
                    </div>
                  </div>
                  <div class="as-column as-column-5" attr-sort="5" >
                    <div class="position-mark-container"></div>
                    <div class="as-other-question-block">
                          
                    </div>
                  </div>
                  <div class="as-column as-column-6" attr-sort="6" >
                    <div class="position-mark-container"></div>
                    <div class="as-other-question-block">
                          
                    </div>
                  </div>
              </template>
              
              
            </div>
        </div>
    </div>
  </div>


</template>

<script>
import json from "../mock/test.json";
import fqBlock from "./template/fq"
import computed from '../m/computed.js'
import selecrQestion from "./template/select"
import composeSink from './template/composeSink'
export default {
  name: "container",
  mixins:[computed],
  components:{
    fqBlock,
    seBlock:selecrQestion,
    composeSink
  },
  data() {
    return {
      colMaxHeight:26,
      showStopLine: true,
      nextList:[],
      data: json,
      isComposeSink:false
    };
  },
  created(){
    if(this.data.discipline == 'chinese') {
      this.data.breaknodes.forEach(item=>{
        if(item.type == 'composeSink'){
          this.isComposeSink = true;
        }
      })
    }
  },
  mounted(){
    this.$on('update',item=>{
      this.broadcast('q-container','updateArea');
      this.$nextTick(()=>{
        this.setOverArea()
      })
    })
    this.setBarCode(this.data.code);
    this.$nextTick(()=>{
      this.setOverArea()
    })
  },
  methods:{
    setOverArea(){
      var _this = this;
      console.log('设置剩余空间');
      $('.prohibited-block').remove();
      let columnList = $('.as-column');
      columnList.sort(function (a, b) {
        return parseInt($(a).css("order")) - parseInt($(b).css("order"));
      });
      columnList.each(function(index,item){
        var  currentColumnHeight = _this.px2cm($(item).height());
        var overH = 26 - currentColumnHeight;
        if(overH >2) {
          if(!$(item).find('.as-other-question-block').length) {
            $(item).append('<div class="as-other-question-block"></div>')
          }
          var div  = $('<div class="prohibited-block" style="order:99"><span>此区域不可作答</span></div>');
            $(div).css('height',overH+'cm');
            $(item).find('.as-other-question-block').append(div);
        }
      })
    }
  }
};
</script>

<style scoped>
@page{
    size:A3;
    margin:0
  }
  @media print {
    .as-paper {
      display: flex;
      flex-direction: column;
    }
    .as-toolbox {
      display: none;
    }
  }
  
  @media screen {
    .as-paper {
      height: 60cm;
      width: 42;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  
  .as-page-1,
  .as-page-2 {
    width: 42cm;
    height: 29.7cm;
    background-color: white;
  }
  
  .as-ext-loc-area {
    position: absolute;
    width: 40cm;
    height: 27.7cm;
    margin-top: 1cm;
    margin-left: 1cm;
    background-color: white;
  }
  
  .as-ext-loc-lt {
    position: absolute;
    width: 0;
    height: 0;
    top: 0cm;
    left: 0cm;
    border-top: 0.254cm solid black;
    border-right: 0.508cm solid black;
  }
  
  .as-ext-loc-lb {
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0cm;
    left: 0cm;
    border-bottom: 0.254cm solid black;
    border-left: 0.508cm solid black;
  }
  
  .as-ext-loc-rt {
    position: absolute;
    width: 0;
    height: 0;
    top: 0cm;
    right: 0cm;
    border-bottom: 0.254cm solid black;
    border-left: 0.508cm solid black;
  }
  
  .as-ext-loc-rb {
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 0.254cm solid black;
    border-left: 0.508cm solid transparent;
    bottom: 0cm;
    right: 0cm;
  }
  
  .as-main-area {
    width: 39cm;
    height: 26cm;
    margin-top: 0.65cm;
    margin-left: 0.5cm;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .as-column {
    width: 12.6cm;
  }
  .as-column-1 {
    order: 1;
    margin-left: 0.708cm;
  }
  .as-column-2 {
    order: 2;
  }
  .as-column-3 {
    order: 3;
  }
  .as-column-4 {
    order: 4;
  }
  .as-column-5 {
    order: 5;
  }
  .as-column-6 {
    order: 6;
  }
  .as-column-border {
    border: 0.02cm black solid;
  }
  
  .as-exam-title-block {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14pt;
  }
  
  /**识别码区域**/
  
  .as-exam-identifier-class-block {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.2cm;
  }
  
  .as-exam-identifier-block {
    position: relative;
    display: flex;
    width: 7.8cm;
    height: 1.2cm;
    align-items: center;
    border: 0.02cm rgb(100, 100, 100) dashed;
    padding: 0.1cm 0cm 0.1cm 0.1cm;
    font-size: 10pt;
  }
  
  .as-exam-identifier-block img {
    height: 1cm;
  }
  
  .as-class-info-block {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 4.2cm;
    height: 1.2cm;
    border: 0.02cm rgb(100, 100, 100) dashed;
    padding: 0.1cm;
  }
  .as-class-info-block div {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 10pt;
  }
  .as-class-info-block div div {
    width: 2.5cm;
    border-bottom: 0.02cm black solid;
  }
  
  /**学生识别码及注意事项区域**/
  
  .as-tips-examinee-identifier-block {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 0.2cm;
  }
  
  .as-tips {
    position: relative;
    /* display: flex; */
    width: 6.5cm;
    height: 2.5cm;
    align-items: center;
    border: 0.02cm rgb(100, 100, 100) dashed;
    padding: 0.1cm 0.2cm;
  }
  
  .as-examinee-identifier-block {
    position: relative;
    display: flex;
    width: 5cm;
    height: 2.5cm;
    align-items: center;
    border: 0.02cm rgb(100, 100, 100) dashed;
    padding: 0.1cm 0.2cm;
    justify-content: center;
  }
  /*******************************************************************************
  ************* 非选择题 *************************************************************
  ***************************************************************************/
  .as-other-question-block-title {
    text-align: center;
    margin: 0.3cm 0cm 0.2cm 0cm;
  }
  
  .as-other-question-block {
    display: flex;
    flex-direction: column;
    border-left: 0.02cm black solid;
    border-right: 0.02cm black solid;
    border-bottom: 0.02cm black solid;
    justify-content: space-between;
  }
  .as-aq-area-block {
    position: relative;
    display: flex;
    flex-direction: column;
    border-top: 0.02cm black solid;
  }
  .as-aq-area-block-end-border {
    border-bottom: 0.02cm black solid;
    order: 100;
  }
  .as-aq-area-title {
    margin: 0.2cm 0.2cm 0cm 0.2cm;
    font-size: 10pt;
    word-wrap:break-word;
    max-width: 1.2cm;
  }
  
  .as-aq-area-title p {
    margin: 0;
  }
  
  .as-aq-area-choose-todo {
    display: flex;
    flex-direction: row;
    margin: 0.2cm;
    font-size: 10pt;
    align-items: center;
    order: 2;
  }
  .as-aq-area-choose-todo-qnum-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }
  .as-aq-area-choose-todo-qnum-block div {
    position: relative;
    min-width: 0.688cm;
    height: 0.334cm;
    border: 0.01cm solid black;
    margin: 0.1cm;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .as-aq-area-choose-todo-qnum-block div span {
    font-size: 8pt;
    text-align: center;
    vertical-align: middle;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .as-aq-area-title-score {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    order: 1;
  }
  .as-aq-area-aid {
    margin: 0cm 0.5cm;
    order: 3;
  }
  .as-aq-area-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    margin: 0.2cm 0.5cm;
    order: 4;
  }
  
  .as-aq-area-content-flex-row {
    flex-direction: row;
  }
  .as-aq-area-content-flex-column {
    flex-direction: column;
  }
  .as-aq-area-content p {
    width: 100%;
    margin: 0.2cm 0cm;
    border-bottom: 0.01cm rgb(60, 60, 60) solid;
  }
  
  .as-aq-fq-item {
    border-bottom: 0.01cm rgb(60, 60, 60) solid;
    width: 29%;
    margin: 0.2cm;
    min-height: 0.5cm;
    position: relative;
    height: 16px;
  }
  
  .as-aq-fq-item-num {
    font-size: 10pt;
    position: absolute;
  }
  
  .as-aq-fq-item-blank {
    width: 100%;
  }
  .as-aq-fq-item-qnum {
    font-size: 10pt;
    display: block;
    position: absolute;
    height: 18px;
    background: #fff;
    top: 2px;
  }
  

</style>

<template>
    <div class="as-paper" size="a4">
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
            <div class="as-foot-school">——AM测试学校——</div>
        </div>
        <div class="as-main-area">
            <div class="as-column as-column-1" attr-sort="1">
                <div class="position-mark-container"></div>
                <div class="as-exam-title-block">
                    <div class="as-exam-title-container" id="title"  contenteditable="true"  >{{data.title}}</div>
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
                  <se-block v-if="list.type == 'selectSuperSink'" :pageSize="'A4'" :key="list._id" :qData="list"></se-block>
                </template>
                <div class="as-other-question-block">
                  <template v-for="(list,index) in  data.breaknodes">
                    <fq-block v-if="list.type == 'fillinSink' ||list.type == 'writeoutSink'" :colMaxHeight="colMaxHeight" :key="index" :order="index" :qData="list"></fq-block>
                  </template>
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
                <div class="as-column as-column-2" attr-sort="2">
                <div class="position-mark-container"></div>
                <div class="as-other-question-block">
                      
                </div>
            </div>
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

export default {
  name: "container",
  mixins:[computed],
  components:{
    fqBlock,
    seBlock:selecrQestion,
  },
  data() {
    return {
      colMaxHeight:26,
      showStopLine: true,
      nextList:[],
      data: json
    };
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

<style scoped lang="scss">
@import url('../theme/base.css');
@page {
  size: A4;
  margin: 0;
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
    width: 43cm;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.as-page-1 {
  position: relative;
  width: 21cm;
  height: 29.7cm;
  background-color: white;
}
.as-page-2 {
  position: relative;
  width: 21cm;
  height: 29.7cm;
  background-color: white;
}

.as-ext-loc-area {
  position: absolute;
  width: 19cm;
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
  width: 18cm;
  margin-top: 0.65cm;
  margin-left: 0.5cm;
  margin-right: 0.5cm;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.as-column {
  width: 100%;
}
.as-column-1 {
  order: 1;
}
.as-column-2 {
  order: 2;
}

.as-exam-title-block {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 14pt;
}
.as-exam-title-block div {
  margin: 0cm 0.2cm;
}

/**识别码区域**/

.as-exam-identifier-class-block {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0.2cm 0.5cm 0cm 0.5cm;
}

.as-exam-identifier-block {
  position: relative;
  display: flex;
  width: 8cm;
  height: 1cm;
  align-items: center;
  border: 0.02cm rgb(100, 100, 100) dashed;
  padding: 0.1cm 0.2cm;
  font-size: 10pt;
}

.as-exam-identifier-block img {
  height: 1cm;
}

.as-class-info-block {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 8cm;
  height: 1cm;
  align-items: center;
  border: 0.02cm rgb(100, 100, 100) dashed;
  padding: 0.1cm 0.2cm;
  justify-content: space-between;
}
.as-class-info-block div {
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 10pt;
  justify-content: space-between;
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
  margin: 0.2cm 0.5cm 0cm 0.5cm;
}

.as-tips {
  position: relative;
  /* display: flex; */
  width: 8cm;
  height: 2.5cm;
  align-items: center;
  border: 0.02cm rgb(100, 100, 100) dashed;
  padding: 0.1cm 0.2cm;
}

.as-examinee-identifier-block {
  position: relative;
  display: flex;
  width: 8cm;
  height: 2.5cm;
  align-items: center;
  border: 0.02cm rgb(100, 100, 100) dashed;
  padding: 0.1cm 0.2cm;
  justify-content: center;
}



/*********************************************************************
  ********************* 非选择题 ***************************************
  *********************************************************************/
.as-other-question-block-title {
  text-align: center;
  margin: 0.3cm 0cm 0.2cm 0cm;
}

.as-other-question-block {
  display: flex;
  flex-direction: column;
  margin: 0cm 0.5cm;
  border-left: 0.02cm black solid;
  border-right: 0.02cm black solid;
  border-bottom: 0.02cm black solid;
}

</style>

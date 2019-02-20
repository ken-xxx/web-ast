<template >
 <div v-html="dom">
  
 </div>
</template>

<script>
var nunjucks  = require('nunjucks')
import $ from "jquery";
export default {
  name: "composeSinkContainer",
  data (){
    return {
      dom:null
    }
  },
  props: {
    order: {
      required: true,
      type: Number
    },
    qData: {
      required: true,
      type: Object
    },
    colMaxHeight: {
      default: 26,
      type: Number
    }
  },
  created(){
    var _this  = this;
    let url = `${window.location.protocol}//${window.location.host}/static/template`;
    var env = new nunjucks.Environment(
      new nunjucks.WebLoader(url, {
        useCache: false,
        async: false
      })
    );
    _this.dom = env.render('wq.html',{data:_this.qData});
    let score = env.render('score_mini_mark.html',{score:this.qData.points})
    this.$nextTick(function(){
      $('.as-wq-area-score-container').html(score);
    })
  }
}; 
</script>

<style lang="">
  /********************************************************************
   ****************** 作文 ***********************************************
   **********************************************************************/
  
  .as-writing-question-block {
    width: 100%;
    height: 100%;
  }
  .as-wq-area-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 0.02cm black solid;
  }
  .as-wq-area-block-title {
    text-align: center;
    margin: 0.3cm 0cm 0.2cm 0cm;
  }
  .as-wq-area-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 0.01cm black solid;
    border-right: 0.01cm black solid;
    width: 12.34cm;
  }
  
  .as-wq-column {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0.2cm;
    justify-content: space-between;
  }
  
  .as-wq-row {
    border-top: 0.01cm black solid;
    border-bottom: 0.01cm black solid;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }
  .as-wq-row-divider {
    height: 0.22cm;
    margin: 0;
    padding: 0;
  }
  
  .as-wq-frame {
    width: 0.75cm;
    height: 0.75cm;
    margin: 0;
    padding: 0;
  }
  .as-wq-frame-border {
    width: 0.75cm;
    height: 0.75cm;
    margin: 0;
    padding: 0;
    border-right: 0.01cm black solid;
  }
  
  .as-wq-frame-divider {
    height: 0.75cm;
    border-left: 0.01cm black solid;
  }
  
  .as-wq-frame-word-count {
    position: absolute;
    font-size: 12px;
    margin-top: 0.7cm;
    width: 0.75cm;
    text-align: center;
  }
  
  .as-wq-area-title-score {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: -0.2cm;
    margin-left: -0.2cm;
  }
  
  .as-wq-area-title {
    display: flex;
    flex-direction: row;
    margin: 0.2cm;
    font-size: 10pt;
    justify-content: space-between;
    order: 3;
  }
  
</style>
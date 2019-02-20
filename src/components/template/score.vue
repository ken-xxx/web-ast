<template>
  <div class="as-aq-area-title-score">
    <div class="as-aq-area-title">
      {{qData.title}}
      <span class="as-area-point">({{qData.points}}分)</span>
    </div>
    <div class="" v-html="dom">

    </div>
    
  </div>
</template>

<script>
var nunjucks  = require('nunjucks')
export default {
  name: "score-container",
  props: {
    qData: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      bNumber: 0,
      sNumber: 0,
      isShowLast: false,
      dom:null
    };
  },
  created() {
    var _this  = this;
    let url = `${window.location.protocol}//${window.location.host}/static/template`;
    var env = new nunjucks.Environment(
      new nunjucks.WebLoader(url, {
        useCache: false,
        async: false
      })
    );
    _this.dom = env.render('score_mark.html',{score:_this.qData.points});
  }
};
</script>

<style>
.score-area-interval{
  width: 0.2cm;
}
.as-aq-area-title {
  margin:0.1cm;
  font-size: 10pt;
  word-wrap: break-word;
}
.as-aq-area-title p {
  margin: 0;
}
.as-score-area {
  height: 0.65cm;
  display: flex;
  flex-direction: row;
  padding-right: 0.2cm;
  border-bottom: 0.01cm black solid;
  border-right: 0.2cm black solid;
  order: 2;
  justify-content: flex-end;
}
.as-score-area-mini {
  height: 0.65cm;
}
.as-score-area-ex {
  height: 0.6cm;
  display: flex;
  flex-direction: row;
  padding-right: 0.3cm;
  border-bottom: 0.01cm black solid;
  border-right: 0.2cm black solid;
  border-top: 0.01cm black solid;
  order: 2;
}
.as-score-area-item,
.as-score-area-item-placeholder {
  width: 0.65cm;
  height: 0.65cm;
  font-size: 9pt;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.as-score-area-item-mini {
  width: 0.65cm;
  height: 0.65cm;
}
.as-score-area-item-border {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.as-score-area-item-border div {
  height: 0.2cm;
}

.as-score-area-item-border-s {
  border-left: 0.03cm black solid;
}
</style>

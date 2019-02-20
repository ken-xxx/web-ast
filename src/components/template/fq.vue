<template>
<!--

  v-on:mouseenter="showDragTool"
    v-on:mouseleave="hiddenDragTool"
-->
  <div
    
    ref="fqBlock"
    class="as-aq-area-block as-aq-block"
    qtype="fq"
    :qid="qData.title"
    :sort="order"
    :style="{'order':order}"
  >
    <score :qData="qData"/>
    <div class="as-aq-area-choose-todo" v-if="qData.isOptioned"> 
      <div>我所选择的题号是：</div>
      <div class="as-aq-area-choose-todo-qnum-block" >
        <div v-for="(i,index) in qData.optioned" :key="index">
           <span>{{i}}</span>
        </div>
      </div>
    </div>
    <div class="as-aq-area-content as-aq-area-content-flex-row" contenteditable="true">
      <!-- contenteditable="true" -->
      <template class v-if="qData.blankPrefix">
        <p v-for="(i,index) in qData.blankPrefix" :key="index">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span class="as-sub-title">{{i}}</span>
          <span v-for="(z,index2) in qData.blankCount" :key="index2">________ &nbsp;&nbsp;</span>
        </p>
      </template>
    </div>

    <div v-if="showDrag" class="dragTool" @mousedown="move"></div>
  </div>
</template>

<script>
import $ from "jquery";
import tools from "../../m/computed.js";
import score from "./score";

export default {
  name: "q-container",
  mixins: [tools],
  components: {
    score
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
  data() {
    return {
      showDrag: true,
      parentArea: null,
      selfArea: null,
      shwoEditor: false,
      editor: null,
      content: "",
      isEditor: true
    };
  },
  
  mounted() {
    if (!window.$) {
      window.$ = $;
    }
    let _this = this;
    this.init();
    this.$on("updateArea", data => {
      this.init();
    });
  },
  methods: {
    init() {
      var _this = this;
      this.parentArea = this.getPosition(
        $(this.$refs.fqBlock).parents(".as-column")[0]
      );
      this.selfArea = this.getPosition(this.$refs.fqBlock);
      this.selfArea.height = this.px2cm($(this.$refs.fqBlock).height());
      let colOrder = Number(
        $(this.$refs.fqBlock)
          .parents(".as-column")
          .attr("attr-sort")
      );
      let nextParent = $(`.as-column-${colOrder + 1}`);
      let prevParent = $(`.as-column-${colOrder - 1}`);
      // console.log('当前列内容高度: '+ (this.parentArea.y+this.colMaxHeight));
      // console.log('当前题目y: '+this.selfArea.y);
      // console.log('当前题目高度: '+ this.selfArea.height);
      // console.log('----------------------------------------------------');
      //当题目整体超出当前页高度时 整体移动到下一栏
      //  优化体验 当剩余少于1厘米是自动放在下一行 不需要时可删除 || 判断
      console.log(this.selfArea.y)
      if ((this.selfArea.y > this.parentArea.y + this.colMaxHeight) || (this.selfArea.y+1 > this.parentArea.y + this.colMaxHeight)) {
        if (
          $(nextParent).find(".as-aq-area-block[sort=" + this.order + "]")
            .length > 0
        ) {
          let selfHeight = $(this.$refs.fqBlock).height();
          let nextHeight = nextParent
            .find(".as-aq-area-block[sort=" + this.order + "]")
            .height();
          let nextContent = nextParent
            .find(".as-aq-area-block[sort=" + this.order + "]")
            .find(".as-aq-area-content")
            .children();
          $(this.$refs.fqBlock)
            .find(".as-aq-area-content")
            .append(nextContent);
          nextParent
            .find(".as-aq-area-block[sort=" + this.order + "]")
            .remove();
          $(this.$refs.fqBlock).height(selfHeight + nextHeight);
          nextParent
            .find(".as-other-question-block")
            .append($(this.$refs.fqBlock));
        } else {
          nextParent
            .find(".as-other-question-block")
            .append($(this.$refs.fqBlock));
        }
      } else if (
        this.selfArea.y + this.selfArea.height >
        this.parentArea.y + this.colMaxHeight
      ) {
        if(nextParent.length > 0) {
          let cloneDom = $(this.$refs.fqBlock).clone(true);
          //整理克隆dom后没有响应事件问题
          cloneDom.find('.dragTool').on('mousedown',function(e){
            _this.move(e);
          })
          cloneDom.find(".as-aq-area-title-score").remove();
          cloneDom.find(".as-aq-area-choose-todo").remove();
          cloneDom
            .find(".as-aq-area-content")
            .children()
            .remove();
          let contentList = $(this.$refs.fqBlock)
            .find(".as-aq-area-content")
            .children();
          if (contentList.length > 0) {
            let _this = this;
            contentList.each(function(index, item) {
              if (
                _this.getPosition(item).y + _this.px2cm($(item).height()) >
                _this.parentArea.y + _this.colMaxHeight
              ) {
                $(cloneDom)
                  .find(".as-aq-area-content")
                  .append(item);
              }
            });
          }
          if (cloneDom.find(".as-aq-area-content").children().length > 0) {
            if (
              nextParent.find(".as-aq-area-block[sort=" + this.order + "]")
                .length > 0
            ) {
              let content = cloneDom.find(".as-aq-area-content").children();
              nextParent
                .find(".as-aq-area-block[sort=" + this.order + "]")
                .find(".as-aq-area-content")
                .prepend(content);
            } else {
              nextParent.find(".as-other-question-block").append(cloneDom);
            }
          }
          let overflowHeight =
            this.selfArea.y +
            this.selfArea.height -
            this.parentArea.y -
            this.colMaxHeight;
          $(this.$refs.fqBlock).height(
            this.selfArea.height - overflowHeight + "cm"
          );
        }
        
      }

      //当前一页出现剩余空间时
      if (prevParent.length > 0) {
        //上一栏 实际高度
        let prevColHeight = this.px2cm(
          $(prevParent[0])
            .parents(".as-main-area")
            .height()
        );
        if (this.colMaxHeight - prevColHeight > this.selfArea.height) {
          let arr = [];
          $(this.$refs.fqBlock)
            .parents(".as-other-question-block")
            .find(".as-aq-area-block")
            .each(function(index, item) {
              arr.push($(item).attr("sort"));
            });
          arr = arr.sort(function(a, b) {
            return a - b;
          });
          console.log(arr);
          if (arr && $(this.$refs.fqBlock).attr("sort") == arr[0]) {
            console.log(this.qData.title);
            prevParent
              .find(".as-other-question-block")
              .append(this.$refs.fqBlock);
          }
        }
      }
    },
    showDragTool() {
      this.showDrag = true;
    },
    hiddenDragTool() {
      this.showDrag = false;
    },
    move(e) {
      let _this = this;
      let odiv = e.target;
      let disY = e.clientY;
      let top;
      let parent = $(odiv).parents(".as-aq-area-block");
      let parentHieght = $(parent).height();
      let contentHeight = $(parent)
        .find(".as-aq-area-content")
        .height();
      let contentWapper = $(parent).find(".as-aq-area-content");
      let lastChild = contentWapper.children().last();
      let lowsetHeight
      if(lastChild.length<=0) {
        lastChild = contentWapper;
        lowsetHeight = _this.getPosition(lastChild[0]).y 
       
      }else{
        lowsetHeight = _this.getPosition(lastChild[0]).y + _this.px2cm($(lastChild[0]).height());
      }
       
        
      document.onmousemove = e => {
        // 处理滚动条的高度问题
        let  yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        top = e.clientY- disY;
        
        let activeX = _this.px2cm(e.clientY+yOffset);
        if (activeX > lowsetHeight) {
          $(parent).height(top + parentHieght);
          if ($(parent).find("as-aq-area-title-score").length > 0) {
            $(parent)
              .find(".as-aq-area-content")
              .height(
                $(parent).heigh - $(parent).find("as-aq-area-title-score")
              );
          } else {
            $(parent)
              .find(".as-aq-area-content")
              .height($(parent).height());
          }
        }
      };
      document.onmouseup = e => {
        _this.dispatch("container", "update");
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>
<style scoped>

.dragTool {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1cm;
  z-index: 9;
  background: #b2dfee;
  cursor: ns-resize;
}

.as-aq-area-block {
  position: relative;
  display: flex;
  flex-direction: column;
  border-top: 0.02cm black solid;
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
  order: 4;
  text-align: left;
}
.as-aq-area-content p {
  margin: 0.2cm 0;
}
.as-aq-area-content .as-sub-title {
  font-size: 10pt;
}
.as-aq-area-content-flex-row {
  flex-direction: row;
}
.as-aq-area-content-flex-column {
  flex-direction: column;
}

.as-aq-fq-item {
  border-bottom: 0.01cm rgb(60, 60, 0) solid;
  width: 30%;
  position: relative;
  height: 16px;
  margin: 0.2cm;
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
.as-toolbox {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: white;
  white-space: nowrap;
  height: 30px;
  line-height: 22px;
  border: 1px solid #ccd3de;
}
</style>

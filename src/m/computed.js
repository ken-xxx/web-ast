import '../../static/js/JsBarcode.code128.min.js'
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  data() {
    return {
      pageA4Size: {
        height: 42
      }
    };
  },
  methods: {
    setBarCode (code) {
      JsBarcode("#as-barcode", code, {
        width: 2,
        height: 25,
        marginTop: 1,
        marginBottom: 1,
        displayValue: false
      });
    },
    dispatch(componentName, eventName, params) {
 
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    px2cm(val) {
      return parseFloat(((val / 96) * 2.54).toFixed(4));
    },

    cm2px(val) {
      return parseInt((val / 2.54) * 96);
    },
    getScrollTop(doc) {
      doc = doc || document;
      return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
    },
    getScrollLeft(doc) {
      doc = doc || document;
      return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
    },
    getPosition(el) {
      var _t = 0;
      var _l = 0;
      if (document.documentElement.getBoundingClientRect) {
        var box = el.getBoundingClientRect();

        var oDoc = el.ownerDocument;
        if (navigator.userAgent.indexOf("MSIE 6.0") >= 0) {
          _t = box.top - 2 + this.getScrollTop(oDoc);
          _l = box.left - 2 + this.getScrollLeft(oDoc);
        } else {
          _t = box.top + this.getScrollTop(oDoc);
          _l = box.left + this.getScrollLeft(oDoc);
        }
      } else {
        while (el.offsetParent) {
          _t += el.offsetTop;
          _l += el.offsetLeft;
          el = el.offsetParent;
        }
      }
      return { x: this.px2cm(_l), y: this.px2cm(_t) };
    },
    getAnwserAreaRectRelativelyParent(el, parent) {
      var parentPos = this.getPosition(parent);
      var pos = this.getPosition(el);
      var rect = {
        x: parseFloat((pos.x - parentPos.x).toFixed(6)),
        y: parseFloat((pos.y - parentPos.y).toFixed(6)),
        w: this.px2cm(el.offsetWidth),
        h: this.px2cm(el.offsetHeight)
      };
      return rect;
    },
    getCol(el) {
      return Number(
        $(el)
          .parents(".as-column")
          .attr("attr-sort")
      );
    },
    getAnwserAreaRect(el) {
      var orgPtPos = this.getPosition(
        $(el)
          .parents(".as-ext-loc-area")
          .get(0)
      );
      var pos = this.getPosition(el);
      var rect = {
        x: parseFloat((pos.x - orgPtPos.x).toFixed(6)),
        y: parseFloat((pos.y - orgPtPos.y).toFixed(6)),
        w: this.px2cm(el.offsetWidth),
        h: this.px2cm(el.offsetHeight),
        c: this.getCol(el)
      };
      return rect;
    }
  }
};

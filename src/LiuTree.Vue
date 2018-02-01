<template>
  <div class="liutree">
    <div class="StyleButton" style="padding:2rem 0;">
      <span v-for="item,key in Styles" :key="key" class="btn btn-default" :class="{'btn-warning':item==Style}" @click="Style=item">
        {{item}}
      </span>
    </div>
    <slot></slot>
    <div :class="Style">
      <ul class="Node">
        <liu-tree-item
        :classname="Style"
        :tree="tree"
        :select="Select"
        :key="0"
        :indexinparent="0"
        :parent="{Child:[]}"
        ></liu-tree-item>
      </ul>
    </div>
  </div>
</template>
<style lang="less">
@import "./font-awesome/css/font-awesome.min.css";
@import "./less/variables.less";
@import "./less/mixins.less";
@import "./lessbase/base.less";

@BaseColor: #c62f2f;
@BaseColor2: #e83c3c;
@BaseFocusColor: #251717;
@BaseFontColor: #2b2b2b;
@BaseShopBgColor: #f8f8f8;
@BgColor: #fafafa;
@BgColorLeft: #f5f5f7;
@BaseBorderColor: darken(@BgColor, 4%);
@navbg: rgba(255, 255, 255, 1);
@leftbarwidth: 250px;
@start-color: #1abeff;
@end-color: #71d4ff;
@treesize: 1rem;
.liutree {
  padding: 2rem;
  background-color: white;
  .NodeTree-one {
    background-color: white;
    .transition;
    .transform-origin(16px 0 0);
    height: auto;

    &.IsClose {
      .opacity(0);
      .scale(0.1);
    }

    &.IsClosed {
      display: none;
    }

    &.IsOpen {
      .opacity(1);
      .scale(1);
    }

    ul.Node {
      .ulreset;

      a {
        padding: 0;
      }

      li.TreeItem {
        float: none !important;
        position: relative;

        .Item {
          display: block;
          float: none;
          width: @treesize*10;
          line-height: @treesize*2.8;
          border: 2px solid #000;
          border-radius: 0px;
          background-color: white;
          padding: 0 @treesize*0.8;
          position: relative;
          white-space: nowrap;
          z-index: 1;

          &.select {
            /*&:after {
                content: " ";
                box-sizing: content-box;
                padding: 3px;
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px dashed yellow;
                left: 50%;
                border-radius: 12px;
                top: 50%;
                .translate(-50%,-50%);
                z-index: -1;
            }*/
            &::before,
            &::after {
              content: " ";
              box-sizing: content-box;
              padding: 3px;
              position: absolute;
              width: 100%;
              height: 100%;
              border: 2px dotted yellow;
              left: 50%;
              border-radius: 12px;
              top: 50%;
              .translate(-50%,-50%);
              z-index: -1;
              animation: clipMe 1s linear infinite;
            }

            &::before {
              animation-delay: -0.5s;
            }
          }

          &[draggable="true"] {
            cursor: Move;
          }

          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }

          .OpenAndClose,
          .GotoAddChild,
          .RemoveMe {
            text-align: center;
            width: 12px;
            height: 12px;
            position: absolute;
            background-color: white;
            right: -6px;
            .translate(0,-6px);
            top: 50%;
            color: black;
            line-height: 12px;
            .transition;
            z-index: 100;
            cursor: pointer;
          }

          .OpenAndClose,
          .GotoAddChild {
            right: initial;
            left: 8px;
            bottom: -6px;
            .translate(0,0);
            top: initial;
          }

          .GotoAddChild,
          .RemoveMe {
            .opacity(0);
          }

          .RemoveMe {
            right: initial;
            left: -8px;
          }

          .godown,
          .goup {
            text-align: center;
            width: 12px;
            height: 12px;
            position: absolute;
            background-color: white;
            right: -28px;
            .translate(0,-18px);
            top: 50%;
            color: black;
            line-height: 12px;
            .transition;
            z-index: 100;
            cursor: pointer;
            .opacity(0);
          }

          .godown {
            .translate(0,6px);
          }

          .transition;

          &.dragIng {
            border: 2px solid #00db0b !important;
            .opacity(0.3);
            .scale(0.01);
          }

          &.dragEnter {
            border: 2px solid #1abeff !important;
            .scale(1.4);
          }

          &.dragMove {
            border: 2px solid #00db0b !important;
          }

          &.ItemEdit {
            .transition-delay-imoprtant(-1s);
            border: 1px solid black !important;
            padding: 0;

            .OpenAndClose,
            .GotoAddChild,
            .RemoveMe,
            .godown,
            .goup {
              display: none;
            }

            input {
              display: block;
              width: 100%;
              line-height: @treesize*2.8;
              text-align: left;
              padding: 0 @treesize*0.8;
              border: 0;
              border-radius: 0px;
              margin: 0;
              background-color: fade(black, 10%);
              .box-shadow(inset 1px 1px 3px #333);

              &:focus {
                border: 0;
                outline: none;
              }
            }
          }
        }

        &:hover {
          > .Item {
            border: 2px solid red;

            .GotoAddChild,
            .RemoveMe,
            .godown,
            .goup {
              .opacity(1);
            }

            .fa {
              color: red;
            }
          }
        }

        .NodeTree-one {
          float: none;
          background: white url(./images/NodeTreeBlack/line-y.png) repeat-y 16px
            0;
          /*margin-top: @treesize*1.5;*/
          &.NoneBg {
            /*background: none;*/
            background: white url(./images/NodeTreeBlack/line-y.png) no-repeat
              16px -2px;
          }

          ul.Node {
            /*margin-top: @treesize*-1.5;*/
            padding-top: @treesize*1.5;
            background: url(./images/NodeTreeBlack/line-y.png) no-repeat 16px 0;

            li.TreeItem {
              background: url(./images/NodeTreeBlack/line-x.png) no-repeat 16px
                8.5px;
              padding-left: 33px;
              padding-bottom: @treesize;

              &:last-child {
                background: white url(./images/NodeTreeBlack/line-end.png)
                  no-repeat 16px 0px;
                padding-bottom: 0;
              }

              &:first-child {
                /*margin-top:@treesize;*/
                background: url(./images/NodeTreeBlack/line-x.png) no-repeat
                  16px 8.5px;
              }

              .transition;

              &.dragIng {
                outline: 2px dashed red;
                margin: 2px 10px 10px;
                padding: -2px -10px -10px;
                .box-shadow(10px 10px 30px fade(black,20%));
                background-color: white;
                background-image: none;

                .selectMe {
                  display: none;
                }

                .NodeTree-one {
                  .scale(0);
                  .opacity(0);
                }

                .Item {
                  background: none;
                  background-image: none;
                }
              }
            }
          }
        }

        &.TreeItemAdd {
          /*background: url(./images/NodeTreeBlack/line-end.png) no-repeat 16px 0px !important;*/
          .Item {
            border: 2px dashed fade(black, 50%);
            padding: 0;
            .opacity(1);
            overflow: hidden;

            &:hover {
              border: 2px dashed fade(red, 50%);
            }

            input {
              display: block;
              width: 100%;
              line-height: @treesize*2.6;
              border-radius: 0;
              text-align: left;
              padding: 0 @treesize*0.8;
              border: 0;
              margin: 0;
              background-color: white;

              &:focus {
                border: 0;
                outline: none;
              }
            }
          }
        }

        .clearfix;
        padding-bottom: @treesize;

        .selectMe {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
  .NodeTree {
    background-color: white;
    .transition;
    .transform-origin(0 0 0);
    height: auto;

    &.IsClose {
      .opacity(0);
      .scale(0.1);
    }

    &.IsClosed {
      display: none;
    }

    &.IsOpen {
      .opacity(1);
      .scale(1);
    }

    ul.Node {
      .ulreset;

      li.TreeItem {
        /*float:left;
                clear:both;*/
        .Item {
          display: block;
          float: left;
          width: @treesize*10;
          border-radius: @treesize*0;
          line-height: @treesize*2.8;
          border: 2px solid #000;
          background-color: white;
          padding: 0 @treesize*0.8;
          position: relative;
          white-space: nowrap;

          &[draggable="true"] {
            cursor: Move;
          }

          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }

          .OpenAndClose,
          .GotoAddChild,
          .RemoveMe {
            text-align: center;
            width: 12px;
            height: 12px;
            position: absolute;
            background-color: white;
            right: -6px;
            .translate(0,-6px);
            top: 50%;
            color: black;
            line-height: 12px;
            .transition;
            z-index: 100;
            cursor: pointer;
          }

          .RemoveMe {
            right: initial;
            left: -12px;
          }

          .godown,
          .goup {
            text-align: center;
            width: 12px;
            height: 12px;
            position: absolute;
            right: -18px;
            .translate(0,-18px);
            top: 50%;
            color: white;
            line-height: 12px;
            .transition;
            z-index: 100;
            cursor: pointer;
            .opacity(0);
          }

          .godown {
            .translate(0,6px);
          }

          .GotoAddChild,
          .RemoveMe,
          .godown,
          .goup {
            .opacity(0);
          }

          .transition;

          &.dragIng {
            border: 2px solid #00db0b !important;
            .opacity(0.3);
            .scale(0.01);
          }

          &.dragEnter {
            border: 2px solid #1abeff !important;
            .scale(1.4);
          }

          &.dragMove {
            border: 2px solid #00db0b !important;
          }

          &.ItemEdit {
            .transition-delay-imoprtant(-1s);
            border: 2px solid black !important;
            padding: 0;

            .OpenAndClose,
            .GotoAddChild,
            .RemoveMe,
            .godown,
            .goup {
              display: none;
            }

            input {
              display: block;
              width: 100%;
              line-height: @treesize*2.8;
              text-align: left;
              padding: 0 @treesize*0.8;
              border: 0;
              margin: 0;
              background-color: fade(black, 10%);
              .box-shadow(inset 1px 1px 3px #ccc);

              &:focus {
                border: 0;
                outline: none;
              }
            }
          }
        }

        &:hover {
          > .Item {
            border: 2px solid red;

            .GotoAddChild,
            .RemoveMe,
            .godown,
            .goup {
              .opacity(1);
            }

            .fa {
              color: red;
            }
          }
        }

        .NodeTree {
          float: left;
          background: white url(./images/NodeTree/line-y.png) repeat-y 16px 0;
          margin-top: @treesize*1.5;

          &.NoneBg {
            background: none;
          }

          ul.Node {
            margin-top: @treesize*-1.5;
            background: url(./images/NodeTree/line-x.png) no-repeat 0
              @treesize*1.5;

            li.TreeItem {
              background: url(./images/NodeTree/line-x.png) no-repeat 16px
                @treesize*1.5;
              padding-left: 33px;
              padding-bottom: @treesize;

              &:last-child {
                background: white url(./images/NodeTree/line-end.png) no-repeat
                  16px 0;
                padding-bottom: 0;
              }

              &:first-child {
                background: url(./images/NodeTree/line-x.png) no-repeat 16px
                  @treesize*1.5;
              }

              .transition;

              &.dragIng {
                outline: 2px dashed red;
                margin: 2px 10px 10px;
                padding: -2px -10px -10px;
                .box-shadow(10px 10px 30px fade(black,20%));
                background-color: white;
                background-image: none;

                .NodeTree {
                  .scale(0);
                  .opacity(0);
                }

                .Item {
                  background: none;
                  background-image: none;
                }
              }
            }
          }
        }

        &.TreeItemAdd {
          .Item {
            border: 2px dashed fade(black, 50%);
            padding: 0;
            .opacity(1);

            &:hover {
              border: 2px dashed fade(red, 50%);
            }

            input {
              display: block;
              width: 100%;
              line-height: @treesize*2.6;
              text-align: left;
              padding: 0 @treesize*0.8;
              border: 0;
              margin: 0;

              &:focus {
                border: 0;
                outline: none;
              }
            }
          }
        }

        .clearfix;
        padding-bottom: @treesize;
      }
    }
  }
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import LiuTreeItem from "./LiuTreeItem.vue";
import "./utils.js";
Vue.directive("focus", {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});

export default {
  name: "LiuTree",
  provide: {
    eventBus: null
  },
  props: {
    tree: {
      type: Object,
      default: { Child: {} }
    },
    AxiosUrl: {
      type: Object,
      default: {
        UpdateMin: "/"
      }
    }
  },
  components: {
    LiuTreeItem
  },
  data() {
    return {
      IsLoging: false,
      log: [],
      CacheModel: {
        from: null,
        fromParent: null,
        to: null,
        toParent: null,
        over: null,
        leveal: null
      },
      Step: {
        Point: 0,
        StepContent: []
      },
      Style: "NodeTree",
      Styles: ["NodeTree", "NodeTree-one"],
      Select: 0,
      SelectNode: {}
    };
  },
  created() {
    var self = this;
    // Accessible refernces of functions for removing in beforeDestroy
    // 在beforeDestroy中可移除的函数的引用

    self._provided.eventBus = new Vue();
    self.eventBus = self._provided.eventBus;

    self.eventBus.$on("executeTreePost", () => {
      self.executeTreePost();
    });

    self.eventBus.$on("executeTree", (tree, order) => {
      self.executeTree(tree, order);
    });

    self.eventBus.$on("removeMe", (tree, order) => {
      self.removeMe(tree, order);
    });

    self.eventBus.$on("setCacheModelfrom", (from, fromParent) => {
      self.CacheModel.from = from;
      self.CacheModel.fromParent = fromParent;
    });

    self.eventBus.$on("setCacheModelto", (to, toParent) => {
      self.CacheModel.to = to;
      self.CacheModel.toParent = toParent;
    });

    self.eventBus.$on("setCacheModelleveal", leveal => {
      self.CacheModel.leveal = leveal;
    });

    self.eventBus.$on("setCacheModelover", over => {
      self.CacheModel.over = over;
    });

    self.eventBus.$on("move", leveal => {
      self.move();
    });

    self.eventBus.$on("addLog", log => {
      self.log.push(log);
    });

    self.eventBus.$on("addNewItem", _newItem => {
      var tree = _newItem.tree;
      if (
        _newItem.newItem == null ||
        _newItem.newItem == undefined ||
        _newItem.newItem == ""
      ) {
        self.$message.error("不能为空");
        return;
      }
      _newItem.isLoading = true;
      var _name = _newItem.newItem;
      axios
        .post(self.AxiosUrl.GetPinyin, { str: _newItem.newItem, issplit: true })
        .then(function(res) {
          _name = res.data.pinyin;
          axios
            .post(self.AxiosUrl.Addmin, {
              parentId: tree.Id,
              name: _name,
              showName: _newItem.newItem,
              classType: tree.classType,
              grandFather: tree.grandFather
            })
            .then(function(res) {
              _newItem.isLoading = false;
              var resultData = res.data;
              if (!resultData.Succeeded) {
                self.$message.error(resultData.Errors.join("\r\n"));
              } else {
                resultData.ResultModel.Child = new Array();
                tree.Child.push(resultData.ResultModel);
                self.executeTree(this.tree, 1);
                _newItem.newItem = "";
              }
            })
            .catch(function(error) {
              _newItem.isLoading = false;
              if (error.response) {
                self.$message.error("服务器错误");
              } else {
                //一些错误是在设置请求的时候触发
                self.$message.error(error.message);
              }
            });
        })
        .catch(error => {
          _newItem.isLoading = false;
          if (error.response) {
            self.$message.error("服务器错误");
          } else {
            //一些错误是在设置请求的时候触发
            self.$message.error(error.message);
          }
        });
    });
  },
  beforeDestroy: function() {
    // Remove listeners
    this.eventBus.$off("executeTreePost");
    this.eventBus.$off("executeTree");
  },
  mounted: function() {
  },
  methods: {
    treestring: function() {
      return this.tree;
    },
    //filter(), concat(), slice()
    executeTree: function(tree, point) {
      console.log("executeTree");
      if (tree == null) {
        tree = this.tree;
      }
      tree.order = point;
      if (tree.Child.length > 0) {
        for (var i = 0; i < tree.Child.length; i++) {
          point++;
          tree.Child[i].order = point;
          tree.Child[i].parentId = tree.Id;
          tree.Child[i].idPath = tree.idPath + tree.Child[i].Id + "/";
          tree.Child[i].namePath = tree.namePath + tree.Child[i].name + "/";
          tree.Child[i].showNamePath =
            tree.showNamePath + tree.Child[i].showName + "/";
          point = this.executeTree(tree.Child[i], point);
        }
      }
      return point;
    },
    executeTreePost: function() {
      console.log("executeTreePost");
      var self = this;
      //this.$loading({fullscreen:true})
      axios
        .post(self.AxiosUrl.UpdateMin, this.tree)
        .then(function(res) {
          //self.$loading().close();
          var resultData = res.data;
          if (!resultData.Succeeded) {
            if (resultData.Errors) {
              self.$message.error(resultData.Errors.join("\r\n"));
            } else {
              self.$message.error("请检查你的网络！");
            }
          } else {
            //self.$message({
            //    message: '同步成功',
            //    type: 'success'
            //});
          }
        })
        .catch(function(error) {
          //self.$loading().close();
          if (error.response) {
            self.$message.error("服务器错误");
          } else {
            //一些错误是在设置请求的时候触发
            self.$message.error(error.message);
          }
        });
    },
    removeMe: function(tree, Id) {
      var self = this;
      if (tree == null) tree = this.tree;
      for (var i = 0; i < tree.Child.length; i++) {
        if (tree.Child[i].Id == Id) {
          axios
            .post(self.AxiosUrl.DelMin, { id: tree.Child[i].Id })
            .then(res => {
              var resultData = res.data;
              if (!resultData.Succeeded) {
                tree.Child.splice(i, 1);
                self.$message.error(resultData.Errors.join("\r\n"));
              } else {
                this.executeTree();
              }
            })
            .catch(error => {
              _newItem.isLoading = false;
              if (error.response) {
                self.$message.error("服务器错误");
              } else {
                //一些错误是在设置请求的时候触发
                self.$message.error(error.message);
              }
            });
          break;
        } else {
          this.removeMe(tree.Child[i], Id);
        }
      }
    },
    move: function() {
      var CacheModel = this.CacheModel;
      var tree = this.tree;
      if (
        CacheModel.from &&
        CacheModel.fromParent &&
        CacheModel.to &&
        CacheModel.toParent
      ) {
        //不需要移动
        if (CacheModel.fromParent.idPath == CacheModel.to.idPath) {
          this.$message({
            message: "不需要移动"
          });
          return;
        }
        if (CacheModel.to.idPath.startWith(CacheModel.from.idPath)) {
          this.$message({
            message: "自己不能移动到自己下"
          });
          return;
        }
        //记录步骤，可以后退
        this.Step.StepContent.splice(
          this.Step.Point,
          this.Step.StepContent.length - this.Step.Point
        );
        this.Step.StepContent.push({
          move: CacheModel.from.Id,
          from: CacheModel.fromParent.Id,
          to: CacheModel.to.Id
        });
        this.Step.Point++;
        var index = CacheModel.fromParent.Child.indexOf(CacheModel.from);
        this.remove(tree, CacheModel.fromParent.Id, index);
        this.add(tree, CacheModel.to.Id, CacheModel.from);
        this.executeTree(tree, 1);
        this.executeTreePost();
        //this.$message({
        //    type: 'success',
        //    message: '移动成功'
        //});
        return;
      }
    },
    remove: function(root, fromParentId, index) {
      var self = this;
      if (root.Id == fromParentId) {
        root.Child.splice(index, 1);
      } else {
        for (var i = 0; i < root.Child.length; i++) {
          self.remove(root.Child[i], fromParentId, index);
        }
      }
    },
    add: function(root, toId, from) {
      var self = this;
      if (root.Id == toId) {
        from.parentId = toId;
        root.Child.push(from);
      } else {
        for (var i = 0; i < root.Child.length; i++) {
          self.add(root.Child[i], toId, from);
        }
      }
    }
  }
};
</script>
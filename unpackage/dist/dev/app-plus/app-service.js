if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0$8 = "/static/icons/ads/idle.mp4";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$k = {
    __name: "idle",
    setup(__props, { expose: __expose }) {
      __expose();
      const goHome = () => {
        uni.reLaunch({
          url: "/pages/index/index"
        });
      };
      const __returned__ = { goHome };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(' 整屏盖住，任何点击都算"有人来了" '),
        vue.createElementVNode(
          "view",
          {
            class: "idle-page",
            onClick: $setup.goHome,
            onTouchstart: $setup.goHome
          },
          [
            vue.createElementVNode("video", {
              class: "bg-video",
              src: _imports_0$8,
              autoplay: "",
              loop: "",
              muted: "",
              controls: false,
              "show-center-play-btn": false,
              "show-fullscreen-btn": false,
              "object-fit": "cover"
            })
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesIdleIdle = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-83b0fca5"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/idle/idle.vue"]]);
  const _sfc_main$j = {
    __name: "modal-container",
    props: {
      // 是否显示弹窗
      visible: {
        type: Boolean,
        default: false
      },
      // 弹窗位置：center(居中)、top(顶部)、bottom(底部)
      position: {
        type: String,
        default: "center",
        validator: (value) => ["center", "top", "bottom"].includes(value)
      },
      // 动画类型：fade(淡入)、slide(滑入)、zoom(缩放)
      animation: {
        type: String,
        default: "fade",
        validator: (value) => ["fade", "slide", "zoom"].includes(value)
      },
      // 是否点击遮罩层关闭
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 弹窗宽度（rpx）
      width: {
        type: [String, Number],
        default: "600"
      },
      // 弹窗最大高度（rpx）
      maxHeight: {
        type: [String, Number],
        default: ""
      },
      // 弹窗圆角（rpx）
      borderRadius: {
        type: [String, Number],
        default: "24"
      },
      // 弹窗背景色
      backgroundColor: {
        type: String,
        default: "#FFFFFF"
      },
      // 遮罩层透明度（0-1）
      overlayOpacity: {
        type: Number,
        default: 0.5
      },
      // z-index 层级
      zIndex: {
        type: Number,
        default: 9999
      }
    },
    emits: ["update:visible", "open", "close", "overlay-click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      vue.useCssVars((_ctx) => ({
        "2f7b8f3c-overlayOpacity": __props.overlayOpacity,
        "2f7b8f3c-zIndex": __props.zIndex
      }));
      const props = __props;
      const emit = __emit;
      const containerStyle = vue.computed(() => {
        const style = {
          width: typeof props.width === "number" ? `${props.width}rpx` : props.width,
          backgroundColor: props.backgroundColor,
          borderRadius: typeof props.borderRadius === "number" ? `${props.borderRadius}rpx` : props.borderRadius
        };
        if (props.maxHeight) {
          style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}rpx` : props.maxHeight;
        }
        return style;
      });
      const handleOverlayClick = () => {
        if (props.closeOnClickOverlay) {
          emit("overlay-click");
          closeModal();
        }
      };
      const closeModal = () => {
        emit("update:visible", false);
        emit("close");
      };
      const openModal = () => {
        emit("update:visible", true);
        emit("open");
      };
      __expose({
        close: closeModal,
        open: openModal
      });
      const __returned__ = { props, emit, containerStyle, handleOverlayClick, closeModal, openModal, computed: vue.computed };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["modal-container-overlay", { "modal-container-fade-in": $props.visible }]),
        onClick: $setup.handleOverlayClick
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["modal-container-box", [
              `position-${$props.position}`,
              `animation-${$props.animation}`,
              { "modal-container-show": $props.visible }
            ]]),
            style: vue.normalizeStyle($setup.containerStyle),
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop"]))
          },
          [
            vue.createCommentVNode(" 头部插槽 "),
            vue.renderSlot(_ctx.$slots, "header", {}, void 0, true),
            vue.createCommentVNode(" 主体内容插槽 "),
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            vue.createCommentVNode(" 底部插槽 "),
            vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const ModalContainer = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-2f7b8f3c"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/modals/modal-container.vue"]]);
  const _imports_0$7 = "/static/icons/general/btn_general_close.svg";
  const _imports_0$6 = "/static/icons/smartAssessActivity/li-liang/btn_back.svg";
  const _sfc_main$i = {
    __name: "usage-guide-modal",
    props: {
      // 是否显示弹窗
      visible: {
        type: Boolean,
        default: false
      },
      // 指南列表数据
      guideItems: {
        type: Array,
        default: () => [
          {
            id: 1,
            title: "如何调节力臂？- 演示视频",
            image: "/static/icons/homeActivity/ic_course_01.png",
            textLabel: "文字指导"
          },
          {
            id: 2,
            title: "如何更换配件？- 演示视频",
            image: "/static/icons/homeActivity/ic_course_02.png",
            textLabel: "文字指导"
          }
        ]
      }
    },
    emits: ["update:visible", "item-click", "back", "close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const currentView = vue.ref("list");
      const currentGuide = vue.ref({});
      const handleItemClick = (item) => {
        currentGuide.value = item;
        currentView.value = "detail";
        emit("item-click", item);
      };
      const handleBack = () => {
        currentView.value = "list";
        emit("back");
      };
      const handleClose = () => {
        currentView.value = "list";
        emit("update:visible", false);
        emit("close");
      };
      __expose({
        showDetail: (item) => {
          currentGuide.value = item;
          currentView.value = "detail";
        },
        showList: () => {
          currentView.value = "list";
        }
      });
      const __returned__ = { props, emit, currentView, currentGuide, handleItemClick, handleBack, handleClose, ref: vue.ref, computed: vue.computed, ModalContainer };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock($setup["ModalContainer"], {
      visible: $props.visible,
      "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:visible", $event)),
      position: "center",
      animation: "fade",
      "overlay-opacity": 0.5,
      width: 690,
      "border-radius": 32,
      "close-on-click-overlay": false
    }, {
      default: vue.withCtx(() => [
        vue.createCommentVNode(" 列表视图 "),
        $setup.currentView === "list" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "guide-modal"
        }, [
          vue.createCommentVNode(" 头部 "),
          vue.createElementVNode("view", { class: "modal-header" }, [
            vue.createElementVNode("text", { class: "header-title" }, "使用指南"),
            vue.createElementVNode("view", {
              class: "close-btn",
              onClick: $setup.handleClose
            }, [
              vue.createElementVNode("image", {
                class: "close-icon",
                src: _imports_0$7,
                mode: "aspectFit"
              })
            ])
          ]),
          vue.createCommentVNode(" 内容卡片 "),
          vue.createElementVNode("view", { class: "content-card" }, [
            vue.createCommentVNode(" 欢迎文案 "),
            vue.createElementVNode("view", { class: "welcome-section" }, [
              vue.createElementVNode("text", { class: "welcome-title" }, "欢迎使用 tovigor 的 AI 智能健身镜"),
              vue.createElementVNode("text", { class: "welcome-subtitle" }, "请查收本产品的使用指南！")
            ]),
            vue.createCommentVNode(" 分割线 "),
            vue.createElementVNode("view", { class: "divider" }),
            vue.createCommentVNode(" 指南列表 "),
            vue.createElementVNode("view", { class: "guide-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.guideItems, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: vue.normalizeClass(["guide-item", { "guide-item-border": index < $props.guideItems.length - 1 }]),
                    onClick: ($event) => $setup.handleItemClick(item)
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "guide-item-text" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", { class: "guide-item-arrow" }, "›")
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" 详情视图 "),
            vue.createElementVNode("view", { class: "guide-detail" }, [
              vue.createCommentVNode(" 头部 "),
              vue.createElementVNode("view", { class: "detail-header" }, [
                vue.createElementVNode("view", {
                  class: "back-btn",
                  onClick: $setup.handleBack
                }, [
                  vue.createElementVNode("image", {
                    class: "back-icon",
                    src: _imports_0$6,
                    mode: "aspectFit"
                  })
                ]),
                vue.createElementVNode("text", { class: "header-title" }, "使用指南"),
                vue.createElementVNode("view", {
                  class: "close-btn",
                  onClick: $setup.handleClose
                }, [
                  vue.createElementVNode("image", {
                    class: "close-icon",
                    src: _imports_0$7,
                    mode: "aspectFit"
                  })
                ])
              ]),
              vue.createCommentVNode(" 详情内容卡片 "),
              vue.createElementVNode("view", { class: "detail-card" }, [
                vue.createElementVNode(
                  "text",
                  { class: "detail-title" },
                  vue.toDisplayString($setup.currentGuide.title),
                  1
                  /* TEXT */
                ),
                vue.createCommentVNode(" 图片容器 "),
                vue.createElementVNode("view", { class: "image-container" }, [
                  vue.createElementVNode("image", {
                    class: "guide-image",
                    src: $setup.currentGuide.image,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createCommentVNode(" 文字标签 "),
                  vue.createElementVNode("view", { class: "text-label" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "label-text" },
                      vue.toDisplayString($setup.currentGuide.textLabel || "文字指导"),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ]),
      _: 1
      /* STABLE */
    }, 8, ["visible"]);
  }
  const UsageGuideModal = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-cda377bd"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/modals/usage-guide-modal.vue"]]);
  const _imports_0$5 = "/static/icons/homeActivity/btn_usage_guide.svg";
  const _imports_1$5 = "/static/icons/homeActivity/bg_free_training.svg";
  const _imports_2$3 = "/static/icons/homeActivity/bg_body_training.svg";
  const _imports_3$2 = "/static/icons/homeActivity/bg_smart_assess.svg";
  const _imports_4$1 = "/static/icons/homeActivity/ic_games.svg";
  const _imports_5$1 = "/static/icons/homeActivity/trimming.png";
  const _sfc_main$h = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const courseList = vue.ref([
        {
          image: "/static/icons/partTrainingActivity/ic_1x.jpg",
          name: "肩部塑形训练",
          duration: "25min"
        },
        {
          image: "/static/icons/partTrainingActivity/ic_2x.jpg",
          name: "核心力量训练",
          duration: "30min"
        },
        {
          image: "/static/icons/partTrainingActivity/ic_4x.jpg",
          name: "有氧燃脂训练",
          duration: "20min"
        },
        {
          image: "/static/logo.png",
          name: "腿部训练课程",
          duration: "35min"
        },
        {
          image: "/static/logo.png",
          name: "背部强化训练",
          duration: "28min"
        }
      ]);
      const scrollHeight = vue.ref(0);
      let resizeHandler = null;
      const showGuideModal = vue.ref(false);
      const guideItems = vue.ref([
        {
          id: 1,
          title: "如何调节力臂？- 演示视频",
          image: "/static/icons/homeActivity/ic_course_01.png",
          textLabel: "文字指导"
        },
        {
          id: 2,
          title: "如何更换配件？- 演示视频",
          image: "/static/icons/homeActivity/ic_course_02.png",
          textLabel: "文字指导"
        }
      ]);
      const showUsageGuide = () => {
        showGuideModal.value = true;
      };
      const calcScrollHeight = () => {
        const { windowHeight } = uni.getSystemInfoSync();
        const instance = vue.getCurrentInstance();
        vue.nextTick(() => {
          uni.createSelectorQuery().in(instance).select(".course-scroll").boundingClientRect((rect) => {
            if (!rect)
              return;
            const h = Math.max(0, Math.floor(windowHeight - rect.top));
            scrollHeight.value = h;
          }).exec();
        });
      };
      const goToFreeTraining = () => {
        uni.navigateTo({
          url: "/pages/freeTraining/free-training"
        });
      };
      const goToPartTraining = () => {
        uni.navigateTo({
          url: "/pages/partTraining/part-training"
        });
      };
      const goToSmartAssess = () => {
        uni.navigateTo({
          url: "/pages/smartAssess/first-skip"
        });
      };
      const goToSerialTest = () => {
        uni.navigateTo({
          url: "/pages/serial-test/serial-test"
        });
      };
      vue.onMounted(() => {
        calcScrollHeight();
        if (uni.onWindowResize) {
          resizeHandler = () => calcScrollHeight();
          uni.onWindowResize(resizeHandler);
        }
      });
      vue.onBeforeUnmount(() => {
        if (uni.offWindowResize && resizeHandler) {
          uni.offWindowResize(resizeHandler);
        }
      });
      const __returned__ = { courseList, scrollHeight, get resizeHandler() {
        return resizeHandler;
      }, set resizeHandler(v) {
        resizeHandler = v;
      }, showGuideModal, guideItems, showUsageGuide, calcScrollHeight, goToFreeTraining, goToPartTraining, goToSmartAssess, goToSerialTest, ref: vue.ref, nextTick: vue.nextTick, onMounted: vue.onMounted, onBeforeUnmount: vue.onBeforeUnmount, getCurrentInstance: vue.getCurrentInstance, UsageGuideModal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部标题区域 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "header-title" }, [
          vue.createElementVNode("image", {
            class: "usage-guide-btn",
            src: _imports_0$5,
            mode: "aspectFit",
            onClick: $setup.showUsageGuide
          }),
          vue.createElementVNode("text", { class: "title-main" }, "HI,Tovigor"),
          vue.createCommentVNode(' <image class="title-icon" src="/static/icons/homeActivity/trimming.png" mode="aspectFill"></image> ')
        ]),
        vue.createElementVNode("text", { class: "title-sub" }, "欢迎来到Tovigor的健身世界，活力一触即发！")
      ]),
      vue.createCommentVNode(" 功能卡片区域 "),
      vue.createElementVNode("view", { class: "card-grid" }, [
        vue.createCommentVNode(" 自由训练 "),
        vue.createElementVNode("view", {
          class: "card-left",
          onClick: $setup.goToFreeTraining
        }, [
          vue.createElementVNode("view", { class: "card card-large card-free" }, [
            vue.createElementVNode("image", {
              class: "card-bg-img",
              src: _imports_1$5,
              mode: "aspectFill"
            }),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "自由训练"),
              vue.createElementVNode("text", { class: "card-subtitle" }, "数字力量 自由掌握")
            ])
          ])
        ]),
        vue.createCommentVNode(" 右侧卡片组 "),
        vue.createElementVNode("view", { class: "card-right" }, [
          vue.createCommentVNode(" 部位训练 "),
          vue.createElementVNode("view", {
            class: "card card-small card-body",
            onClick: $setup.goToPartTraining
          }, [
            vue.createElementVNode("image", {
              class: "card-bg-img",
              src: _imports_2$3,
              mode: "aspectFill"
            }),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "部位训练"),
              vue.createElementVNode("text", { class: "card-subtitle" }, "针对各部位的系统设计")
            ])
          ]),
          vue.createCommentVNode(" 智能评估 "),
          vue.createElementVNode("view", {
            class: "card card-small card-assess",
            onClick: $setup.goToSmartAssess
          }, [
            vue.createElementVNode("image", {
              class: "card-bg-img",
              src: _imports_3$2,
              mode: "aspectFill"
            }),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "智能评估"),
              vue.createElementVNode("text", { class: "card-subtitle" }, "定制专属自己的健康方案")
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" 娱乐休闲 + 智慧AI咨询 + 添加训练 "),
      vue.createElementVNode("view", { class: "function-row" }, [
        vue.createElementVNode("view", { class: "function-item" }, [
          vue.createElementVNode("image", {
            class: "function-icon",
            src: _imports_4$1,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "function-text" }, "娱乐休闲")
        ]),
        vue.createElementVNode("view", { class: "function-item function-middle" }, [
          vue.createElementVNode("image", {
            class: "function-avatar",
            src: _imports_5$1,
            mode: "aspectFill"
          }),
          vue.createElementVNode("text", { class: "function-text" }, "智慧AI咨询")
        ]),
        vue.createElementVNode("view", { class: "function-item function-add" }, [
          vue.createElementVNode("text", { class: "add-icon" }, "+"),
          vue.createElementVNode("text", { class: "function-text" }, "添加训练")
        ])
      ]),
      vue.createCommentVNode(" 课程推荐 "),
      vue.createElementVNode("view", { class: "course-section" }, [
        vue.createElementVNode("view", { class: "section-header" }, [
          vue.createElementVNode("text", { class: "section-title" }, "课程推荐"),
          vue.createElementVNode("view", {
            class: "serial-test-btn",
            onClick: $setup.goToSerialTest
          }, [
            vue.createElementVNode("text", { class: "serial-test-text" }, "串口测试")
          ])
        ]),
        vue.createCommentVNode(" 课程列表 - 纵向滚动，2列布局 "),
        vue.createElementVNode(
          "scroll-view",
          {
            class: "course-scroll",
            "scroll-y": "",
            "show-scrollbar": false,
            style: vue.normalizeStyle({ height: $setup.scrollHeight + "px" })
          },
          [
            vue.createElementVNode("view", { class: "course-grid" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.courseList, (course, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "course-item",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "course-image-wrapper" }, [
                      vue.createElementVNode("image", {
                        class: "course-image",
                        src: course.image,
                        mode: "aspectFill"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "play-btn" }, [
                        vue.createElementVNode("view", { class: "play-triangle" })
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "course-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "course-name" },
                        vue.toDisplayString(course.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "course-duration" },
                        vue.toDisplayString(course.duration),
                        1
                        /* TEXT */
                      )
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          4
          /* STYLE */
        )
      ]),
      vue.createCommentVNode(" 使用指南弹窗 "),
      vue.createVNode($setup["UsageGuideModal"], {
        visible: $setup.showGuideModal,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => $setup.showGuideModal = $event),
        "guide-items": $setup.guideItems
      }, null, 8, ["visible", "guide-items"])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/index/index.vue"]]);
  const ON_LOAD = "onLoad";
  const ON_READY = "onReady";
  const ON_BACK_PRESS = "onBackPress";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const onReady = /* @__PURE__ */ createLifeCycleHook(
    ON_READY,
    2
    /* HookFlags.PAGE */
  );
  const onBackPress = /* @__PURE__ */ createLifeCycleHook(
    ON_BACK_PRESS,
    2
    /* HookFlags.PAGE */
  );
  const _imports_0$4 = "/static/icons/freeTrainingActivity/bg_statBoard.png";
  const _imports_1$4 = "/static/icons/freeTrainingActivity/ic_counts.png";
  const _imports_2$2 = "/static/icons/freeTrainingActivity/ic_separate.png";
  const _imports_3$1 = "/static/icons/freeTrainingActivity/ic_train_time.png";
  const _imports_4 = "/static/icons/freeTrainingActivity/ic_calories.png";
  const _imports_5 = "/static/icons/freeTrainingActivity/ic_resistance_adjust.svg";
  const _imports_6 = "/static/icons/freeTrainingActivity/ic_decoration.png";
  const _imports_7 = "/static/icons/freeTrainingActivity/ic_power.svg";
  const UPDATE_INTERVAL = 20;
  const _sfc_main$g = {
    __name: "free-training",
    setup(__props, { expose: __expose }) {
      __expose();
      const showSafetyModal = vue.ref(false);
      const statBoard = vue.ref({
        sets: "00/00",
        duration: "00:00:00",
        calories: "00.00"
      });
      const powerOn = vue.ref(false);
      const dial = vue.ref({
        startAngle: -120,
        // 圆弧起点角度（左侧）
        endAngle: 120,
        // 圆弧终点角度（右侧）
        minValue: 0,
        // 最小力量值 = 0kg
        maxValue: 100,
        // 最大力量值 = 100kg
        currentAngle: -120,
        // 当前滑块所处角度（实时更新）
        currentValue: 0,
        // 当前力量值（实时更新）
        center: null
        // {x,y} 记录圆心，用于触摸计算
      });
      const modes = vue.ref([
        {
          key: "xiangxin",
          name: "向心等张",
          icon: "/static/icons/freeTrainingActivity/ic_force_xiangxin.png"
        },
        {
          key: "lixin",
          name: "离心等张",
          icon: "/static/icons/freeTrainingActivity/ic_force_lixin.png"
        },
        {
          key: "liuti",
          name: "流体阻力",
          icon: "/static/icons/freeTrainingActivity/ic_force_liuti.png"
        },
        {
          key: "dengsu",
          name: "等速",
          icon: "/static/icons/freeTrainingActivity/ic_force_dengsu.png"
        },
        {
          key: "tanli",
          name: "弹力",
          icon: "/static/icons/freeTrainingActivity/ic_force_tanli.png"
        },
        {
          key: "hengli",
          name: "恒力",
          icon: "/static/icons/freeTrainingActivity/ic_force_hengli.png"
        }
      ]);
      const selectedMode = vue.ref(null);
      let trainingTimer = null;
      const handleStyle = vue.computed(() => {
        return `transform: translate(-50%, -50%) rotate(${dial.value.currentAngle}deg);`;
      });
      const progressRatio = vue.computed(() => {
        const startAngle = dial.value.startAngle;
        const endAngle = dial.value.endAngle;
        const currentAngle = dial.value.currentAngle;
        return (currentAngle - startAngle) / (endAngle - startAngle);
      });
      const bottomPanelClass = vue.computed(() => {
        return powerOn.value ? "bottom-panel" : "bottom-panel bottom-panel--off";
      });
      const hasMode = vue.computed(() => {
        return selectedMode.value !== null;
      });
      const pageTitle = vue.computed(() => {
        if (!hasMode.value)
          return "自由训练";
        const m = modes.value[selectedMode.value];
        if (!m)
          return "自由训练";
        if (m.key === "liuti")
          return "流体阻力模式";
        return m.name + "模式";
      });
      vue.onMounted(() => {
        showSafetyModal.value = true;
      });
      onReady(() => {
        uni.createSelectorQuery().select(".dial-circle").boundingClientRect((data) => {
          if (!data)
            return;
          dial.value.center = {
            x: data.left + data.width / 2,
            y: data.top + data.height / 2
          };
        }).exec();
      });
      vue.onUnmounted(() => {
        if (trainingTimer) {
          clearInterval(trainingTimer);
        }
      });
      onBackPress(() => {
        if (showSafetyModal.value) {
          showSafetyModal.value = false;
          return true;
        }
        return false;
      });
      const goBack = () => {
        uni.navigateBack();
      };
      const handleModalConfirm = () => {
      };
      const togglePower = () => {
        powerOn.value = !powerOn.value;
        if (!powerOn.value) {
          dial.value.currentValue = 0;
          dial.value.currentAngle = dial.value.startAngle;
        }
      };
      const selectMode = (index) => {
        selectedMode.value = index;
        const mode = modes.value[index];
        if (mode.key === "liuti")
          ;
      };
      let lastUpdateTime = 0;
      const onDialTouch = (e) => {
        if (!powerOn.value)
          return;
        if (!dial.value.center)
          return;
        const now = Date.now();
        if (now - lastUpdateTime < UPDATE_INTERVAL)
          return;
        lastUpdateTime = now;
        const touch = e.touches[0];
        const touchX = touch.clientX || touch.x;
        const touchY = touch.clientY || touch.y;
        const dx = touchX - dial.value.center.x;
        const dy = touchY - dial.value.center.y;
        let angleRaw = Math.atan2(dy, dx) * 180 / Math.PI;
        let angle = angleRaw + 90;
        if (angle > 180) {
          angle = angle - 360;
        } else if (angle < -180) {
          angle = angle + 360;
        }
        const startAngle = dial.value.startAngle;
        const endAngle = dial.value.endAngle;
        angle = Math.max(startAngle, Math.min(angle, endAngle));
        const ratio = (angle - startAngle) / (endAngle - startAngle);
        const value = dial.value.minValue + ratio * (dial.value.maxValue - dial.value.minValue);
        dial.value.currentAngle = angle;
        dial.value.currentValue = Math.round(value);
      };
      const confirmMode = () => {
        if (!hasMode.value) {
          uni.showToast({
            title: "请先选择训练模式",
            icon: "none"
          });
          return;
        }
        const mode = modes.value[selectedMode.value];
        uni.showToast({
          title: `已选择 ${mode.name} 模式`,
          icon: "success"
        });
      };
      const __returned__ = { showSafetyModal, statBoard, powerOn, dial, modes, selectedMode, get trainingTimer() {
        return trainingTimer;
      }, set trainingTimer(v) {
        trainingTimer = v;
      }, handleStyle, progressRatio, bottomPanelClass, hasMode, pageTitle, goBack, handleModalConfirm, togglePower, selectMode, get lastUpdateTime() {
        return lastUpdateTime;
      }, set lastUpdateTime(v) {
        lastUpdateTime = v;
      }, UPDATE_INTERVAL, onDialTouch, confirmMode, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, get onReady() {
        return onReady;
      }, get onBackPress() {
        return onBackPress;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ModalGeneral = vue.resolveComponent("ModalGeneral");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
        }, ["prevent"]))
      },
      [
        vue.createCommentVNode(" 数据看板 "),
        vue.createElementVNode("view", { class: "stat-board" }, [
          vue.createElementVNode("image", {
            class: "board-bg",
            src: _imports_0$4,
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "stat-row" }, [
            vue.createCommentVNode(" 组数/次数 "),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("image", {
                class: "stat-icon",
                src: _imports_1$4,
                mode: "aspectFit"
              }),
              vue.createElementVNode("view", { class: "stat-content" }, [
                vue.createElementVNode("text", { class: "stat-label" }, "组数/次数"),
                vue.createElementVNode(
                  "text",
                  { class: "stat-value" },
                  vue.toDisplayString($setup.statBoard.sets),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("image", {
              class: "separator",
              src: _imports_2$2,
              mode: "aspectFit"
            }),
            vue.createCommentVNode(" 训练时间 "),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("image", {
                class: "stat-icon",
                src: _imports_3$1,
                mode: "aspectFit"
              }),
              vue.createElementVNode("view", { class: "stat-content" }, [
                vue.createElementVNode("text", { class: "stat-label" }, "训练时间"),
                vue.createElementVNode(
                  "text",
                  { class: "stat-value" },
                  vue.toDisplayString($setup.statBoard.duration),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("image", {
              class: "separator",
              src: _imports_2$2,
              mode: "aspectFit"
            }),
            vue.createCommentVNode(" 单量/千卡 "),
            vue.createElementVNode("view", { class: "stat-item" }, [
              vue.createElementVNode("image", {
                class: "stat-icon",
                src: _imports_4,
                mode: "aspectFit"
              }),
              vue.createElementVNode("view", { class: "stat-content" }, [
                vue.createElementVNode("text", { class: "stat-label" }, "单量/千卡"),
                vue.createElementVNode(
                  "text",
                  { class: "stat-value" },
                  vue.toDisplayString($setup.statBoard.calories),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]),
        vue.createCommentVNode(" 中央控制区：力量旋钮 + 开关 "),
        vue.createElementVNode("view", { class: "control-center" }, [
          vue.createCommentVNode(" 力量旋钮区域 "),
          vue.createElementVNode(
            "view",
            {
              class: "dial-wrapper",
              onTouchstart: $setup.onDialTouch,
              onTouchmove: vue.withModifiers($setup.onDialTouch, ["stop", "prevent"])
            },
            [
              vue.createCommentVNode(" 圆弧背景（灰色底） "),
              vue.createElementVNode(
                "image",
                {
                  class: vue.normalizeClass(["dial-arc dial-arc-bg", { "dial-arc--off": !$setup.powerOn }]),
                  src: _imports_5,
                  mode: "aspectFit"
                },
                null,
                2
                /* CLASS */
              ),
              vue.createCommentVNode(" 圆弧进度（彩色，通过遮罩显示进度） "),
              $setup.powerOn ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "dial-arc-progress-wrapper",
                  style: vue.normalizeStyle({ "--progress-angle": $setup.dial.currentAngle + 120 + "deg" })
                },
                [
                  vue.createElementVNode("image", {
                    class: "dial-arc dial-arc-active",
                    src: _imports_5,
                    mode: "aspectFit"
                  })
                ],
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 装饰图片（仅开机时显示） "),
              $setup.powerOn ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                class: "dial-decoration",
                src: _imports_6,
                mode: "aspectFit"
              })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 圆形中心区域 "),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["dial-circle", { "dial-circle--on": $setup.powerOn }])
                },
                [
                  vue.createCommentVNode(" 力量值显示 "),
                  vue.createElementVNode(
                    "text",
                    { class: "dial-value" },
                    vue.toDisplayString($setup.dial.currentValue),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "dial-unit" }, "kg"),
                  vue.createCommentVNode(" 中心开关按钮 "),
                  vue.createElementVNode("view", {
                    class: "dial-power-btn",
                    onClick: vue.withModifiers($setup.togglePower, ["stop"])
                  }, [
                    vue.createElementVNode("image", {
                      class: "power-icon",
                      src: _imports_7,
                      mode: "aspectFit"
                    })
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            32
            /* NEED_HYDRATION */
          )
        ]),
        vue.createCommentVNode(" 底部模式选择 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass($setup.bottomPanelClass)
          },
          [
            vue.createElementVNode("text", { class: "mode-title" }, "训练模式"),
            vue.createElementVNode("view", { class: "mode-grid" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.modes, (mode, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: vue.normalizeClass(["mode-item", { "selected": $setup.selectedMode === index, "disabled": !$setup.powerOn }]),
                    key: mode.key,
                    onClick: ($event) => $setup.selectMode(index)
                  }, [
                    vue.createElementVNode("image", {
                      class: "mode-icon",
                      src: mode.icon,
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "mode-name" },
                      vue.toDisplayString(mode.name),
                      1
                      /* TEXT */
                    )
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createCommentVNode(" 模式确认按钮 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["mode-confirm-btn", { "active": $setup.hasMode && $setup.powerOn }]),
                onClick: $setup.confirmMode
              },
              [
                vue.createElementVNode(
                  "text",
                  { class: "btn-text" },
                  vue.toDisplayString($setup.hasMode ? $setup.modes[$setup.selectedMode].name + "训练" : "请选择训练模式"),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createCommentVNode(" 训练安全须知弹窗 "),
        vue.createVNode(_component_ModalGeneral, {
          show: $setup.showSafetyModal,
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => $setup.showSafetyModal = $event),
          title: "训练安全须知",
          "confirm-text": "我知道了",
          onConfirm: $setup.handleModalConfirm
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "safety-content" }, [
              vue.createElementVNode("view", { class: "safety-item" }, "1. 进行力量训练前，请先进行基础热身"),
              vue.createElementVNode("view", { class: "safety-item" }, "2. 使用力量力臂进行训练前，请确认力臂档位已锁好"),
              vue.createElementVNode("view", { class: "safety-item" }, "3. 请勿将整个人或其他重物挂在力臂上"),
              vue.createElementVNode("view", { class: "safety-item" }, "4. 请勿用硬物击打设备屏幕"),
              vue.createElementVNode("view", { class: "safety-item" }, "5. 结束训练后，请及时将力臂还原至初始状态并锁好")
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show"])
      ],
      32
      /* NEED_HYDRATION */
    );
  }
  const PagesFreeTrainingFreeTraining = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-97b8fabd"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/freeTraining/free-training.vue"]]);
  const _sfc_main$f = {
    __name: "common-back-button",
    props: {
      // 是否使用默认返回行为（uni.navigateBack）
      useDefault: {
        type: Boolean,
        default: true
      }
    },
    emits: ["click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emits = __emit;
      const handleClick = () => {
        emits("click");
        if (props.useDefault) {
          uni.navigateBack();
        }
      };
      const __returned__ = { props, emits, handleClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "back-btn",
      onClick: $setup.handleClick
    }, [
      vue.createElementVNode("image", {
        class: "back-icon",
        src: _imports_0$6,
        mode: "widthFix"
      })
    ]);
  }
  const CommonBackButton = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-050e9f87"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/ui-box/common-back-button.vue"]]);
  const _sfc_main$e = {
    __name: "filter-pill",
    props: {
      label: { type: String, required: true },
      // “性别”
      value: { type: String, default: "" },
      // “男 / 女 / 全部”
      active: { type: Boolean, default: false },
      showArrow: { type: Boolean, default: true }
    },
    emits: ["click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emits = __emit;
      const handleClick = () => {
        emits("click");
      };
      const __returned__ = { props, emits, handleClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["filter-pill", { "filter-pill--active": $props.active }]),
        onClick: $setup.handleClick
      },
      [
        vue.createElementVNode(
          "text",
          { class: "label" },
          vue.toDisplayString($props.label),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "right-wrap" }, [
          vue.createCommentVNode(" 右侧内容：当前选中值（可选） "),
          $props.value ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: "value"
            },
            vue.toDisplayString($props.value),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 下拉箭头 "),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "arrow-icon"
          })) : vue.createCommentVNode("v-if", true)
        ])
      ],
      2
      /* CLASS */
    );
  }
  const FilterPill = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-2ff79513"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/ui-box/filter-pill.vue"]]);
  const _imports_0$3 = "/static/icons/partTrainingActivity/AI_coach_Vince.png";
  const _sfc_main$d = {
    __name: "training-filter-sidebar",
    props: {
      // 由父组件传入当前筛选状态
      filters: {
        type: Object,
        default: () => ({
          gender: [],
          goal: [],
          level: [],
          part: [],
          method: [],
          duration: [],
          equipment: [],
          coach: []
        })
      }
    },
    emits: ["changeFilter"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emits = __emit;
      const expanded = vue.ref({
        gender: false,
        goal: false,
        level: false,
        part: false,
        method: false,
        duration: false,
        equipment: false,
        coach: false
      });
      const genderOptions = [
        { value: "all", label: "全部" },
        { value: "female", label: "女性" },
        { value: "male", label: "男性" }
      ];
      const goalOptions = [
        { value: "fat-loss", label: "减脂塑形" },
        { value: "strength", label: "力量增强" },
        { value: "shaping", label: "塑形紧致" },
        { value: "cardio", label: "有氧训练" },
        { value: "flexibility", label: "柔韧拉伸" }
      ];
      const levelOptions = [
        { value: "beginner", label: "初级" },
        { value: "intermediate", label: "中级" },
        { value: "advanced", label: "高级" }
      ];
      const partOptions = [
        { value: "shoulder", label: "肩部" },
        { value: "chest", label: "胸部" },
        { value: "back", label: "背部" },
        { value: "arm", label: "手臂" },
        { value: "core", label: "核心" },
        { value: "leg", label: "腿部" },
        { value: "glute", label: "臀部" }
      ];
      const methodOptions = [
        { value: "resistance", label: "阻力训练" },
        { value: "hiit", label: "HIIT" },
        { value: "circuit", label: "循环训练" },
        { value: "bodyweight", label: "自重训练" }
      ];
      const durationOptions = [
        { value: "0-15", label: "15min以内" },
        { value: "15-30", label: "15-30min" },
        { value: "30-45", label: "30-45min" },
        { value: "45+", label: "45min以上" }
      ];
      const equipmentOptions = [
        { value: "none", label: "无器械" },
        { value: "dumbbell", label: "哑铃" },
        { value: "barbell", label: "杠铃" },
        { value: "kettlebell", label: "壶铃" },
        { value: "resistance-band", label: "弹力带" },
        { value: "trx", label: "TRX" }
      ];
      const coachOptions = [
        {
          value: "vince",
          label: "Vince 艾斯",
          avatar: "/static/icons/partTrainingActivity/AI_coach_Vince.png"
        },
        {
          value: "vera",
          label: "Vera 维拉",
          avatar: "/static/icons/partTrainingActivity/AI_coach_Vera.png"
        }
      ];
      const toggleSection = (key) => {
        expanded.value[key] = !expanded.value[key];
      };
      const onOptionClick = (groupKey, option) => {
        const currentValues = props.filters[groupKey] || [];
        let newValues = [];
        if (currentValues.includes(option.value)) {
          newValues = currentValues.filter((v) => v !== option.value);
        } else {
          newValues = [...currentValues, option.value];
        }
        emits("changeFilter", {
          key: groupKey,
          values: newValues,
          option
        });
      };
      const isOptionActive = (groupKey, optionValue) => {
        return (props.filters[groupKey] || []).includes(optionValue);
      };
      const getSelectedLabels = (groupKey, options) => {
        const selected = props.filters[groupKey] || [];
        if (selected.length === 0)
          return "";
        const labels = options.filter((opt) => selected.includes(opt.value)).map((opt) => opt.label);
        return labels.join("、");
      };
      const goToAIRecommend = () => {
        uni.navigateTo({
          url: "/pages/partTraining/components/ai-recommend"
        });
      };
      const __returned__ = { props, emits, expanded, genderOptions, goalOptions, levelOptions, partOptions, methodOptions, durationOptions, equipmentOptions, coachOptions, toggleSection, onOptionClick, isOptionActive, getSelectedLabels, goToAIRecommend, ref: vue.ref, FilterPill };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "sidebar" }, [
      vue.createCommentVNode(" 顶部 AI 推荐头像块 "),
      vue.createElementVNode("view", { class: "ai-header" }, [
        vue.createElementVNode("view", {
          class: "ai-recommend-btn",
          onClick: $setup.goToAIRecommend
        }, [
          vue.createElementVNode("image", {
            class: "ai-avatar",
            src: _imports_0$3,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "ai-text" }, "AI推荐")
        ])
      ]),
      vue.createCommentVNode(" 筛选项列表 "),
      vue.createElementVNode("scroll-view", {
        class: "filter-scroll",
        "scroll-y": "",
        "show-scrollbar": false
      }, [
        vue.createElementVNode("view", { class: "filter-list" }, [
          vue.createCommentVNode(" 筛选 - 不可点击的标题 "),
          vue.createElementVNode("view", { class: "filter-title" }, [
            vue.createElementVNode("text", { class: "filter-title-text" }, "筛选")
          ]),
          vue.createCommentVNode(" 性别 "),
          vue.createVNode($setup["FilterPill"], {
            label: "性别",
            active: $setup.expanded.gender,
            showArrow: true,
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.toggleSection("gender"))
          }, null, 8, ["active"]),
          $setup.expanded.gender ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.genderOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("gender", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("gender", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 目的 "),
          vue.createVNode($setup["FilterPill"], {
            label: "目的",
            active: $setup.expanded.goal,
            showArrow: true,
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.toggleSection("goal"))
          }, null, 8, ["active"]),
          $setup.expanded.goal ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.goalOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("goal", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("goal", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 难度 "),
          vue.createVNode($setup["FilterPill"], {
            label: "难度",
            active: $setup.expanded.level,
            showArrow: true,
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.toggleSection("level"))
          }, null, 8, ["active"]),
          $setup.expanded.level ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.levelOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("level", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("level", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 部位 "),
          vue.createVNode($setup["FilterPill"], {
            label: "部位",
            active: $setup.expanded.part,
            showArrow: true,
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.toggleSection("part"))
          }, null, 8, ["active"]),
          $setup.expanded.part ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.partOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("part", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("part", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 训练方式 "),
          vue.createVNode($setup["FilterPill"], {
            label: "训练方式",
            active: $setup.expanded.method,
            showArrow: true,
            onClick: _cache[4] || (_cache[4] = ($event) => $setup.toggleSection("method"))
          }, null, 8, ["active"]),
          $setup.expanded.method ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 4,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.methodOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("method", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("method", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 时长 "),
          vue.createVNode($setup["FilterPill"], {
            label: "时长",
            active: $setup.expanded.duration,
            showArrow: true,
            onClick: _cache[5] || (_cache[5] = ($event) => $setup.toggleSection("duration"))
          }, null, 8, ["active"]),
          $setup.expanded.duration ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 5,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.durationOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("duration", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("duration", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 配件 "),
          vue.createVNode($setup["FilterPill"], {
            label: "配件",
            active: $setup.expanded.equipment,
            showArrow: true,
            onClick: _cache[6] || (_cache[6] = ($event) => $setup.toggleSection("equipment"))
          }, null, 8, ["active"]),
          $setup.expanded.equipment ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 6,
            class: "filter-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.equipmentOptions, (option) => {
                return vue.createElementVNode("view", {
                  key: option.value,
                  class: vue.normalizeClass(["option-chip", { "option-chip--active": $setup.isOptionActive("equipment", option.value) }]),
                  onClick: ($event) => $setup.onOptionClick("equipment", option)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "option-text" },
                    vue.toDisplayString(option.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" AI教练 "),
          vue.createVNode($setup["FilterPill"], {
            label: "AI教练",
            active: $setup.expanded.coach,
            showArrow: true,
            onClick: _cache[7] || (_cache[7] = ($event) => $setup.toggleSection("coach"))
          }, null, 8, ["active"]),
          $setup.expanded.coach ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 7,
            class: "coach-options"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.coachOptions, (coach) => {
                return vue.createElementVNode("view", {
                  key: coach.value,
                  class: vue.normalizeClass(["coach-card", { "coach-card--active": $setup.isOptionActive("coach", coach.value) }]),
                  onClick: ($event) => $setup.onOptionClick("coach", coach)
                }, [
                  vue.createElementVNode("image", {
                    class: "coach-avatar",
                    src: coach.avatar,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    { class: "coach-name" },
                    vue.toDisplayString(coach.label),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const TrainingFilterSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-ebd14bbd"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/partTraining/components/training-filter-sidebar.vue"]]);
  const _sfc_main$c = {
    __name: "training-course-card",
    props: {
      course: {
        type: Object,
        required: true
        // 示例：
        // {
        //   id: 1,
        //   title: '美人肩塑形',
        //   duration: '15min',
        //   cover: '/static/courses/shoulder1.jpg',
        //   tags: ['减脂塑形', '中等', '三角肌后束']
        // }
      }
    },
    emits: ["click", "play"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const tagLine = vue.computed(() => {
        const tags = props.course && props.course.tags;
        if (!tags || !tags.length)
          return "";
        return tags.join(" ｜ ");
      });
      const emits = __emit;
      const handleClick = () => {
        emits("click", props.course);
      };
      const handlePlay = () => {
        emits("play", props.course);
      };
      const __returned__ = { props, tagLine, emits, handleClick, handlePlay, computed: vue.computed };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "course-card",
      onClick: $setup.handleClick
    }, [
      vue.createCommentVNode(" 封面区域 "),
      vue.createElementVNode("view", { class: "cover-wrap" }, [
        vue.createElementVNode("image", {
          class: "cover-img",
          src: $props.course.cover,
          mode: "aspectFill"
        }, null, 8, ["src"]),
        vue.createCommentVNode(" 右上角播放按钮 "),
        vue.createElementVNode("view", {
          class: "play-btn",
          onClick: vue.withModifiers($setup.handlePlay, ["stop"])
        }, [
          vue.createElementVNode("view", { class: "play-icon-triangle" })
        ])
      ]),
      vue.createCommentVNode(" 文本区域 "),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "title-row" }, [
          vue.createElementVNode(
            "text",
            {
              class: "title",
              "number-of-lines": 1
            },
            vue.toDisplayString($props.course.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "duration" },
            vue.toDisplayString($props.course.duration),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 标签行：合并成一行 "),
        $setup.tagLine ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tag-row"
        }, [
          vue.createElementVNode(
            "text",
            { class: "tag-text" },
            vue.toDisplayString($setup.tagLine),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const TrainingCourseCard = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-cf2e1a6c"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/course-list/training-course-card.vue"]]);
  const _sfc_main$b = {
    __name: "part-training",
    setup(__props, { expose: __expose }) {
      __expose();
      const searchKeyword = vue.ref("");
      const filters = vue.ref({
        gender: [],
        goal: [],
        level: [],
        part: [],
        method: [],
        duration: [],
        equipment: [],
        coach: []
      });
      const courseList = vue.ref([
        {
          id: 1,
          title: "美人肩塑形",
          duration: "15min",
          cover: "/static/icons/partTrainingActivity/course_pic_01.jpg",
          tags: ["减脂塑形", "中等", "三角肌后束"]
        },
        {
          id: 2,
          title: "基础臀部塑形",
          duration: "45min",
          cover: "/static/icons/partTrainingActivity/course_pic_02.jpg",
          tags: ["塑形紧致", "较难", "臀大肌"]
        },
        {
          id: 3,
          title: "肩部肌群训练",
          duration: "25min",
          cover: "/static/icons/partTrainingActivity/course_pic_03.jpg",
          tags: ["力量增强", "中等", "三角肌外侧"]
        },
        {
          id: 4,
          title: "美背新训练",
          duration: "30min",
          cover: "/static/icons/partTrainingActivity/course_pic_04.jpg",
          tags: ["塑形紧致", "中等", "背阔肌"]
        },
        {
          id: 5,
          title: "爆发腿部燃脂",
          duration: "20min",
          cover: "/static/icons/partTrainingActivity/course_pic_05.jpg",
          tags: ["高效燃脂", "较难", "股四头肌"]
        },
        {
          id: 6,
          title: "核心塑型进阶",
          duration: "18min",
          cover: "/static/icons/partTrainingActivity/course_pic_06.jpg",
          tags: ["核心稳定", "中等", "腹横肌"]
        },
        {
          id: 7,
          title: "蜜桃臀养成",
          duration: "35min",
          cover: "/static/icons/partTrainingActivity/course_pic_01.jpg",
          tags: ["臀部塑形", "中等", "臀中肌"]
        },
        {
          id: 8,
          title: "全身燃脂HIIT",
          duration: "22min",
          cover: "/static/icons/partTrainingActivity/course_pic_02.jpg",
          tags: ["高效燃脂", "较难", "全身"]
        },
        {
          id: 9,
          title: "手臂线条雕刻",
          duration: "28min",
          cover: "/static/icons/partTrainingActivity/course_pic_03.jpg",
          tags: ["力量增强", "中等", "肱二头肌"]
        },
        {
          id: 10,
          title: "腹肌撕裂者",
          duration: "16min",
          cover: "/static/icons/partTrainingActivity/course_pic_04.jpg",
          tags: ["核心强化", "较难", "腹直肌"]
        }
      ]);
      const handleSearchConfirm = (event) => {
        searchKeyword.value = event.detail.value;
        uni.showToast({
          title: "搜索功能开发中",
          icon: "none"
        });
      };
      const handleCourseClick = (course) => {
        uni.navigateTo({
          url: "/pages/partTraining/part-training-detail?id=" + course.id
        });
      };
      const handleCoursePlay = (course) => {
        uni.showToast({
          title: `播放 ${course.title}`,
          icon: "none"
        });
      };
      const handleFilterChange = (data) => {
        formatAppLog("log", "at pages/partTraining/part-training.vue:176", "筛选变更:", data);
        filters.value[data.key] = data.values;
        uni.showToast({
          title: `筛选: ${data.option.label}`,
          icon: "none"
        });
      };
      const __returned__ = { searchKeyword, filters, courseList, handleSearchConfirm, handleCourseClick, handleCoursePlay, handleFilterChange, ref: vue.ref, CommonBackButton, TrainingFilterSidebar, TrainingCourseCard };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createVNode($setup["CommonBackButton"], { class: "back-btn-position" }),
        vue.createElementVNode("text", { class: "header-title" }, "部位训练")
      ]),
      vue.createCommentVNode(" 主体内容：左右两列 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 左列：sidebar "),
        vue.createVNode($setup["TrainingFilterSidebar"], {
          class: "sidebar",
          filters: $setup.filters,
          onChangeFilter: $setup.handleFilterChange
        }, null, 8, ["filters"]),
        vue.createCommentVNode(" 右列：main-column "),
        vue.createElementVNode("view", { class: "main-column" }, [
          vue.createCommentVNode(" 搜索栏 "),
          vue.createElementVNode("view", { class: "search-bar" }, [
            vue.createElementVNode("view", { class: "search-box" }, [
              vue.createElementVNode("view", { class: "search-icon" }),
              vue.createElementVNode(
                "input",
                {
                  class: "search-input",
                  type: "text",
                  placeholder: "搜索训练课程...",
                  "placeholder-style": "color: #B0B0B0; font-size: 24rpx;",
                  "confirm-type": "search",
                  onConfirm: $setup.handleSearchConfirm
                },
                null,
                32
                /* NEED_HYDRATION */
              )
            ])
          ]),
          vue.createCommentVNode(" 课程列表 "),
          vue.createElementVNode("scroll-view", {
            class: "course-scroll",
            "scroll-y": "true",
            "show-scrollbar": false
          }, [
            vue.createElementVNode("view", { class: "course-grid" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.courseList, (course) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: course.id,
                    class: "course-item"
                  }, [
                    vue.createVNode($setup["TrainingCourseCard"], {
                      course,
                      onClick: $setup.handleCourseClick,
                      onPlay: $setup.handleCoursePlay
                    }, null, 8, ["course"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])
      ])
    ]);
  }
  const PagesPartTrainingPartTraining = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-342360d0"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/partTraining/part-training.vue"]]);
  const _sfc_main$a = {
    __name: "part-course-detail",
    props: {
      course: {
        type: Object,
        required: true
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const startTraining = () => {
        formatAppLog("log", "at pages/partTraining/components/part-course-detail.vue:127", "开始训练课程:", props.course.title);
        uni.showToast({
          title: "开始训练功能开发中",
          icon: "none"
        });
      };
      const __returned__ = { props, startTraining, CommonBackButton };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "course-detail" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createVNode($setup["CommonBackButton"], { class: "back-btn-position" }),
        vue.createElementVNode(
          "text",
          { class: "header-title" },
          vue.toDisplayString($props.course.title),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 主要内容区域 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 封面卡片区域 "),
        vue.createElementVNode("view", { class: "cover-card" }, [
          vue.createElementVNode("view", { class: "cover-section" }, [
            vue.createElementVNode("image", {
              class: "cover-image",
              src: $props.course.cover,
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createCommentVNode(" 暗角渐变蒙层 "),
            vue.createElementVNode("view", { class: "cover-overlay" }),
            vue.createCommentVNode('课程简介卡片 intro-card\r\n						这是一个浮动在封面图右上角的白色半透明卡片\r\n						结构：白色卡片容器 > 彩色横线 > "课程简介"标题 > 简介文字内容 \r\n						装饰性彩色横线（橙红色渐变） intro-line\r\n						卡片标题文字："课程简介"  intro-title\r\n						卡片正文内容：显示课程的详细介绍文字  intro-text '),
            vue.createElementVNode("view", { class: "intro-card" }, [
              vue.createElementVNode("view", { class: "intro-line" }),
              vue.createElementVNode("text", { class: "intro-title" }, "课程简介"),
              vue.createElementVNode(
                "text",
                { class: "intro-text" },
                vue.toDisplayString($props.course.intro),
                1
                /* TEXT */
              )
            ]),
            vue.createCommentVNode(" 标签和时长行（在封面底部） "),
            vue.createElementVNode("view", { class: "tags-duration-overlay" }, [
              vue.createElementVNode("view", { class: "tags-wrap" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.course.tags, (tag, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: index },
                      [
                        vue.createElementVNode(
                          "text",
                          { class: "tag-item" },
                          vue.toDisplayString(tag),
                          1
                          /* TEXT */
                        ),
                        index < $props.course.tags.length - 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "tag-divider"
                        })) : vue.createCommentVNode("v-if", true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode(
                "text",
                { class: "duration-text" },
                vue.toDisplayString($props.course.duration),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        vue.createCommentVNode(" 底部内容区域 "),
        vue.createElementVNode("view", { class: "bottom-content" }, [
          vue.createCommentVNode(" 注意事项卡片 "),
          vue.createElementVNode("view", { class: "notice-card" }, [
            vue.createElementVNode("view", { class: "notice-header" }, [
              vue.createElementVNode("view", { class: "notice-icon" }),
              vue.createElementVNode("text", { class: "notice-title" }, "注意事项")
            ]),
            vue.createElementVNode("view", { class: "notice-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.course.noticeList, (notice, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: "notice-item"
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "notice-number" },
                      vue.toDisplayString(index + 1) + ".",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "notice-content" },
                      vue.toDisplayString(notice),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createCommentVNode(" 动作预览区域 "),
          vue.createElementVNode("view", { class: "preview-section" }, [
            vue.createElementVNode("text", { class: "preview-title" }, "动作预览"),
            vue.createElementVNode("view", { class: "preview-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.course.previews.slice(0, 4), (preview) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: preview.id,
                    class: "preview-item"
                  }, [
                    vue.createElementVNode("image", {
                      class: "preview-image",
                      src: preview.cover,
                      mode: "aspectFill"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "preview-name" },
                      vue.toDisplayString(preview.name),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" 底部开始训练按钮 "),
      vue.createElementVNode("view", { class: "bottom-bar" }, [
        vue.createElementVNode("view", {
          class: "start-btn",
          onClick: $setup.startTraining
        }, [
          vue.createElementVNode("text", { class: "start-btn-text" }, "开始训练")
        ])
      ])
    ]);
  }
  const PartCourseDetail = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-a70b0841"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/partTraining/components/part-course-detail.vue"]]);
  const _sfc_main$9 = {
    __name: "part-training-detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const course = vue.ref(null);
      const allCourses = [
        {
          id: 1,
          title: "美人肩塑形",
          duration: "15min",
          cover: "/static/icons/partTrainingActivity/course_pic_01.jpg",
          tags: ["减脂塑形", "中等", "三角肌后束"],
          intro: "本课程专注于肩部线条雕刻，通过科学的训练动作帮助你打造迷人的肩部曲线。适合有一定训练基础的学员，每周训练2-3次效果最佳。",
          noticeList: [
            "训练前请充分热身，特别是肩关节部位",
            "如有肩部伤病史，请咨询医生后再进行训练",
            "动作过程中保持核心收紧，避免借力",
            "感到疼痛时立即停止，不要勉强完成"
          ],
          previews: [
            { id: 1, name: "侧平举", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" },
            { id: 2, name: "俯身飞鸟", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" },
            { id: 3, name: "肩推举", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" },
            { id: 4, name: "前平举", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 5, name: "拉力器", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" }
          ]
        },
        {
          id: 2,
          title: "基础臀部塑形",
          duration: "45min",
          cover: "/static/icons/partTrainingActivity/course_pic_02.jpg",
          tags: ["塑形紧致", "较难", "臀大肌"],
          intro: "系统化的臀部训练课程，帮助你构建饱满有力的臀部线条。课程包含多角度臀部激活动作，适合想要提升臀部形态的训练者。",
          noticeList: [
            "训练前务必进行臀部激活练习",
            "注意动作顶峰收缩，充分感受臀部发力",
            "膝盖与脚尖保持同一方向，避免内扣",
            "训练后进行充分拉伸，促进恢复"
          ],
          previews: [
            { id: 1, name: "臀桥", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" },
            { id: 2, name: "深蹲", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" },
            { id: 3, name: "保加利亚蹲", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 4, name: "硬拉", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" }
          ]
        },
        {
          id: 3,
          title: "肩部肌群训练",
          duration: "25min",
          cover: "/static/icons/partTrainingActivity/course_pic_03.jpg",
          tags: ["力量增强", "中等", "三角肌外侧"],
          intro: "全面发展肩部三角肌的综合训练课程，通过多角度刺激帮助你打造立体饱满的肩部。",
          noticeList: [
            "肩部训练需要严格控制重量，避免代偿",
            "每组之间充分休息，保证动作质量",
            "训练频率建议每周2次，给予充分恢复时间"
          ],
          previews: [
            { id: 1, name: "哑铃推举", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" },
            { id: 2, name: "侧平举", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 3, name: "反向飞鸟", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" }
          ]
        },
        {
          id: 4,
          title: "美背新训练",
          duration: "30min",
          cover: "/static/icons/partTrainingActivity/course_pic_04.jpg",
          tags: ["塑形紧致", "中等", "背阔肌"],
          intro: "针对背部线条打造的专项课程，帮助你拥有性感的背部曲线和良好的体态。",
          noticeList: [
            "背部训练重点在于顶峰收缩和肌肉感受",
            "保持肩胛骨后缩下沉，避免耸肩",
            "呼吸节奏要配合动作，发力时呼气"
          ],
          previews: [
            { id: 1, name: "高位下拉", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 2, name: "坐姿划船", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" },
            { id: 3, name: "俯身划船", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" }
          ]
        },
        {
          id: 5,
          title: "爆发腿部燃脂",
          duration: "20min",
          cover: "/static/icons/partTrainingActivity/course_pic_05.jpg",
          tags: ["高效燃脂", "较难", "股四头肌"],
          intro: "高强度间歇训练模式的腿部课程，在锻炼腿部肌肉的同时实现高效燃脂。",
          noticeList: [
            "这是高强度训练，请确保身体状况良好",
            "训练中保持水分补充",
            "如感到头晕不适请立即停止休息",
            "建议有一定训练基础后再尝试"
          ],
          previews: [
            { id: 1, name: "跳跃深蹲", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" },
            { id: 2, name: "箭步蹲", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" },
            { id: 3, name: "波比跳", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" }
          ]
        },
        {
          id: 6,
          title: "核心塑型进阶",
          duration: "18min",
          cover: "/static/icons/partTrainingActivity/course_pic_06.jpg",
          tags: ["核心稳定", "中等", "腹横肌"],
          intro: "进阶版核心训练课程，不仅练表层腹肌，更注重深层核心肌群的激活和强化。",
          noticeList: [
            "核心训练重在质量而非数量",
            "保持腰椎中立位，避免过度拱背",
            "呼吸与动作配合，不要憋气"
          ],
          previews: [
            { id: 1, name: "平板支撑", cover: "/static/icons/partTrainingActivity/course_pic_06.jpg" },
            { id: 2, name: "俄罗斯转体", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" },
            { id: 3, name: "死虫式", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" }
          ]
        },
        {
          id: 7,
          title: "蜜桃臀养成",
          duration: "35min",
          cover: "/static/icons/partTrainingActivity/course_pic_01.jpg",
          tags: ["臀部塑形", "中等", "臀中肌"],
          intro: "专注臀部上缘和外侧的针对性训练，帮助你打造饱满翘挺的蜜桃臀。",
          noticeList: [
            "训练前进行臀部激活非常重要",
            "动作过程中避免腰部代偿",
            "顶峰收缩保持1-2秒效果更佳"
          ],
          previews: [
            { id: 1, name: "蚌式开合", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" },
            { id: 2, name: "侧卧抬腿", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" },
            { id: 3, name: "单腿臀桥", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" }
          ]
        },
        {
          id: 8,
          title: "全身燃脂HIIT",
          duration: "22min",
          cover: "/static/icons/partTrainingActivity/course_pic_02.jpg",
          tags: ["高效燃脂", "较难", "全身"],
          intro: "高强度间歇训练，短时间内最大化燃脂效果，适合时间紧张但想要高效训练的人群。",
          noticeList: [
            "HIIT强度大，建议有氧基础较好后再尝试",
            "训练中及时补水",
            "若感到心跳过快或不适请立即停止",
            "每周不超过3次HIIT训练"
          ],
          previews: [
            { id: 1, name: "开合跳", cover: "/static/icons/partTrainingActivity/course_pic_02.jpg" },
            { id: 2, name: "高抬腿", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" },
            { id: 3, name: "波比跳", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 4, name: "登山跑", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" }
          ]
        },
        {
          id: 9,
          title: "手臂线条雕刻",
          duration: "28min",
          cover: "/static/icons/partTrainingActivity/course_pic_03.jpg",
          tags: ["力量增强", "中等", "肱二头肌"],
          intro: "针对手臂线条打造的专项课程，包含肱二头肌和肱三头肌的全面训练。",
          noticeList: [
            "手臂训练注重动作规范，避免借力摇晃",
            "控制离心过程，缓慢下放",
            "每组做到力竭前1-2个保证安全"
          ],
          previews: [
            { id: 1, name: "哑铃弯举", cover: "/static/icons/partTrainingActivity/course_pic_03.jpg" },
            { id: 2, name: "三头臂屈伸", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 3, name: "锤式弯举", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" }
          ]
        },
        {
          id: 10,
          title: "腹肌撕裂者",
          duration: "16min",
          cover: "/static/icons/partTrainingActivity/course_pic_04.jpg",
          tags: ["核心强化", "较难", "腹直肌"],
          intro: "高强度腹部训练课程，通过多种变化动作全方位刺激腹部肌群，打造清晰腹肌线条。",
          noticeList: [
            "腹部训练需要配合饮食控制才能显现",
            "动作过程中下背部紧贴地面",
            "颈部放松，避免用手拉头部",
            "训练后进行腹部拉伸"
          ],
          previews: [
            { id: 1, name: "卷腹", cover: "/static/icons/partTrainingActivity/course_pic_04.jpg" },
            { id: 2, name: "抬腿", cover: "/static/icons/partTrainingActivity/course_pic_05.jpg" },
            { id: 3, name: "自行车卷腹", cover: "/static/icons/partTrainingActivity/course_pic_06.jpg" },
            { id: 4, name: "平板支撑", cover: "/static/icons/partTrainingActivity/course_pic_01.jpg" }
          ]
        }
      ];
      onLoad((options) => {
        const courseId = parseInt(options.id);
        course.value = allCourses.find((c) => c.id === courseId);
        if (!course.value) {
          uni.showToast({
            title: "课程不存在",
            icon: "none"
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }
      });
      const __returned__ = { course, allCourses, ref: vue.ref, get onLoad() {
        return onLoad;
      }, PartCourseDetail };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "detail-page" }, [
      $setup.course ? (vue.openBlock(), vue.createBlock($setup["PartCourseDetail"], {
        key: 0,
        course: $setup.course
      }, null, 8, ["course"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "loading"
      }, "加载中..."))
    ]);
  }
  const PagesPartTrainingPartTrainingDetail = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-436b7f41"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/partTraining/part-training-detail.vue"]]);
  const _imports_0$2 = "/static/icons/smartAssessActivity/firstSkip/advertising_board.png";
  const _imports_1$3 = "/static/icons/smartAssessActivity/firstSkip/bg_jineng.svg";
  const _imports_2$1 = "/static/icons/smartAssessActivity/firstSkip/bg_zishi.svg";
  const _imports_3 = "/static/icons/smartAssessActivity/firstSkip/bg_liliang.svg";
  const _sfc_main$8 = {
    __name: "first-skip",
    setup(__props, { expose: __expose }) {
      __expose();
      const goToSkillAssess = () => {
        uni.navigateTo({
          url: "/pages/smartAssess/body-function-assess"
        });
      };
      const goToPostureAssess = () => {
        uni.showToast({
          title: "体态姿势评估",
          icon: "none"
        });
      };
      const goToStrengthAssess = () => {
        uni.navigateTo({
          url: "/pages/smartAssess/strength-assess"
        });
      };
      const __returned__ = { goToSkillAssess, goToPostureAssess, goToStrengthAssess };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部广告图 "),
      vue.createElementVNode("view", { class: "ad-banner" }, [
        vue.createElementVNode("image", {
          class: "ad-image",
          src: _imports_0$2,
          mode: "aspectFill"
        })
      ]),
      vue.createCommentVNode(" 评估卡片列表 "),
      vue.createElementVNode("view", { class: "assess-cards" }, [
        vue.createCommentVNode(" 身体机能卡片 "),
        vue.createElementVNode("view", {
          class: "card card-skill",
          onClick: $setup.goToSkillAssess
        }, [
          vue.createElementVNode("image", {
            class: "card-bg",
            src: _imports_1$3,
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "card-content" }, [
            vue.createElementVNode("text", { class: "card-title" }, "身体机能"),
            vue.createElementVNode("text", { class: "card-desc" }, "请按照指示运动体能测试并身体各项机能分析")
          ])
        ]),
        vue.createCommentVNode(" 体态姿势卡片 "),
        vue.createElementVNode("view", {
          class: "card card-posture",
          onClick: $setup.goToPostureAssess
        }, [
          vue.createElementVNode("image", {
            class: "card-bg",
            src: _imports_2$1,
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "card-content" }, [
            vue.createElementVNode("text", { class: "card-title" }, "体态姿势"),
            vue.createElementVNode("text", { class: "card-desc" }, "通过AI拍摄并行人体体态姿势全方位分析")
          ])
        ]),
        vue.createCommentVNode(" 部位力量卡片 "),
        vue.createElementVNode("view", {
          class: "card card-strength",
          onClick: $setup.goToStrengthAssess
        }, [
          vue.createElementVNode("image", {
            class: "card-bg",
            src: _imports_3,
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "card-content" }, [
            vue.createElementVNode("text", { class: "card-title" }, "部位力量"),
            vue.createElementVNode("text", { class: "card-desc" }, "进行六个部位的评估力量评估")
          ])
        ])
      ])
    ]);
  }
  const PagesSmartAssessFirstSkip = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-09078c8c"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/smartAssess/first-skip.vue"]]);
  const _sfc_main$7 = {
    __name: "step-bar",
    props: {
      totalSteps: {
        type: Number,
        // 总步骤数
        required: true
      },
      currentStep: {
        type: Number,
        // 当前步骤（从1开始计数，如currentStep=1表示第1步完成）
        required: true
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "step-bar" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.totalSteps, (item, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: index,
              class: vue.normalizeClass(["step-item", { "step-item-active": index < $props.currentStep }])
            },
            null,
            2
            /* CLASS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const StepBar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-5b9e5f0d"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/ui-box/step-bar.vue"]]);
  const _imports_0$1 = "/static/icons/smartAssessActivity/li-liang/pop-up_elementA.png";
  const _imports_1$2 = "/static/icons/smartAssessActivity/li-liang/pop-up_elementB.png";
  const _sfc_main$6 = {
    __name: "assessment-complete-modal",
    props: {
      // 是否显示弹窗
      visible: {
        type: Boolean,
        default: false
      },
      // 当前完成的部位ID
      currentPartId: {
        type: String,
        default: "shoulder"
      },
      // 下一个部位ID
      nextPartId: {
        type: String,
        default: "chest"
      },
      // 倒计时秒数
      countdownSeconds: {
        type: Number,
        default: 5
      }
    },
    emits: ["update:visible", "start", "cancel", "timeout"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const partNameMap = {
        shoulder: "肩部",
        chest: "胸部",
        back: "背部",
        arm: "手臂",
        hip: "臀部",
        leg: "腿部"
      };
      const currentPartName = vue.computed(() => {
        return partNameMap[props.currentPartId] || "未知部位";
      });
      const nextPartName = vue.computed(() => {
        return partNameMap[props.nextPartId] || "未知部位";
      });
      const countdown = vue.ref(props.countdownSeconds);
      let countdownTimer = null;
      vue.watch(() => props.visible, (newVal) => {
        if (newVal) {
          countdown.value = props.countdownSeconds;
          startCountdown();
        } else {
          stopCountdown();
        }
      });
      const startCountdown = () => {
        stopCountdown();
        countdownTimer = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            stopCountdown();
            emit("timeout");
            closeModal();
          }
        }, 1e3);
      };
      const stopCountdown = () => {
        if (countdownTimer) {
          clearInterval(countdownTimer);
          countdownTimer = null;
        }
      };
      const closeModal = () => {
        emit("update:visible", false);
      };
      const handleOverlayClick = () => {
      };
      const handleStart = () => {
        stopCountdown();
        formatAppLog("log", "at components/modals/assessment-complete-modal.vue:162", "[串口通信] 发送开始命令，跳转到:", props.nextPartId);
        emit("start", {
          currentPartId: props.currentPartId,
          nextPartId: props.nextPartId
        });
        closeModal();
      };
      const handleCancel = () => {
        stopCountdown();
        formatAppLog("log", "at components/modals/assessment-complete-modal.vue:177", "[串口通信] 发送取消命令");
        emit("cancel");
        closeModal();
      };
      vue.onUnmounted(() => {
        stopCountdown();
      });
      const __returned__ = { props, emit, partNameMap, currentPartName, nextPartName, countdown, get countdownTimer() {
        return countdownTimer;
      }, set countdownTimer(v) {
        countdownTimer = v;
      }, startCountdown, stopCountdown, closeModal, handleOverlayClick, handleStart, handleCancel, ref: vue.ref, computed: vue.computed, watch: vue.watch, onUnmounted: vue.onUnmounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "modal-overlay",
      onClick: $setup.handleOverlayClick
    }, [
      vue.createElementVNode("view", {
        class: "modal-card",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createCommentVNode(" 上半部分：绿色区域 "),
        vue.createElementVNode("view", { class: "modal-header" }, [
          vue.createCommentVNode(" 顶部胶囊把手 "),
          vue.createElementVNode("view", { class: "handle-bar" }),
          vue.createCommentVNode(" 标题区域 "),
          vue.createElementVNode("view", { class: "title-section" }, [
            vue.createCommentVNode(" 左侧图标 "),
            vue.createElementVNode("image", {
              class: "icon-left",
              src: _imports_0$1,
              mode: "aspectFit"
            }),
            vue.createCommentVNode(" 中间标题文案 "),
            vue.createElementVNode(
              "text",
              { class: "title-text" },
              '" 已完成' + vue.toDisplayString($setup.currentPartName) + ' "',
              1
              /* TEXT */
            ),
            vue.createCommentVNode(" 右侧插画人物 "),
            vue.createElementVNode("image", {
              class: "icon-right",
              src: _imports_1$2,
              mode: "aspectFit"
            })
          ]),
          vue.createCommentVNode(" 副标题：倒计时文案 "),
          vue.createElementVNode(
            "text",
            { class: "subtitle-text" },
            vue.toDisplayString($setup.countdown) + "S后自动跳转" + vue.toDisplayString($setup.nextPartName) + "评估",
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 下半部分：白色区域 - 按钮组 "),
        vue.createElementVNode("view", { class: "modal-footer" }, [
          vue.createElementVNode("view", { class: "btn-group" }, [
            vue.createCommentVNode(" 主按钮：直接开始 "),
            vue.createElementVNode("view", {
              class: "btn btn-primary",
              onClick: $setup.handleStart
            }, [
              vue.createElementVNode("text", { class: "btn-text btn-primary-text" }, "直接开始")
            ]),
            vue.createCommentVNode(" 次按钮：取消 "),
            vue.createElementVNode("view", {
              class: "btn btn-secondary",
              onClick: $setup.handleCancel
            }, [
              vue.createElementVNode("text", { class: "btn-text btn-secondary-text" }, "取消")
            ])
          ])
        ])
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const AssessmentCompleteModal = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-0c7c2193"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/modals/assessment-complete-modal.vue"]]);
  const _imports_0 = "/static/icons/smartAssessActivity/li-liang/bg_powerful_Girl.png";
  const _imports_1$1 = "/static/icons/smartAssessActivity/li-liang/btn_back.svg";
  const _imports_2 = "/static/icons/smartAssessActivity/li-liang/ic_KG.png";
  const SHOW_TEST_BUTTON = true;
  const _sfc_main$5 = {
    __name: "strength-assess",
    setup(__props, { expose: __expose }) {
      __expose();
      const statusBarHeight = vue.ref(0);
      vue.onMounted(() => {
        const systemInfo = uni.getSystemInfoSync();
        statusBarHeight.value = systemInfo.statusBarHeight || 0;
      });
      const currentStep = vue.ref(1);
      const showCompleteModal = vue.ref(false);
      const powerOn = vue.ref(false);
      const weightValue = vue.ref(0);
      const displayWeight = vue.computed(() => {
        return String(weightValue.value).padStart(2, "0");
      });
      const bodyParts = vue.ref([
        { id: "shoulder", name: "肩部", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_shoulder.svg" },
        { id: "chest", name: "胸部", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_chest.svg" },
        { id: "back", name: "背部", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_back.svg" },
        { id: "arm", name: "手臂", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_arm.svg" },
        { id: "hip", name: "臀部", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_hip.svg" },
        { id: "leg", name: "腿部", icon: "/static/icons/smartAssessActivity/li-liang/ic_muscle_leg.svg" }
      ]);
      const selectedPartId = vue.ref("shoulder");
      const goBack = () => {
        uni.navigateBack();
      };
      const togglePower = () => {
        powerOn.value = !powerOn.value;
        if (!powerOn.value) {
          weightValue.value = 0;
        }
      };
      const onWeightChange = (e) => {
        weightValue.value = e.detail.value;
        formatAppLog("log", "at pages/smartAssess/strength-assess.vue:174", "当前配重:", weightValue.value, "KG");
      };
      const selectPart = (partId) => {
        selectedPartId.value = partId;
        formatAppLog("log", "at pages/smartAssess/strength-assess.vue:180", "选中部位:", partId);
        uni.showToast({
          title: `已选择${bodyParts.value.find((p) => p.id === partId).name}`,
          icon: "none"
        });
      };
      const openTestModal = () => {
        showCompleteModal.value = true;
      };
      const handleStartNext = (data) => {
        var _a;
        formatAppLog("log", "at pages/smartAssess/strength-assess.vue:197", "点击直接开始:", data);
        uni.showToast({
          title: `开始${((_a = bodyParts.value.find((p) => p.id === data.nextPartId)) == null ? void 0 : _a.name) || ""}评估`,
          icon: "none"
        });
      };
      const handleCancelNext = () => {
        formatAppLog("log", "at pages/smartAssess/strength-assess.vue:207", "点击取消");
        uni.showToast({
          title: "已取消跳转",
          icon: "none"
        });
      };
      const handleTimeout = () => {
        formatAppLog("log", "at pages/smartAssess/strength-assess.vue:216", "倒计时结束，自动跳转");
        uni.showToast({
          title: "自动跳转下一部位",
          icon: "none"
        });
      };
      const __returned__ = { SHOW_TEST_BUTTON, statusBarHeight, currentStep, showCompleteModal, powerOn, weightValue, displayWeight, bodyParts, selectedPartId, goBack, togglePower, onWeightChange, selectPart, openTestModal, handleStartNext, handleCancelNext, handleTimeout, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, StepBar, AssessmentCompleteModal };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(" 全屏背景图 "),
      vue.createElementVNode("image", {
        class: "background-image",
        src: _imports_0,
        mode: "aspectFill"
      }),
      vue.createCommentVNode(" 自定义导航栏（浮在背景上） "),
      vue.createElementVNode(
        "view",
        {
          class: "custom-nav",
          style: vue.normalizeStyle({ paddingTop: $setup.statusBarHeight + "px" })
        },
        [
          vue.createElementVNode("view", { class: "nav-content" }, [
            vue.createElementVNode("view", {
              class: "back-btn",
              onClick: $setup.goBack
            }, [
              vue.createElementVNode("image", {
                class: "back-icon",
                src: _imports_1$1,
                mode: "aspectFit"
              })
            ]),
            vue.createElementVNode("text", { class: "nav-title" }, "力量评估")
          ])
        ],
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 步骤进度条（浮在导航栏下方） "),
      vue.createElementVNode(
        "view",
        {
          class: "step-bar-overlay",
          style: vue.normalizeStyle({ top: $setup.statusBarHeight + 88 + "rpx" })
        },
        [
          vue.createVNode($setup["StepBar"], {
            totalSteps: 12,
            currentStep: $setup.currentStep
          }, null, 8, ["currentStep"])
        ],
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 底部配重面板 "),
      vue.createElementVNode("view", { class: "weight-panel" }, [
        vue.createCommentVNode(" 配重信息行 "),
        vue.createElementVNode("view", { class: "weight-info-row" }, [
          vue.createElementVNode("text", { class: "weight-label" }, "配重"),
          vue.createElementVNode(
            "text",
            { class: "weight-value" },
            vue.toDisplayString($setup.displayWeight) + "KG",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "weight-unit" }, [
            vue.createElementVNode("image", {
              class: "unit-icon",
              src: _imports_2,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "unit-text" }, "单位：KG")
          ])
        ]),
        vue.createCommentVNode(" 控制行：电源按钮 + 滑块 "),
        vue.createElementVNode("view", { class: "control-row" }, [
          vue.createCommentVNode(" 电源按钮 "),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["power-btn", { "power-on": $setup.powerOn }]),
              onClick: $setup.togglePower
            },
            [
              vue.createElementVNode("image", {
                class: "power-icon",
                src: $setup.powerOn ? "/static/icons/smartAssessActivity/li-liang/ic_power_on.svg" : "/static/icons/smartAssessActivity/li-liang/ic_power_off.svg",
                mode: "aspectFit"
              }, null, 8, ["src"])
            ],
            2
            /* CLASS */
          ),
          vue.createCommentVNode(" 滑块 "),
          vue.createElementVNode("view", { class: "slider-wrapper" }, [
            vue.createElementVNode("slider", {
              class: "weight-slider",
              value: $setup.weightValue,
              min: 0,
              max: 100,
              disabled: !$setup.powerOn,
              "active-color": "rgba(0, 200, 83, 0.7)",
              "background-color": "rgba(224, 224, 224, 0.5)",
              "block-size": "24",
              onChange: $setup.onWeightChange
            }, null, 40, ["value", "disabled"])
          ])
        ])
      ]),
      vue.createCommentVNode(" 部位选择区域 "),
      vue.createElementVNode("view", { class: "body-parts-section" }, [
        vue.createCommentVNode(" 左侧主按钮 "),
        vue.createElementVNode("view", { class: "parts-main-btn" }, [
          vue.createElementVNode("text", { class: "parts-main-text" }, "部位"),
          vue.createElementVNode("text", { class: "parts-main-text" }, "选择")
        ]),
        vue.createCommentVNode(" 右侧部位列表 "),
        vue.createElementVNode("scroll-view", {
          class: "parts-scroll",
          "scroll-x": "",
          "show-scrollbar": false
        }, [
          vue.createElementVNode("view", { class: "parts-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.bodyParts, (part) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: part.id,
                  class: vue.normalizeClass(["part-item", { "part-active": $setup.selectedPartId === part.id }]),
                  onClick: ($event) => $setup.selectPart(part.id)
                }, [
                  vue.createElementVNode("image", {
                    class: "part-icon",
                    src: part.icon,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    { class: "part-name" },
                    vue.toDisplayString(part.name),
                    1
                    /* TEXT */
                  )
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createCommentVNode(" 测试按钮：唤起弹窗 "),
      $setup.SHOW_TEST_BUTTON ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "test-btn",
        onClick: $setup.openTestModal
      }, [
        vue.createElementVNode("text", { class: "test-btn-text" }, "测试弹窗")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 评估完成弹窗 "),
      vue.createVNode($setup["AssessmentCompleteModal"], {
        visible: $setup.showCompleteModal,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => $setup.showCompleteModal = $event),
        currentPartId: $setup.selectedPartId,
        nextPartId: "chest",
        countdownSeconds: 5,
        onStart: $setup.handleStartNext,
        onCancel: $setup.handleCancelNext,
        onTimeout: $setup.handleTimeout
      }, null, 8, ["visible", "currentPartId"])
    ]);
  }
  const PagesSmartAssessStrengthAssess = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-f68f2323"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/smartAssess/strength-assess.vue"]]);
  const _imports_1 = "/static/icons/smartAssessActivity/ji-neng/ic_body_fat_scale.png";
  const _sfc_main$4 = {
    __name: "body-function-assess",
    setup(__props, { expose: __expose }) {
      __expose();
      const goBack = () => {
        uni.navigateBack();
      };
      const __returned__ = { goBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部返回按钮 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", {
          class: "back-btn",
          onClick: $setup.goBack
        }, [
          vue.createElementVNode("image", {
            class: "back-icon",
            src: _imports_0$6,
            mode: "widthFix"
          })
        ]),
        vue.createElementVNode("text", { class: "header-title" }, "身体机能")
      ]),
      vue.createCommentVNode(" 内容区域 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" AI 助手标签 "),
        vue.createElementVNode("view", { class: "ai-badge" }, [
          vue.createElementVNode("text", { class: "ai-text" }, "AI助手")
        ]),
        vue.createCommentVNode(" 提示文字框 "),
        vue.createElementVNode("view", { class: "tip-card" }, [
          vue.createElementVNode("text", { class: "tip-text" }, "请按照指示连接外部体脂秤进行评估")
        ]),
        vue.createCommentVNode(" 体脂秤图片 "),
        vue.createElementVNode("view", { class: "device-image-wrapper" }, [
          vue.createElementVNode("image", {
            class: "device-image",
            src: _imports_1,
            mode: "widthFix"
          })
        ])
      ])
    ]);
  }
  const PagesSmartAssessBodyFunctionAssess = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-2d7bb3d1"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/smartAssess/body-function-assess.vue"]]);
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name = "wzlSerialbridge";
  const moduleName = "串口通信插件";
  const moduleType = "";
  const errMsg = ``;
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name, is_uni_modules);
  const openSerial = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "openSerialByJs", keepAlive: false, params: [{ "name": "options", "type": "OpenOptions" }], return: "" });
  const writeSerial = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "writeSerialByJs", keepAlive: false, params: [{ "name": "options", "type": "WriteOptions" }], return: "" });
  const readSerial = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "readSerialByJs", keepAlive: false, params: [{ "name": "options", "type": "ReadOptions" }], return: "" });
  const closeSerial = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "closeSerialByJs", keepAlive: false, params: [{ "name": "options", "type": "CloseOptions" }], return: "" });
  const listDevices = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "listDevicesByJs", keepAlive: false, params: [{ "name": "options", "type": "ListDevicesOptions" }], return: "" });
  const getVersion = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "getVersionByJs", keepAlive: false, params: [], return: "" });
  const maxMessages = 100;
  const _sfc_main$3 = {
    __name: "serial-test",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.onMounted(() => {
        formatAppLog("log", "at pages/serial-test/serial-test.vue:134", "=== 串口测试页面已挂载 ===");
        formatAppLog("log", "at pages/serial-test/serial-test.vue:135", "=== 插件版本 ===", getVersion());
        uni.showToast({ title: "插件已加载", icon: "success", duration: 1500 });
      });
      const devicePath = vue.ref("/dev/ttyS3");
      const baudRates = vue.ref([9600, 19200, 38400, 57600, 115200, 230400, 460800]);
      const baudRateIndex = vue.ref(4);
      const isConnected = vue.ref(false);
      const sendData = vue.ref("");
      const receivedMessages = vue.ref([]);
      const stats = vue.ref(null);
      let currentPortId = 0;
      vue.onBeforeUnmount(() => {
        if (isConnected.value && currentPortId > 0) {
          closeSerial({
            portId: currentPortId,
            success: () => {
              formatAppLog("log", "at pages/serial-test/serial-test.vue:156", "串口已自动关闭");
            }
          });
        }
      });
      const handleListDevices = () => {
        listDevices({
          prefixes: ["/dev/ttyS", "/dev/ttyUSB", "/dev/ttyAMA"],
          success: (res) => {
            formatAppLog("log", "at pages/serial-test/serial-test.vue:166", "找到设备:", res.devices);
            if (res.devices.length === 0) {
              uni.showToast({
                title: "未找到设备",
                icon: "none"
              });
              return;
            }
            uni.showActionSheet({
              itemList: res.devices,
              success: (actionRes) => {
                devicePath.value = res.devices[actionRes.tapIndex];
                uni.showToast({
                  title: `已选择: ${devicePath.value}`,
                  icon: "none"
                });
              }
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/serial-test/serial-test.vue:188", "扫描失败:", err);
            uni.showToast({
              title: `扫描失败: ${err.errMsg}`,
              icon: "none"
            });
          }
        });
      };
      const handleOpenPort = () => {
        if (!devicePath.value) {
          uni.showToast({
            title: "请输入设备路径",
            icon: "none"
          });
          return;
        }
        uni.showLoading({ title: "打开中..." });
        openSerial({
          path: devicePath.value,
          config: {
            baudRate: baudRates.value[baudRateIndex.value],
            dataBits: 8,
            stopBits: 1,
            parity: "none"
          },
          success: (res) => {
            formatAppLog("log", "at pages/serial-test/serial-test.vue:217", "串口已打开:", res);
            currentPortId = res.portId;
            isConnected.value = true;
            uni.hideLoading();
            uni.showToast({
              title: "串口已打开",
              icon: "success"
            });
            startReading();
          },
          fail: (err) => {
            formatAppLog("error", "at pages/serial-test/serial-test.vue:230", "打开失败:", err);
            uni.hideLoading();
            uni.showModal({
              title: "打开失败",
              content: `错误码 ${err.errCode}: ${err.errMsg}`,
              showCancel: false
            });
          }
        });
      };
      const handleClosePort = () => {
        closeSerial({
          portId: currentPortId,
          success: () => {
            formatAppLog("log", "at pages/serial-test/serial-test.vue:245", "串口已关闭");
            isConnected.value = false;
            currentPortId = 0;
            stopReading();
            uni.showToast({
              title: "串口已关闭",
              icon: "success"
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/serial-test/serial-test.vue:255", "关闭失败:", err);
            uni.showToast({
              title: `关闭失败: ${err.errMsg}`,
              icon: "none"
            });
          }
        });
      };
      let readTimer = null;
      const startReading = () => {
        stopReading();
        readTimer = setInterval(() => {
          if (!isConnected.value || currentPortId === 0) {
            stopReading();
            return;
          }
          readSerial({
            portId: currentPortId,
            length: 1024,
            format: "hex",
            timeout: 100,
            success: (res) => {
              if (res.bytesRead > 0) {
                formatAppLog("log", "at pages/serial-test/serial-test.vue:284", "接收到数据:", res.data);
                receivedMessages.value.unshift({
                  data: res.data,
                  bytes: res.bytesRead,
                  ts: Date.now()
                });
                if (receivedMessages.value.length > maxMessages) {
                  receivedMessages.value.pop();
                }
              }
            },
            fail: (err) => {
              if (err.errCode !== 10003) {
                formatAppLog("error", "at pages/serial-test/serial-test.vue:300", "读取失败:", err);
              }
            }
          });
        }, 200);
      };
      const stopReading = () => {
        if (readTimer) {
          clearInterval(readTimer);
          readTimer = null;
        }
      };
      const handleSendCommand = () => {
        if (!sendData.value.trim()) {
          uni.showToast({
            title: "请输入数据",
            icon: "none"
          });
          return;
        }
        if (!isConnected.value || currentPortId === 0) {
          uni.showToast({
            title: "请先打开串口",
            icon: "none"
          });
          return;
        }
        const data = sendData.value.replace(/\s+/g, "");
        if (!/^[0-9A-Fa-f]*$/.test(data)) {
          uni.showToast({
            title: "数据格式错误，请输入HEX格式",
            icon: "none"
          });
          return;
        }
        if (data.length % 2 !== 0) {
          uni.showToast({
            title: "HEX字符串长度必须为偶数",
            icon: "none"
          });
          return;
        }
        writeSerial({
          portId: currentPortId,
          data,
          format: "hex",
          timeout: 1e3,
          success: (res) => {
            formatAppLog("log", "at pages/serial-test/serial-test.vue:357", "发送成功:", res);
            uni.showToast({
              title: `已发送 ${res.bytesWritten} 字节`,
              icon: "success",
              duration: 1e3
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/serial-test/serial-test.vue:365", "发送失败:", err);
            uni.showToast({
              title: `发送失败: ${err.errMsg}`,
              icon: "none"
            });
          }
        });
      };
      const handleSendQuick = (data) => {
        sendData.value = data;
        handleSendCommand();
      };
      const clearReceived = () => {
        receivedMessages.value = [];
        uni.showToast({
          title: "已清空",
          icon: "success",
          duration: 1e3
        });
      };
      const handleGetStats = () => {
        stats.value = {
          bytesTx: 0,
          bytesRx: receivedMessages.value.reduce((sum, msg) => sum + msg.bytes, 0),
          framesTx: 0,
          framesRx: receivedMessages.value.length,
          queue: {
            items: 0,
            bytes: 0
          }
        };
        uni.showToast({
          title: "统计已更新",
          icon: "success",
          duration: 1e3
        });
      };
      const onBaudRateChange = (e) => {
        baudRateIndex.value = e.detail.value;
      };
      const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const h = String(date.getHours()).padStart(2, "0");
        const m = String(date.getMinutes()).padStart(2, "0");
        const s = String(date.getSeconds()).padStart(2, "0");
        const ms = String(date.getMilliseconds()).padStart(3, "0");
        return `${h}:${m}:${s}.${ms}`;
      };
      const __returned__ = { devicePath, baudRates, baudRateIndex, isConnected, sendData, receivedMessages, stats, maxMessages, get currentPortId() {
        return currentPortId;
      }, set currentPortId(v) {
        currentPortId = v;
      }, handleListDevices, handleOpenPort, handleClosePort, get readTimer() {
        return readTimer;
      }, set readTimer(v) {
        readTimer = v;
      }, startReading, stopReading, handleSendCommand, handleSendQuick, clearReceived, handleGetStats, onBaudRateChange, formatTime, ref: vue.ref, onMounted: vue.onMounted, onBeforeUnmount: vue.onBeforeUnmount, get openSerial() {
        return openSerial;
      }, get writeSerial() {
        return writeSerial;
      }, get readSerial() {
        return readSerial;
      }, get closeSerial() {
        return closeSerial;
      }, get listDevices() {
        return listDevices;
      }, get getVersion() {
        return getVersion;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "串口通信测试")
      ]),
      vue.createCommentVNode(" 设备选择 "),
      vue.createElementVNode("view", { class: "section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "1. 设备配置"),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "设备路径:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.devicePath = $event),
              class: "input",
              placeholder: "/dev/ttyS3"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.devicePath]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "波特率:"),
          vue.createElementVNode("picker", {
            value: $setup.baudRateIndex,
            range: $setup.baudRates,
            onChange: $setup.onBaudRateChange
          }, [
            vue.createElementVNode(
              "view",
              { class: "picker" },
              vue.toDisplayString($setup.baudRates[$setup.baudRateIndex]),
              1
              /* TEXT */
            )
          ], 40, ["value", "range"])
        ]),
        vue.createElementVNode("button", {
          onClick: $setup.handleListDevices,
          class: "btn btn-secondary"
        }, "扫描设备")
      ]),
      vue.createCommentVNode(" 连接控制 "),
      vue.createElementVNode("view", { class: "section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "2. 连接控制"),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["status-bar", { connected: $setup.isConnected }])
          },
          [
            vue.createElementVNode(
              "text",
              { class: "status-text" },
              "状态: " + vue.toDisplayString($setup.isConnected ? "已连接" : "未连接"),
              1
              /* TEXT */
            ),
            $setup.isConnected ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "status-info"
              },
              vue.toDisplayString($setup.devicePath),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode("view", { class: "button-group" }, [
          vue.createElementVNode("button", {
            onClick: $setup.handleOpenPort,
            disabled: $setup.isConnected,
            class: "btn btn-primary"
          }, " 打开串口 ", 8, ["disabled"]),
          vue.createElementVNode("button", {
            onClick: $setup.handleClosePort,
            disabled: !$setup.isConnected,
            class: "btn btn-danger"
          }, " 关闭串口 ", 8, ["disabled"])
        ])
      ]),
      vue.createCommentVNode(" 数据发送 "),
      vue.createElementVNode("view", { class: "section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "3. 数据发送"),
        vue.createElementVNode("view", { class: "form-item" }, [
          vue.createElementVNode("text", { class: "label" }, "发送数据 (HEX):"),
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.sendData = $event),
              class: "textarea",
              placeholder: "AA5501020304BB"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.sendData]
          ])
        ]),
        vue.createElementVNode("view", { class: "button-group" }, [
          vue.createElementVNode("button", {
            onClick: $setup.handleSendCommand,
            disabled: !$setup.isConnected,
            class: "btn btn-primary"
          }, " 发送 ", 8, ["disabled"]),
          vue.createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.sendData = ""),
            class: "btn btn-secondary"
          }, "清空")
        ]),
        vue.createElementVNode("view", { class: "quick-commands" }, [
          vue.createElementVNode("text", { class: "label" }, "快捷命令:"),
          vue.createElementVNode("button", {
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.handleSendQuick("AA5501BB")),
            class: "btn btn-small"
          }, "测试1"),
          vue.createElementVNode("button", {
            onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleSendQuick("AA5502BB")),
            class: "btn btn-small"
          }, "测试2"),
          vue.createElementVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => $setup.handleSendQuick("AA5503BB")),
            class: "btn btn-small"
          }, "测试3")
        ])
      ]),
      vue.createCommentVNode(" 数据接收 "),
      vue.createElementVNode("view", { class: "section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "4. 数据接收"),
        vue.createElementVNode("view", { class: "received-header" }, [
          vue.createElementVNode(
            "text",
            null,
            "接收到 " + vue.toDisplayString($setup.receivedMessages.length) + " 条消息",
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", {
            onClick: $setup.clearReceived,
            class: "btn btn-small"
          }, "清空")
        ]),
        vue.createElementVNode("scroll-view", {
          class: "received-list",
          "scroll-y": ""
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.receivedMessages, (msg, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "message-item"
              }, [
                vue.createElementVNode("view", { class: "message-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "message-time" },
                    vue.toDisplayString($setup.formatTime(msg.ts)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "message-bytes" },
                    vue.toDisplayString(msg.bytes) + " 字节",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "message-data" },
                  vue.toDisplayString(msg.data),
                  1
                  /* TEXT */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.receivedMessages.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty-state"
          }, [
            vue.createElementVNode("text", null, "暂无数据")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createCommentVNode(" 统计信息 "),
      vue.createElementVNode("view", { class: "section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "5. 统计信息"),
        vue.createElementVNode("button", {
          onClick: $setup.handleGetStats,
          class: "btn btn-secondary"
        }, "刷新统计"),
        $setup.stats ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "stats-grid"
        }, [
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "发送字节"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.bytesTx),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "接收字节"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.bytesRx),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "发送帧"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.framesTx),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "接收帧"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.framesRx),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "队列项"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.queue ? $setup.stats.queue.items : 0),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "stat-item" }, [
            vue.createElementVNode("text", { class: "stat-label" }, "队列字节"),
            vue.createElementVNode(
              "text",
              { class: "stat-value" },
              vue.toDisplayString($setup.stats.queue ? $setup.stats.queue.bytes : 0),
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesSerialTestSerialTest = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-0db1a578"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/serial-test/serial-test.vue"]]);
  const _sfc_main$2 = {
    __name: "ai-recommend",
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { CommonBackButton };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(" 顶部导航 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createVNode($setup["CommonBackButton"], { class: "back-btn-position" }),
        vue.createElementVNode("text", { class: "header-title" }, "AI推荐训练")
      ]),
      vue.createCommentVNode(" 占位内容 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "placeholder-container" }, [
          vue.createElementVNode("image", {
            class: "ai-icon",
            src: _imports_0$3,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "placeholder-title" }, "AI智能推荐"),
          vue.createElementVNode("text", { class: "placeholder-desc" }, "根据您的身体数据和训练目标，为您量身定制专属训练计划"),
          vue.createElementVNode("text", { class: "placeholder-hint" }, "功能开发中，敬请期待...")
        ])
      ])
    ]);
  }
  const PagesPartTrainingComponentsAiRecommend = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-4cc8e654"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/pages/partTraining/components/ai-recommend.vue"]]);
  __definePage("pages/idle/idle", PagesIdleIdle);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/freeTraining/free-training", PagesFreeTrainingFreeTraining);
  __definePage("pages/partTraining/part-training", PagesPartTrainingPartTraining);
  __definePage("pages/partTraining/part-training-detail", PagesPartTrainingPartTrainingDetail);
  __definePage("pages/smartAssess/first-skip", PagesSmartAssessFirstSkip);
  __definePage("pages/smartAssess/strength-assess", PagesSmartAssessStrengthAssess);
  __definePage("pages/smartAssess/body-function-assess", PagesSmartAssessBodyFunctionAssess);
  __definePage("pages/serial-test/serial-test", PagesSerialTestSerialTest);
  __definePage("pages/partTraining/components/ai-recommend", PagesPartTrainingComponentsAiRecommend);
  const _sfc_main$1 = {
    onLaunch() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/App.vue"]]);
  const _sfc_main = {
    name: "ModalGeneral",
    props: {
      // 是否显示
      show: {
        type: Boolean,
        default: false
      },
      // 标题
      title: {
        type: String,
        default: ""
      },
      // 内容文本（当不使用插槽时）
      content: {
        type: String,
        default: ""
      },
      // 是否显示取消按钮
      showCancel: {
        type: Boolean,
        default: false
      },
      // 确认按钮文字
      confirmText: {
        type: String,
        default: "确定"
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 点击遮罩是否关闭
      maskClosable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleConfirm() {
        this.$emit("confirm");
        this.$emit("update:show", false);
      },
      handleCancel() {
        this.$emit("cancel");
        this.$emit("update:show", false);
      },
      handleMaskClick() {
        if (this.maskClosable) {
          this.$emit("update:show", false);
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "modal-mask",
        onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers(() => {
        }, ["stop", "prevent"])),
        onClick: _cache[4] || (_cache[4] = (...args) => $options.handleMaskClick && $options.handleMaskClick(...args))
      },
      [
        vue.createElementVNode("view", {
          class: "modal-box",
          onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createCommentVNode(" 标题 "),
          $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "modal-title"
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($props.title),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 内容区域 - 支持插槽 "),
          vue.createElementVNode("view", { class: "modal-content" }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createElementVNode(
                "text",
                { class: "modal-text" },
                vue.toDisplayString($props.content),
                1
                /* TEXT */
              )
            ], true)
          ]),
          vue.createCommentVNode(" 按钮区域 "),
          vue.createElementVNode("view", { class: "modal-footer" }, [
            $props.showCancel ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "modal-btn modal-btn-cancel",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.handleCancel && $options.handleCancel(...args))
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.cancelText),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", {
              class: "modal-btn modal-btn-confirm",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.handleConfirm && $options.handleConfirm(...args))
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.confirmText),
                1
                /* TEXT */
              )
            ])
          ])
        ])
      ],
      32
      /* NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const ModalGeneral = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1789e8df"], ["__file", "C:/wzl/HX-proj/tovigor_v1/tovigor_v1/components/modals/modal-general.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.component("ModalGeneral", ModalGeneral);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

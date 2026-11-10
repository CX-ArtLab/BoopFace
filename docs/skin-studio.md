# 皮肤工坊 / Skin Studio

[打开皮肤工坊](https://cx-artlab.github.io/BoopFace/skin-studio/)

纯 SVG 的浏览器皮肤编辑器，提供 24 款精选皮肤、53 项材质参数、空间转头和原头像交互。草稿和方案保存在使用者自己的浏览器中，不会上传到服务器。

- 调整圆度、厚度、底色、高光、环境反光、侧面、底纹、眼睛和天线。
- 使用正面、左右转头、俯仰及 64px 预览检查外观；体积截面可以开关。
- 拖天线，按住头像挤压，移动转为拖拽，松手回弹。
- 保存独立方案，撤销/重做，导入/导出 JSON；导出当前 SVG 或可离线交互的 HTML。
- 自定义 SVG 图案支持纯色路径和基本几何形状；不支持脚本、图片、外部引用、文字、渐变和滤镜导入。

体积、透视和交互由统一实现处理，原皮肤根据矢量光带、轮廓渐变和图案等结构适配。新增同结构材质可以复用，特殊图层需要增加绑定。高光是轻量的艺术化投影，未模拟物理环境反射。编辑器的皮肤数据不是组件公开的 `setSkin()` 参数；该 API 继续使用固定的皮肤编号。

## 本地开发

```sh
npm ci
node scripts/serve.mjs
# http://127.0.0.1:4173/demo/skin-studio/
```

修改 `demo/skin-studio/interactions.js` 或组件运行代码后，更新供独立 HTML 使用的同一份模块快照：

```sh
node scripts/build-skin-studio.mjs
node --test tests/pages-public.test.mjs
npx playwright test tests/skin-studio.spec.mjs
```

`runtime.js` 用于编辑器、SVG 导出和独立 HTML。交互适配器复用组件原有手势实现，脱离文档的控制实例不会创建自主动画循环或全局指针监听。动画只更新已存在的 SVG 路径和变换；体积辅助仅增加 17 条线，导出时去除。

GitHub Pages 的明确文件清单只纳入正式工坊文件；本地实验、个人参数、验证截图和历史备份不属于该页面。npm 包继续只包含组件运行文件，不包含工坊。

// shayujizhang.js
// 适用于 Shadowrocket 的 HTTP response 脚本
(function () {
  try {
    const url = $request.url || "";
    const path = "/account/grant/detail/info";

    let body = $response && $response.body ? $response.body : null;
    if (!body) {
      // 没有响应体，直接结束
      $done({});
      return;
    }

    if (url.indexOf(path) !== -1) {
      // 尝试解析为 JSON 并修改 vip 字段
      try {
        let obj = JSON.parse(body);
        if (!obj.data) obj.data = {};
        if (!obj.data.vip) obj.data.vip = {};
        obj.data.vip.isvip = 1;
        obj.data.vip.days = 99999;

        body = JSON.stringify(obj);
        // Shadowrocket 要返回 headers 与 body（返回空 headers 会保留原 headers）
        $done({ body: body });
        return;
      } catch (e) {
        // JSON 解析失败 — 直接返回原始 body
        $done({ body: body });
        return;
      }
    } else {
      // 非目标路径，直接返回原始响应
      $done({ body: body });
    }
  } catch (err) {
    // 出错时返回空以保证不阻断请求
    $done({});
  }
})();

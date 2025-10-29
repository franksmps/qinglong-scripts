/**
 * shayujizhang-vip-fix.js
 * 更稳健的鲨鱼记账VIP解锁脚本
 */

var body = $response && $response.body ? $response.body : "";
var url = $request && $request.url ? $request.url : "";

const path = "/account/grant/detail/info";

if (url.indexOf(path) !== -1) {
  try {
    let obj = JSON.parse(body || "{}");

    // 确保 data.vip 路径存在
    if (!obj.data || typeof obj.data !== "object") obj.data = {};
    if (!obj.data.vip || typeof obj.data.vip !== "object") obj.data.vip = {};

    // 设置 VIP 标志与天数（可根据需要调整）
    obj.data.vip.isvip = 1;
    obj.data.vip.days = 99999;

    // 可选：记录修改时间（不影响接口）
    obj.data.vip._modified_by = "shayujizhang-vip-fix.js";

    body = JSON.stringify(obj);
  } catch (e) {
    // 解析失败 —— 不要中断，保留原始 body
    console.log("shayujizhang-vip-fix.js parse error:", e);
  }
}

// 确保 $done 总被调用
$done({ body: body });

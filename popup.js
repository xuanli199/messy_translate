/*
 * @Author: xuanli xuanli@example.com
 * @Date: 2025-04-22 01:15:42
 * @LastEditors: xuanli xuanli@example.com
 * @LastEditTime: 2025-04-22 01:21:00
 * @FilePath: \乱码器 - 副本\popup.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 获取DOM元素
// const replaceTextInput = document.getElementById('replaceText'); // 移除
// const saveBtn = document.getElementById('saveBtn'); // 移除
const replaceBtn = document.getElementById('replaceBtn');
// const errorMsg = document.getElementById('error'); // 移除
const autoReplaceCheckbox = document.getElementById('autoReplace');

// 加载保存的设置
chrome.storage.local.get(['autoReplace'], (result) => {
  // 确保 autoReplace 有默认值 true
  const autoReplace = result.autoReplace !== undefined ? result.autoReplace : true;
  autoReplaceCheckbox.checked = autoReplace;

  // 如果 autoReplace 未定义，则保存默认值
  if (result.autoReplace === undefined) {
    chrome.storage.local.set({ autoReplace: autoReplace });
  }
});

// 移除保存设置逻辑
// saveBtn.addEventListener('click', () => { ... });

// 手动触发翻译
replaceBtn.addEventListener('click', async () => {
  // 获取当前标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // 向content script发送翻译消息
  chrome.tabs.sendMessage(tab.id, { action: 'translate' });
});

// 监听自动替换开关变化
autoReplaceCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ autoReplace: autoReplaceCheckbox.checked });
});
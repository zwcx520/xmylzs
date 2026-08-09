/**
 * 星漫乐理 - 首次使用欢迎弹窗
 * 首次打开（或版本更新后）弹窗展示应用简介与隐私政策、用户服务协议入口
 * 用户点击"同意并使用"后通过 localStorage 记录版本号，下次不再弹窗
 */
window.addEventListener('load', function () {
    // ===== 常量配置区 =====
    var TIP_KEY = 'mt_tip_version';     // 本地存储 key
    var APP_TIP_VER = '1';              // 修改此数字可让所有用户重新看到弹窗
    var Z_INDEX = 9999;

    // 安全读取 localStorage（兼容 file:// 协议下不可用的情况）
    function storageGet(key) {
        try { return window.localStorage.getItem(key); } catch (e) { return null; }
    }
    function storageSet(key, val) {
        try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; }
    }

    // 判断是否已弹窗过当前版本
    var savedVer = storageGet(TIP_KEY);
    if (savedVer === APP_TIP_VER) return;

    // 1. 创建遮罩层
    var mask = document.createElement('div');
    Object.assign(mask.style, {
        position: 'fixed',
        top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: String(Z_INDEX),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        opacity: '0',
        transition: 'opacity 0.3s'
    });

    // 2. 创建弹窗盒子（贴合应用深色毛玻璃风格）
    var box = document.createElement('div');
    Object.assign(box.style, {
        maxWidth: '460px',
        width: '100%',
        background: 'linear-gradient(180deg, #1a1a2e, #12121e)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '28px 24px 20px',
        maxHeight: '85vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        boxSizing: 'border-box',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
        color: '#e8e8f0',
        transform: 'scale(0.9)',
        transition: 'transform 0.3s'
    });

    // 3. 弹窗内容
    box.innerHTML =
        '<div style="text-align:center;margin-bottom:18px;">' +
            '<div style="width:56px;height:56px;margin:0 auto 12px;border-radius:14px;' +
                'background:linear-gradient(135deg,#6366f1,#ec4899);display:flex;align-items:center;justify-content:center;' +
                'box-shadow:0 8px 24px rgba(99,102,241,0.4);">' +
                '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' +
                '</svg>' +
            '</div>' +
            '<h3 style="margin:0 0 4px;font-size:1.25rem;font-weight:700;color:#e8e8f0;">欢迎使用星漫乐理</h3>' +
            '<p style="margin:0;font-size:0.8rem;color:#8888a0;">音乐乐理知识百科全书 · v1.0.0</p>' +
        '</div>' +
        '<div style="line-height:1.8;font-size:0.875rem;color:#c8c8d8;">' +
            '<p style="margin:0 0 10px;"> 本应用是一款<strong style="color:#6366f1;">免费</strong>的音乐乐理知识学习工具，涵盖 <strong>15 大模块、119 个主题</strong>，从基础入门到精通。</p>' +
            '<p style="margin:0 0 10px;"> 内置虚拟钢琴、乐理测验、学习路径、知识图谱、学习仪表盘、成就系统等互动功能，让每个人都能看懂音乐的语言。</p>' +
            '<p style="margin:0 0 10px;"> 本应用为纯前端离线工具，不收集任何个人信息，所有学习数据仅保存在您的设备本地。</p>' +
            '<p style="margin:0;"> 使用前请了解本应用的隐私政策与用户服务协议，以保障您的合法权益。</p>' +
        '</div>' +
        '<div style="margin:18px 0 16px;display:flex;gap:20px;justify-content:center;font-size:0.875rem;">' +
            '<a href="javascript:void(0)" id="linkPrivacy" style="color:#6366f1;text-decoration:none;border-bottom:1px solid transparent;transition:border-color 0.2s;">《隐私政策》</a>' +
            '<a href="javascript:void(0)" id="linkTerms" style="color:#6366f1;text-decoration:none;border-bottom:1px solid transparent;transition:border-color 0.2s;">《用户服务协议》</a>' +
        '</div>' +
        '<button id="agreeBtn" style="display:block;width:100%;padding:12px;' +
            'background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;border:none;border-radius:10px;' +
            'font-size:0.9375rem;font-weight:600;cursor:pointer;font-family:inherit;' +
            'box-shadow:0 4px 16px rgba(99,102,241,0.4);transition:transform 0.15s;">' +
            '同意并使用' +
        '</button>';

    // 4. 组装 DOM
    mask.appendChild(box);
    document.body.appendChild(mask);

    // 入场动画
    requestAnimationFrame(function() {
        mask.style.opacity = '1';
        box.style.transform = 'scale(1)';
    });

    // 5. 隐私政策链接（导航到应用内隐私政策页面）
    var linkPrivacy = document.getElementById('linkPrivacy');
    if (linkPrivacy) {
        linkPrivacy.addEventListener('mouseenter', function() { this.style.borderBottomColor = '#6366f1'; });
        linkPrivacy.addEventListener('mouseleave', function() { this.style.borderBottomColor = 'transparent'; });
        linkPrivacy.addEventListener('click', function() {
            // 先关闭弹窗再导航，避免遮罩层遮挡
            mask.remove();
            try {
                if (window.App && App.navigate) {
                    App.navigate('privacy');
                } else {
                    location.hash = 'privacy';
                }
            } catch (e) {
                location.hash = 'privacy';
            }
        });
    }

    // 6. 用户服务协议链接（导航到应用内服务协议页面）
    var linkTerms = document.getElementById('linkTerms');
    if (linkTerms) {
        linkTerms.addEventListener('mouseenter', function() { this.style.borderBottomColor = '#6366f1'; });
        linkTerms.addEventListener('mouseleave', function() { this.style.borderBottomColor = 'transparent'; });
        linkTerms.addEventListener('click', function() {
            mask.remove();
            try {
                if (window.App && App.navigate) {
                    App.navigate('terms');
                } else {
                    location.hash = 'terms';
                }
            } catch (e) {
                location.hash = 'terms';
            }
        });
    }

    // 7. 同意按钮：点击后记录版本号并关闭弹窗
    var agreeBtn = document.getElementById('agreeBtn');
    if (agreeBtn) {
        agreeBtn.addEventListener('mousedown', function() { this.style.transform = 'scale(0.97)'; });
        agreeBtn.addEventListener('mouseup', function() { this.style.transform = 'scale(1)'; });
        agreeBtn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });
        agreeBtn.addEventListener('click', function() {
            // 退场动画
            mask.style.opacity = '0';
            box.style.transform = 'scale(0.95)';
            setTimeout(function() {
                mask.remove();
                storageSet(TIP_KEY, APP_TIP_VER);
            }, 300);
        });
    }
});

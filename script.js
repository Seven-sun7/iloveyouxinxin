// --- ✅ script.js 完整版本 ---

// Canvas 动画背景（爱心粒子）
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
for (let i = 0; i < 50; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speed: Math.random() * 1 + 0.5
    });
}

function drawHeart(x, y, size) {
    ctx.save();
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 105, 180, 0.8)";
    ctx.fill();
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        drawHeart(h.x, h.y, h.size);
        h.y += h.speed;
        if (h.y > canvas.height) {
            h.y = -10;
            h.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animate);
}

animate();

// 音乐静音切换
const muteBtn = document.getElementById('muteToggle');
const audio = document.getElementById('bgm');
muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

// 页面跳转逻辑
const pages = document.querySelectorAll('.page');
const nextButtons = document.querySelectorAll('.next');
let currentPage = 0;

function showPage(index) {
  pages.forEach(p => p.classList.remove('active'));
  pages[index].classList.add('active');
}

nextButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentPage++;
    showPage(currentPage);
    if (currentPage === 1) startTyping();
  });
});

// 告白选项跳转
const choices = document.querySelectorAll('.choice');
choices.forEach(btn => {
  btn.addEventListener('click', () => showPage(3));
});

// 打字机效果
const letterText = `其实我也不知道该怎么开口才好。
这大概算不上是一封正式的告白信，更像是一些藏在我心里的真实想法。

说起来，当年我可是大家眼中的“情书大师”，好兄弟们的情书总爱让我帮着写。可当这一次主角变成了你，我却突然不知道该怎么表达才好。

有人说双子是渣男，我从不这么认为。
也有人说男人见色起意——老实说，最初联系你，确实是因为觉得你很漂亮。但真正让我下定决心喜欢你的，不是那份外在的吸引，而是认识你、了解你之后，我才发现，你这个人，本身就让我无法不动心。

你真的很温柔，真的。
虽然你说过你不喜欢被称作“温柔”，但我还是想告诉你，在我心里，这是一个再美好不过的词。那种细腻、体贴、让人安心的感觉，是我很久都没有感受到的了。

和你在一起相处的时候，我真的很开心。每一次见面、每一次聊天，我都在默默地珍惜。
但我也明白，感情从来不是单方面的。我不希望你有任何压力，我会尊重你所有的选择与想法。

未来总是充满未知，但我知道我最想做的事情，就是好好珍惜现在、珍惜和你在一起的每一个瞬间。`;

function startTyping() {
  const element = document.getElementById('letter');
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += letterText[i];
    i++;
    if (i >= letterText.length) clearInterval(interval);
  }, 40);
}

// 初始显示第一页
showPage(0);

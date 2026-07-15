/**
 * 添廣网络运营主题 - 交互脚本
 *
 * - 移动端导航切换
 * - Header 滚动效果
 * - FAQ 手风琴展开/折叠
 * - 数据数字递增动画 (IntersectionObserver)
 * - 元素进入视口淡入动画
 */

(function () {
  'use strict';

  // ===== 移动端导航切换 =====
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      var expanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // 点击链接后关闭菜单
    var links = mobileNav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Header 滚动效果 =====
  var header = document.getElementById('site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.pageYOffset || document.documentElement.scrollTop;
      if (scroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scroll;
    }, { passive: true });
  }

  // ===== FAQ 手风琴 =====
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      var item = question.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isActive = item.classList.contains('active');

      // 关闭所有
      faqQuestions.forEach(function (otherQuestion) {
        var otherItem = otherQuestion.parentElement;
        var otherAnswer = otherItem.querySelector('.faq-answer');
        otherItem.classList.remove('active');
        otherQuestion.setAttribute('aria-expanded', 'false');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = '0';
        }
      });

      // 打开当前
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // ===== 数字递增动画 =====
  function animateCounter(el) {
    // 支持 data-text 属性（自定义文本，如 "200+"、"首页"）
    var textVal = el.getAttribute('data-text');
    if (textVal) {
      // 尝试提取数字部分进行动画
      var match = textVal.match(/^(\d+)(.*)$/);
      if (match) {
        var target = parseInt(match[1], 10);
        var suffix = match[2] || '';
        var duration = 2000;
        var startTime = null;

        function update(currentTime) {
          if (!startTime) startTime = currentTime;
          var progress = Math.min((currentTime - startTime) / duration, 1);
          var easeOut = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(easeOut * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(update);
      }
      // 非数字文本（如 "首页"）直接显示，不做动画
      return;
    }

    // 兼容旧版 data-target + data-suffix
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    var duration = 2000;
    var startTime = null;

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      var progress = Math.min((currentTime - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(easeOut * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // ===== IntersectionObserver: 淡入 + 数字动画 =====
  if ('IntersectionObserver' in window) {
    // 淡入动画
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(function (el) {
      el.style.opacity = '0';
      fadeObserver.observe(el);
    });

    // 数字动画
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value[data-target], .stat-value[data-text]').forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Fallback: 直接显示
    document.querySelectorAll('.fade-in-up').forEach(function (el) {
      el.style.opacity = '1';
    });
    document.querySelectorAll('.stat-value[data-target]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      if (!isNaN(target)) {
        el.textContent = target + suffix;
      }
    });
  }

  // ===== 平滑滚动 =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#0') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Hero 幻灯片自动播放 =====
  var slider = document.querySelector('.hero-slider');
  if (slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    var dots = slider.querySelectorAll('.hero-slider-dot');
    var prevBtn = slider.querySelector('.hero-slider-prev');
    var nextBtn = slider.querySelector('.hero-slider-next');
    var current = 0;
    var total = slides.length;
    var interval = parseInt(slider.getAttribute('data-interval')) || 4000;
    var timer = null;

    function goToSlide(index) {
      if (total === 0) return;
      index = ((index % total) + total) % total; // 确保非负
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function nextSlide() {
      goToSlide(current + 1);
    }

    function prevSlide() {
      goToSlide(current - 1);
    }

    function startAuto() {
      stopAuto();
      if (total > 1) {
        timer = setInterval(nextSlide, interval);
      }
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // 指示点点击
    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () {
        goToSlide(idx);
        startAuto();
      });
    });

    // 箭头按钮
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAuto();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAuto();
      });
    }

    // 鼠标悬停暂停
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // 触摸滑动支持
    var touchStartX = 0;
    var touchEndX = 0;
    slider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAuto();
      }
    }, { passive: true });

    // 启动自动播放
    startAuto();
  }

  // ===== 微信二维码弹窗 =====
  var wechatBtn = document.getElementById('floatWechatBtn');
  var wechatPopup = document.getElementById('floatWechatPopup');
  var wechatOverlay = document.getElementById('floatWechatOverlay');
  var wechatClose = document.getElementById('floatWechatClose');

  function openWechatPopup() {
    if (!wechatPopup || !wechatOverlay) return;
    wechatPopup.classList.add('active');
    wechatOverlay.classList.add('active');
    wechatPopup.setAttribute('aria-hidden', 'false');
    wechatOverlay.setAttribute('aria-hidden', 'false');
    if (wechatBtn) wechatBtn.setAttribute('aria-expanded', 'true');
  }

  function closeWechatPopup() {
    if (!wechatPopup || !wechatOverlay) return;
    wechatPopup.classList.remove('active');
    wechatOverlay.classList.remove('active');
    wechatPopup.setAttribute('aria-hidden', 'true');
    wechatOverlay.setAttribute('aria-hidden', 'true');
    if (wechatBtn) wechatBtn.setAttribute('aria-expanded', 'false');
  }

  if (wechatBtn) {
    wechatBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (wechatPopup && wechatPopup.classList.contains('active')) {
        closeWechatPopup();
      } else {
        openWechatPopup();
      }
    });
  }

  if (wechatClose) {
    wechatClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeWechatPopup();
    });
  }

  if (wechatOverlay) {
    wechatOverlay.addEventListener('click', function () {
      closeWechatPopup();
    });
  }

  // ESC 键关闭弹窗
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wechatPopup && wechatPopup.classList.contains('active')) {
      closeWechatPopup();
    }
  });

})();

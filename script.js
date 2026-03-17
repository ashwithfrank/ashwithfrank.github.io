      /* custom cursor */
    const cur = document.getElementById('cur');
    const ring = document.getElementById('ring');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    (function tick(){
      cur.style.left=mx+'px'; cur.style.top=my+'px';
      rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a,button').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ cur.style.width='20px'; cur.style.height='20px'; ring.style.width='54px'; ring.style.height='54px'; });
      el.addEventListener('mouseleave',()=>{ cur.style.width='12px'; cur.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
    });

    /* scroll reveal */
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((e,i)=>{
        if(e.isIntersecting) setTimeout(()=>e.target.classList.add('on'), i*70);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
let fontScale = 1;
let motionPaused = false;

function changeFontSize(delta) {
  fontScale += delta * 0.15;
  if (fontScale < 0.85) fontScale = 0.85;
  if (fontScale > 1.6) fontScale = 1.6;
  document.documentElement.style.setProperty("--font-scale", fontScale);
}

function resetFontSize() {
  fontScale = 1;
  document.documentElement.style.setProperty("--font-scale", fontScale);
}

function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}

function toggleMotion() {
  motionPaused = !motionPaused;
  const btn = document.getElementById("btn-motion");
  if (btn) {
    btn.textContent = motionPaused ? "Mover" : "Pausar";
    btn.setAttribute("aria-pressed", motionPaused ? "true" : "false");
    btn.setAttribute("aria-label", motionPaused ? "Retomar movimento do fundo" : "Pausar movimento do fundo");
  }
}

function checkQuiz(option) {
  const feedback = document.getElementById("quiz-feedback");
  feedback.style.display = "block";
  if (option === 2) {
    feedback.style.backgroundColor = "#E8F5E9";
    feedback.style.borderColor = "#2E7D32";
    feedback.style.color = "#1B5E20";
    feedback.innerHTML = "<strong>Resposta correta.</strong><br>Criminosos usam a IA para clonar vozes e o desespero para causar pânico. Sempre desligue e confirme a informação com o familiar antes de enviar qualquer valor.";
  } else {
    feedback.style.backgroundColor = "#FFEBEE";
    feedback.style.borderColor = "#C62828";
    feedback.style.color = "#B71C1C";
    feedback.innerHTML = "<strong>Atenção. Esta não é a escolha mais segura.</strong><br>A voz pode ser simulada por Inteligência Artificial. Nunca faça transferências com pressa sem antes desligar e falar diretamente com o seu parente pelo número de costume.";
  }
}

function readText(elementId) {
  if (!("speechSynthesis" in window)) {
    alert("O seu navegador não suporta a funcionalidade de leitura por áudio.");
    return;
  }
  window.speechSynthesis.cancel();
  const node = document.getElementById(elementId);
  if (!node) return;
  const utterance = new SpeechSynthesisUtterance(node.innerText);
  utterance.lang = "pt-BR";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function startScene() {
  const canvas = document.getElementById("scene");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: false,
    powerPreference: "low-power",
  });
  if (!gl) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const vs = `
    attribute vec3 aPos;
    attribute vec3 aNor;
    uniform mat4 uMvp;
    uniform mat3 uN;
    varying vec3 vN;
    void main() {
      vN = normalize(uN * aNor);
      gl_Position = uMvp * vec4(aPos, 1.0);
    }
  `;
  const fs = `
    precision mediump float;
    varying vec3 vN;
    uniform vec3 uColor;
    void main() {
      vec3 n = normalize(vN);
      float d = max(dot(n, normalize(vec3(0.45, 0.85, 0.35))), 0.0);
      float fill = max(dot(n, normalize(vec3(-0.6, 0.2, 0.4))), 0.0);
      vec3 col = uColor * (0.22 + 0.62 * d + 0.18 * fill);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const aPos = gl.getAttribLocation(prog, "aPos");
  const aNor = gl.getAttribLocation(prog, "aNor");
  const uMvp = gl.getUniformLocation(prog, "uMvp");
  const uN = gl.getUniformLocation(prog, "uN");
  const uColor = gl.getUniformLocation(prog, "uColor");

  function mesh(builder) {
    const positions = [];
    const normals = [];
    function tri(a, b, c) {
      let ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      let vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      let nx = uy * vz - uz * vy;
      let ny = uz * vx - ux * vz;
      let nz = ux * vy - uy * vx;
      const cx = (a[0] + b[0] + c[0]) / 3;
      const cy = (a[1] + b[1] + c[1]) / 3;
      const cz = (a[2] + b[2] + c[2]) / 3;
      if (nx * cx + ny * cy + nz * cz < 0) {
        const t = b;
        b = c;
        c = t;
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      [a, b, c].forEach(function (p) {
        positions.push(p[0], p[1], p[2]);
        normals.push(nx, ny, nz);
      });
    }
    builder(tri);
    const buf = gl.createBuffer();
    const data = new Float32Array(positions.length + normals.length);
    data.set(positions, 0);
    data.set(normals, positions.length);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return { buf: buf, count: positions.length / 3, stride: positions.length * 4 };
  }

  function norm(v) {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  }

  const ico = mesh(function (tri) {
    const t = (1 + Math.sqrt(5)) / 2;
    const v = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ].map(norm);
    const f = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];
    f.forEach(function (face) { tri(v[face[0]], v[face[1]], v[face[2]]); });
  });

  const octa = mesh(function (tri) {
    const v = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]]
      .forEach(function (f) { tri(v[f[0]], v[f[1]], v[f[2]]); });
  });

  const torus = mesh(function (tri) {
    const R = 1;
    const r = 0.045;
    const seg = 48;
    const tube = 8;
    function p(i, j) {
      const th = (i / seg) * Math.PI * 2;
      const ph = (j / tube) * Math.PI * 2;
      return [
        (R + r * Math.cos(ph)) * Math.cos(th),
        r * Math.sin(ph),
        (R + r * Math.cos(ph)) * Math.sin(th),
      ];
    }
    for (let i = 0; i < seg; i++) {
      for (let j = 0; j < tube; j++) {
        const a = p(i, j);
        const b = p(i + 1, j);
        const c = p(i + 1, j + 1);
        const d = p(i, j + 1);
        tri(a, b, c);
        tri(a, c, d);
      }
    }
  });

  const shield = mesh(function (tri) {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      pts.push([Math.cos(a), Math.sin(a), 0]);
    }
    const front = [0, 0, 0.12];
    const back = [0, 0, -0.12];
    for (let i = 0; i < 5; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % 5];
      tri(front, a, b);
      tri(back, b, a);
      const af = [a[0], a[1], 0.08];
      const bf = [b[0], b[1], 0.08];
      const ab = [a[0], a[1], -0.08];
      const bb = [b[0], b[1], -0.08];
      tri(af, bf, bb);
      tri(af, bb, ab);
    }
  });

  const objects = [
    { geo: ico, color: [0.18, 0.36, 0.31], x: 3.4, y: 0.2, z: -2.4, s: 0.85, rx: 0.4, ry: 0.2, sx: 0.22, sy: 0.35 },
    { geo: octa, color: [0.77, 0.73, 0.66], x: -3.6, y: -0.2, z: -1.6, s: 0.7, rx: 0.2, ry: 1.1, sx: 0.18, sy: 0.28 },
    { geo: ico, color: [0.24, 0.42, 0.35], x: -2.5, y: 1.3, z: -3.6, s: 0.95, rx: 1.0, ry: 0.4, sx: 0.12, sy: 0.2 },
    { geo: octa, color: [0.12, 0.29, 0.24], x: 0.2, y: -1.1, z: -3.0, s: 1.15, rx: 0.6, ry: 0.8, sx: 0.1, sy: 0.16 },
    { geo: octa, color: [0.54, 0.57, 0.53], x: 4.4, y: -1.0, z: -3.4, s: 0.48, rx: 0.1, ry: 0.5, sx: 0.3, sy: 0.4 },
    { geo: shield, color: [0.12, 0.29, 0.24], x: -3.2, y: -1.2, z: -1.2, s: 0.9, rx: 0.3, ry: 0.6, sx: 0.16, sy: 0.22 },
    { geo: shield, color: [0.77, 0.73, 0.66], x: 3.1, y: 0.7, z: -2.8, s: 0.85, rx: 0.8, ry: 1.4, sx: 0.14, sy: 0.2 },
    { geo: shield, color: [0.36, 0.42, 0.45], x: 0.5, y: -2.2, z: -2.0, s: 0.75, rx: 1.2, ry: 0.3, sx: 0.12, sy: 0.18 },
    { geo: torus, color: [0.54, 0.57, 0.53], x: 0, y: 0, z: -1.2, s: 5.2, rx: 1.2, ry: 0.3, sx: 0.05, sy: 0.04 },
    { geo: torus, color: [0.16, 0.35, 0.3], x: 0, y: 0.2, z: -0.4, s: 3.4, rx: 0.9, ry: -0.4, sx: -0.07, sy: 0.03 },
  ];

  const m = {
    p: new Float32Array(16),
    v: new Float32Array(16),
    vp: new Float32Array(16),
    model: new Float32Array(16),
    mvp: new Float32Array(16),
    n: new Float32Array(9),
  };

  function mul(out, a, b) {
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        out[c * 4 + r] =
          a[r] * b[c * 4] +
          a[4 + r] * b[c * 4 + 1] +
          a[8 + r] * b[c * 4 + 2] +
          a[12 + r] * b[c * 4 + 3];
      }
    }
  }

  function perspective(out, fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[14] = 2 * far * near * nf;
  }

  function lookAt(out, eye, target) {
    let zx = eye[0] - target[0];
    let zy = eye[1] - target[1];
    let zz = eye[2] - target[2];
    let zl = Math.hypot(zx, zy, zz) || 1;
    zx /= zl; zy /= zl; zz /= zl;
    let xx = zy * 0 - zz * 1;
    let xy = zz * 0 - zx * 0;
    let xz = zx * 1 - zy * 0;
    let xl = Math.hypot(xx, xy, xz) || 1;
    xx /= xl; xy /= xl; xz /= xl;
    const yx = zy * xz - zz * xy;
    const yy = zz * xx - zx * xz;
    const yz = zx * xy - zy * xx;
    out[0] = xx; out[1] = yx; out[2] = zx; out[3] = 0;
    out[4] = xy; out[5] = yy; out[6] = zy; out[7] = 0;
    out[8] = xz; out[9] = yz; out[10] = zz; out[11] = 0;
    out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
    out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
    out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
    out[15] = 1;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.15 : 1.5);
    const w = Math.max(1, Math.floor(window.innerWidth * dpr));
    const h = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    perspective(m.p, (window.innerWidth < 700 ? 36 : 40) * Math.PI / 180, canvas.width / canvas.height, 0.1, 80);
  }

  window.addEventListener("resize", resize);
  resize();
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.clearColor(0.031, 0.039, 0.063, 1);

  let last = performance.now();
  let elapsed = 0;

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const freeze = motionPaused || reduced || document.hidden;
    if (!freeze) elapsed += dt;

    const mobile = window.innerWidth < 700;
    const dist = mobile ? 17 : 14.2;
    const eye = [
      Math.sin(elapsed * 0.06) * (mobile ? 0.7 : 1.15),
      0.45 + Math.cos(elapsed * 0.045) * 0.28,
      dist,
    ];
    lookAt(m.v, eye, [0, 0.1, 0]);
    mul(m.vp, m.p, m.v);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    objects.forEach(function (o) {
      const ry = o.ry + elapsed * o.sy;
      const rx = o.rx + elapsed * o.sx;
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cx = Math.cos(rx), sx = Math.sin(rx);
      const s = o.s;
      m.model[0] = s * cy;
      m.model[1] = s * sy * sx;
      m.model[2] = s * sy * cx;
      m.model[3] = 0;
      m.model[4] = 0;
      m.model[5] = s * cx;
      m.model[6] = s * -sx;
      m.model[7] = 0;
      m.model[8] = s * -sy;
      m.model[9] = s * cy * sx;
      m.model[10] = s * cy * cx;
      m.model[11] = 0;
      m.model[12] = o.x;
      m.model[13] = o.y + Math.sin(elapsed * 0.4 + o.ry) * 0.12;
      m.model[14] = o.z;
      m.model[15] = 1;
      mul(m.mvp, m.vp, m.model);
      m.n[0] = cy; m.n[1] = sy * sx; m.n[2] = sy * cx;
      m.n[3] = 0; m.n[4] = cx; m.n[5] = -sx;
      m.n[6] = -sy; m.n[7] = cy * sx; m.n[8] = cy * cx;

      gl.bindBuffer(gl.ARRAY_BUFFER, o.geo.buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aNor);
      gl.vertexAttribPointer(aNor, 3, gl.FLOAT, false, 0, o.geo.stride);
      gl.uniformMatrix4fv(uMvp, false, m.mvp);
      gl.uniformMatrix3fv(uN, false, m.n);
      gl.uniform3fv(uColor, o.color);
      gl.drawArrays(gl.TRIANGLES, 0, o.geo.count);
    });

    if (reduced) return;
    requestAnimationFrame(freeze ? waitResume : frame);
  }

  function waitResume(now) {
    last = now;
    if (motionPaused || reduced || document.hidden) requestAnimationFrame(waitResume);
    else requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

startScene();

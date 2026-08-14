from pathlib import Path
root = Path(r'c:\Users\servi\OneDrive\Desktop\Site Provisoire')
files = [
    'actualité.html','CHARTE.html','contenu.html','corps et grade.html',
    'histoire.html','Html.html','nos mission.html','numero.html',
    'organne.html','rechercher vos commisariats.html'
]
css = '''
    .theme-toggle {
      margin: 12px 0 20px;
      padding: 10px 18px;
      background: #004080;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 0.95rem;
      border-radius: 5px;
      transition: background 0.3s ease;
    }

    .theme-toggle:hover {
      background: #002d56;
    }

    body.dark-mode {
      background-color: #0d1117 !important;
      background-image: none !important;
      color: #e6e6e6 !important;
    }

    body.dark-mode a {
      color: #9ec5ff !important;
    }

    body.dark-mode nav,
    body.dark-mode header,
    body.dark-mode footer,
    body.dark-mode .footer-container,
    body.dark-mode .footer-section,
    body.dark-mode .gallery,
    body.dark-mode .video-preview,
    body.dark-mode .video-text,
    body.dark-mode .video-container,
    body.dark-mode .identity-box,
    body.dark-mode .centered-text,
    body.dark-mode .container,
    body.dark-mode .select-container,
    body.dark-mode table,
    body.dark-mode .popup {
      background: rgba(15, 23, 42, 0.95) !important;
      color: #e6e6e6 !important;
      border-color: #334155 !important;
    }

    body.dark-mode table {
      border-color: #334155 !important;
    }

    body.dark-mode th,
    body.dark-mode td {
      background: rgba(15, 23, 42, 0.8) !important;
      color: #e6e6e6 !important;
    }

    body.dark-mode th {
      background: #0f172a !important;
    }

    body.dark-mode .footer-section a {
      color: #d1d5db !important;
    }

    body.dark-mode .theme-toggle {
      background: #1f2937 !important;
      color: #e2e8f0 !important;
    }
'''
js = '''
  <script>
    const themeToggle = document.getElementById('themeToggle');
    const bodyEl = document.body;
    if (localStorage.getItem('theme') === 'dark') {
      bodyEl.classList.add('dark-mode');
    }
    if (themeToggle) {
      themeToggle.textContent = bodyEl.classList.contains('dark-mode') ? '☀️ Mode clair' : '🌙 Mode sombre';
      themeToggle.addEventListener('click', () => {
        bodyEl.classList.toggle('dark-mode');
        if (bodyEl.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.textContent = '☀️ Mode clair';
        } else {
          localStorage.setItem('theme', 'light');
          themeToggle.textContent = '🌙 Mode sombre';
        }
      });
    }
  </script>
'''
for name in files:
    path = root / name
    text = path.read_text(encoding='utf8')
    if 'themeToggle' in text and 'localStorage.getItem' in text:
        print(f'skipping {name}, already has theme code')
        continue
    changed = False
    if '</style>' in text and '.theme-toggle' not in text:
        text = text.replace('</style>', css + '\n  </style>', 1)
        changed = True
    if '</body>' in text and 'const themeToggle' not in text:
        text = text.replace('</body>', js + '</body>', 1)
        changed = True
    if '<nav>' in text and 'id="themeToggle"' not in text:
        if '</nav>\n  </header>' in text:
            text = text.replace('</nav>\n  </header>', '</nav>\n      <button class="theme-toggle" id="themeToggle">🌙 Mode sombre</button>\n  </header>', 1)
            changed = True
        elif '</nav>\n</header>' in text:
            text = text.replace('</nav>\n</header>', '</nav>\n      <button class="theme-toggle" id="themeToggle">🌙 Mode sombre</button>\n</header>', 1)
            changed = True
    if name == 'Html.html' and 'id="themeToggle"' not in text:
        if '</button>\n  </div>' in text:
            text = text.replace('</button>\n  </div>', '</button>\n    <button class="theme-toggle" id="themeToggle">🌙 Mode sombre</button>\n  </div>', 1)
            changed = True
    if name == 'contenu.html' and 'id="themeToggle"' not in text:
        if '<body>\n\n  <div class="video-container">' in text:
            text = text.replace('<body>\n\n  <div class="video-container">', '<body>\n\n  <button class="theme-toggle" id="themeToggle">🌙 Mode sombre</button>\n  <div class="video-container">', 1)
            changed = True
    if changed:
        path.write_text(text, encoding='utf8')
        print(f'updated {name}')
    else:
        print(f'no changes for {name}')

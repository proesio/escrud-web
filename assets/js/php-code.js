const codeBlocks = document.querySelectorAll("[data-syntax-highlighter]");

codeBlocks.forEach(container => {
  const copyBtn = container.querySelector(".copy-btn");
  const iconCopy = container.querySelector(".icon-copy");
  const iconCheck = container.querySelector(".icon-check");
  const codeContainer = container.querySelector(".php-code-target");
  const rawScript = container.querySelector(".raw-code-source");

  if (!rawScript || !codeContainer) return;

  // 1. Obtener contenido del script plano y limpiar saltos extremos
  let code = rawScript.textContent;
  code = code.replace(/\r/g, '');
  code = code.replace(/^\s*\n|\n\s*$/g, '');

  const codeToCopy = code;

  // 2. Escapar entidades HTML de forma segura
  code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // 3. Regex de resaltado de sintaxis
  const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/\*[\s\S]*?\*\/)|(\/\/.*)|(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)|(\b(?:class|function|public|private|protected|static|readonly|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|new|namespace|use|extends|implements|true|false|null|echo|print|require_once|include_once|__DIR__|const|try)\b)|(\b[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*\b)(?=\s*\()|(\b[A-Z][a-zA-Z0-9_]*\b)|(\b\d+\b)|(&lt;\?php|\?&gt;)/g;

  let highlightedCode = code.replace(regex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
    if (p1) return `<span class="string">${p1}</span>`;
    if (p2) {
      return p2.split('\n').map(line => `<span class="comment">${line}</span>`).join('\n');
    }
    if (p3) return `<span class="comment">${p3}</span>`;
    if (p4) return `<span class="variable">${p4}</span>`;
    if (p5) return `<span class="keyword">${p5}</span>`;
    if (p6) {
      const controlKeywords = ['if', 'elseif', 'for', 'foreach', 'while', 'switch', 'catch', 'array', 'match'];
      if (controlKeywords.includes(p6)) return `<span class="keyword">${p6}</span>`;
      return `<span class="function">${p6}</span>`;
    }
    if (p7) return `<span class="class">${p7}</span>`;
    if (p8) return `<span class="number">${p8}</span>`;
    if (p9) return `<span class="php-tag">${p9}</span>`;
    return match;
  });

  // 4. Inyectar líneas formateadas
  const lines = highlightedCode.split('\n');
  codeContainer.innerHTML = lines.map(line => `<span class="line">${line}</span>`).join('\n');

  // 5. Botón de copiado independiente
  const showSuccessIcon = () => {
    iconCopy.style.display = 'none';
    iconCheck.style.display = 'block';
    copyBtn.style.borderColor = '#5BC800';

    setTimeout(() => {
      iconCopy.style.display = 'block';
      iconCheck.style.display = 'none';
      copyBtn.style.borderColor = '#334155';
    }, 2000);
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showSuccessIcon();
    } catch (err) {
      console.error('Error en fallback:', err);
    }
    document.body.removeChild(textArea);
  };

  copyBtn.addEventListener('click', async () => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(codeToCopy);
      return;
    }
    try {
      await navigator.clipboard.writeText(codeToCopy);
      showSuccessIcon();
    } catch (err) {
      fallbackCopyTextToClipboard(codeToCopy);
    }
  });
});
import { Injectable, signal } from '@angular/core';

/**
 * Servicio que traduce TODO el texto visible del DOM de Español -> Inglés
 * usando la API pública y gratuita de MyMemory (no requiere API key).
 *
 * Funcionamiento:
 *  - Recorre el DOM buscando nodos de texto (y placeholders de inputs).
 *  - Guarda el texto original de cada nodo para poder restaurarlo.
 *  - Traduce cada texto único (usando cache para no repetir llamadas).
 *  - Reemplaza el texto en el DOM.
 */
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  /** true = la página está mostrando inglés */
  isEnglish = signal(false);

  /** true = hay una traducción en curso (para mostrar loading en el botón) */
  isTranslating = signal(false);

  /** Cache de traducciones ya resueltas: texto original -> traducido */
  private cache = new Map<string, string>();

  /** Guarda el texto original de cada nodo de texto traducido */
  private originalTextMap = new WeakMap<Text, string>();

  /** Guarda placeholders originales por elemento */
  private originalPlaceholderMap = new WeakMap<HTMLElement, string>();

  private readonly API_URL = 'https://api.mymemory.translated.net/get';

  /**
   * Alterna entre Español (original) <-> Inglés (traducido).
   * Se puede llamar libremente desde el botón.
   */
  async toggleLanguage(root: HTMLElement = document.body): Promise<void> {
    if (this.isTranslating()) {
      return;
    }

    if (this.isEnglish()) {
      this.restoreOriginal(root);
      this.isEnglish.set(false);
      return;
    }

    this.isTranslating.set(true);
    try {
      await this.translateNode(root);
      this.isEnglish.set(true);
    } finally {
      this.isTranslating.set(false);
    }
  }

  /**
   * Vuelve a aplicar la traducción a un nodo nuevo (por ejemplo tras
   * navegar a otra ruta) SOLO si el modo inglés está activo.
   */
  async reapplyIfActive(root: HTMLElement = document.body): Promise<void> {
    if (!this.isEnglish()) return;
    this.isTranslating.set(true);
    try {
      await this.translateNode(root);
    } finally {
      this.isTranslating.set(false);
    }
  }

  // ---------------------------------------------------------------------
  // Internos
  // ---------------------------------------------------------------------

  private getTextNodes(root: Node): Text[] {
    const skipTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'TITLE']);
    const nodes: Text[] = [];

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node: Node) => {
        const parent = (node as Text).parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        // Evita retraducir el botón mismo si tiene un data-no-translate
        if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
        if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current = walker.nextNode();
    while (current) {
      nodes.push(current as Text);
      current = walker.nextNode();
    }
    return nodes;
  }

  private async translateNode(root: HTMLElement): Promise<void> {
    const textNodes = this.getTextNodes(root);

    // Guarda originales de nodos de texto (solo si no se habían guardado antes)
    textNodes.forEach((node) => {
      if (!this.originalTextMap.has(node)) {
        this.originalTextMap.set(node, node.textContent || '');
      }
    });

    // Placeholders (inputs, textareas)
    const placeholderEls = Array.from(
      root.querySelectorAll('[placeholder]')
    ) as HTMLElement[];
    placeholderEls.forEach((el) => {
      if (!this.originalPlaceholderMap.has(el)) {
        this.originalPlaceholderMap.set(el, el.getAttribute('placeholder') || '');
      }
    });

    // Recolecta textos únicos a traducir
    const uniqueTexts = new Set<string>();
    textNodes.forEach((n) => {
      const t = (this.originalTextMap.get(n) || '').trim();
      if (t) uniqueTexts.add(t);
    });
    placeholderEls.forEach((el) => {
      const t = (this.originalPlaceholderMap.get(el) || '').trim();
      if (t) uniqueTexts.add(t);
    });

    const pending = Array.from(uniqueTexts).filter((t) => !this.cache.has(t));
    await this.translateBatch(pending);

    // Aplica traducción a los nodos de texto
    textNodes.forEach((node) => {
      const original = this.originalTextMap.get(node) || '';
      const trimmed = original.trim();
      if (!trimmed) return;
      const translated = this.cache.get(trimmed);
      if (translated) {
        const leading = original.match(/^\s*/)?.[0] ?? '';
        const trailing = original.match(/\s*$/)?.[0] ?? '';
        node.textContent = leading + translated + trailing;
      }
    });

    // Aplica traducción a placeholders
    placeholderEls.forEach((el) => {
      const original = (this.originalPlaceholderMap.get(el) || '').trim();
      const translated = this.cache.get(original);
      if (translated) {
        el.setAttribute('placeholder', translated);
      }
    });
  }

  private restoreOriginal(root: HTMLElement): void {
    const textNodes = this.getTextNodes(root);
    textNodes.forEach((node) => {
      const original = this.originalTextMap.get(node);
      if (original !== undefined) {
        node.textContent = original;
      }
    });

    const placeholderEls = Array.from(
      root.querySelectorAll('[placeholder]')
    ) as HTMLElement[];
    placeholderEls.forEach((el) => {
      const original = this.originalPlaceholderMap.get(el);
      if (original !== undefined) {
        el.setAttribute('placeholder', original);
      }
    });
  }

  /** Traduce una lista de textos con un pequeño pool de concurrencia */
  private async translateBatch(texts: string[]): Promise<void> {
    if (texts.length === 0) return;
    const concurrency = 5;
    let index = 0;

    const worker = async (): Promise<void> => {
      while (index < texts.length) {
        const current = index++;
        const text = texts[current];
        try {
          const translated = await this.translateText(text);
          this.cache.set(text, translated);
        } catch {
          // Si falla la API, dejamos el texto original como "traducción"
          this.cache.set(text, text);
        }
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, texts.length) }, () =>
      worker()
    );
    await Promise.all(workers);
  }

  private async translateText(text: string): Promise<string> {
    if (!text.trim()) return text;

    // MyMemory tiene un límite práctico ~500 caracteres por consulta
    const safeText = text.length > 480 ? text.slice(0, 480) : text;

    const url = `${this.API_URL}?q=${encodeURIComponent(safeText)}&langpair=es|en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fallo al traducir');

    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    return translated || text;
  }
}

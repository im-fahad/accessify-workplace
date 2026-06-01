import type { Lang } from './types'

export interface Translations {
  title: string
  subtitle: string
  widgetSize: string
  profiles: string
  contentAdjustments: string
  colorAdjustments: string
  resetAll: string
  close: string
  // Profiles
  seizureSafe: string
  visionImpaired: string
  adhdFriendly: string
  cognitiveDisability: string
  keyboardNavigation: string
  screenReader: string
  colorBlind: string
  dyslexia: string
  // Content
  contentScale: string
  readableFont: string
  highlightTitles: string
  fontSize: string
  textMagnifier: string
  readingLens: string
  highlightLinks: string
  lineHeight: string
  letterSpacing: string
  textAlign: string
  // Color
  darkContrast: string
  lightContrast: string
  highContrast: string
  monochrome: string
  invertColors: string
  // Stepper
  default: string
  decrease: string
  increase: string
  // Align
  alignLeft: string
  alignCenter: string
  alignRight: string
  // WCAG
  pageAnalysis: string
  analyzeNow: string
  analyzing: string
  score: string
  issuesFound: string
  noIssues: string
  wcagPass: string
  wcagFail: string
  wcagWarn: string
}

const en: Translations = {
  title: 'Accessify',
  subtitle: 'Accessibility Settings',
  widgetSize: 'Widget Size',
  profiles: 'Accessibility Profiles',
  contentAdjustments: 'Content Adjustments',
  colorAdjustments: 'Color Adjustments',
  resetAll: 'Reset all settings',
  close: 'Close accessibility menu',
  seizureSafe: 'Seizure Safe',
  visionImpaired: 'Vision Impaired',
  adhdFriendly: 'ADHD Friendly',
  cognitiveDisability: 'Cognitive Disability',
  keyboardNavigation: 'Keyboard Navigation',
  screenReader: 'Screen Reader',
  colorBlind: 'Color Blind',
  dyslexia: 'Dyslexia',
  contentScale: 'Content Scale',
  readableFont: 'Readable Font',
  highlightTitles: 'Highlight Titles',
  fontSize: 'Font Size',
  textMagnifier: 'Text Magnifier',
  readingLens: 'Reading Lens',
  highlightLinks: 'Highlight Links',
  lineHeight: 'Line Height',
  letterSpacing: 'Letter Spacing',
  textAlign: 'Text Align',
  darkContrast: 'Dark Contrast',
  lightContrast: 'Light Contrast',
  highContrast: 'High Contrast',
  monochrome: 'Monochrome',
  invertColors: 'Invert Colors',
  default: 'Default',
  decrease: 'Decrease',
  increase: 'Increase',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  pageAnalysis: 'Page Analysis',
  analyzeNow: 'Analyze Page',
  analyzing: 'Analyzing…',
  score: 'Score',
  issuesFound: 'issues found',
  noIssues: 'No issues found',
  wcagPass: 'Pass',
  wcagFail: 'Fail',
  wcagWarn: 'Warning',
}

const es: Translations = {
  title: 'Accessify',
  subtitle: 'Configuración de Accesibilidad',
  widgetSize: 'Tamaño del Widget',
  profiles: 'Perfiles de Accesibilidad',
  contentAdjustments: 'Ajustes de Contenido',
  colorAdjustments: 'Ajustes de Color',
  resetAll: 'Restablecer configuración',
  close: 'Cerrar menú de accesibilidad',
  seizureSafe: 'Seguro para Convulsiones',
  visionImpaired: 'Visión Reducida',
  adhdFriendly: 'TDAH Amigable',
  cognitiveDisability: 'Discapacidad Cognitiva',
  keyboardNavigation: 'Navegación por Teclado',
  screenReader: 'Lector de Pantalla',
  colorBlind: 'Daltonismo',
  dyslexia: 'Dislexia',
  contentScale: 'Escala de Contenido',
  readableFont: 'Fuente Legible',
  highlightTitles: 'Resaltar Títulos',
  fontSize: 'Tamaño de Fuente',
  textMagnifier: 'Lupa de Texto',
  readingLens: 'Lente de Lectura',
  highlightLinks: 'Resaltar Enlaces',
  lineHeight: 'Altura de Línea',
  letterSpacing: 'Espaciado de Letras',
  textAlign: 'Alineación de Texto',
  darkContrast: 'Contraste Oscuro',
  lightContrast: 'Contraste Claro',
  highContrast: 'Alto Contraste',
  monochrome: 'Monocromático',
  invertColors: 'Invertir Colores',
  default: 'Predeterminado',
  decrease: 'Disminuir',
  increase: 'Aumentar',
  alignLeft: 'Alinear izquierda',
  alignCenter: 'Centrar',
  alignRight: 'Alinear derecha',
  pageAnalysis: 'Análisis de Página',
  analyzeNow: 'Analizar Página',
  analyzing: 'Analizando…',
  score: 'Puntuación',
  issuesFound: 'problemas encontrados',
  noIssues: 'No se encontraron problemas',
  wcagPass: 'Correcto',
  wcagFail: 'Fallo',
  wcagWarn: 'Advertencia',
}

const fr: Translations = {
  title: 'Accessify',
  subtitle: "Paramètres d'Accessibilité",
  widgetSize: 'Taille du Widget',
  profiles: "Profils d'Accessibilité",
  contentAdjustments: 'Ajustements du Contenu',
  colorAdjustments: 'Ajustements des Couleurs',
  resetAll: 'Réinitialiser les paramètres',
  close: "Fermer le menu d'accessibilité",
  seizureSafe: 'Sûr pour Épilepsie',
  visionImpaired: 'Déficience Visuelle',
  adhdFriendly: 'TDAH Adapté',
  cognitiveDisability: 'Handicap Cognitif',
  keyboardNavigation: 'Navigation Clavier',
  screenReader: "Lecteur d'Écran",
  colorBlind: 'Daltonisme',
  dyslexia: 'Dyslexie',
  contentScale: 'Échelle du Contenu',
  readableFont: 'Police Lisible',
  highlightTitles: 'Surligner les Titres',
  fontSize: 'Taille de Police',
  textMagnifier: 'Loupe de Texte',
  readingLens: 'Loupe de Lecture',
  highlightLinks: 'Surligner les Liens',
  lineHeight: 'Hauteur de Ligne',
  letterSpacing: 'Espacement des Lettres',
  textAlign: 'Alignement du Texte',
  darkContrast: 'Contraste Sombre',
  lightContrast: 'Contraste Clair',
  highContrast: 'Contraste Élevé',
  monochrome: 'Monochrome',
  invertColors: 'Inverser les Couleurs',
  default: 'Défaut',
  decrease: 'Diminuer',
  increase: 'Augmenter',
  alignLeft: 'Aligner à gauche',
  alignCenter: 'Centrer',
  alignRight: 'Aligner à droite',
  pageAnalysis: 'Analyse de Page',
  analyzeNow: 'Analyser la Page',
  analyzing: 'Analyse en cours…',
  score: 'Score',
  issuesFound: 'problèmes trouvés',
  noIssues: 'Aucun problème trouvé',
  wcagPass: 'Réussi',
  wcagFail: 'Échec',
  wcagWarn: 'Avertissement',
}

const de: Translations = {
  title: 'Accessify',
  subtitle: 'Barrierefreiheitseinstellungen',
  widgetSize: 'Widget-Größe',
  profiles: 'Barrierefreiheitsprofile',
  contentAdjustments: 'Inhaltsanpassungen',
  colorAdjustments: 'Farbanpassungen',
  resetAll: 'Alle Einstellungen zurücksetzen',
  close: 'Barrierefreiheitsmenü schließen',
  seizureSafe: 'Anfallssicher',
  visionImpaired: 'Sehbehinderung',
  adhdFriendly: 'ADHS-freundlich',
  cognitiveDisability: 'Kognitive Behinderung',
  keyboardNavigation: 'Tastaturnavigation',
  screenReader: 'Screenreader',
  colorBlind: 'Farbenblindheit',
  dyslexia: 'Legasthenie',
  contentScale: 'Inhaltsgröße',
  readableFont: 'Lesbare Schrift',
  highlightTitles: 'Überschriften hervorheben',
  fontSize: 'Schriftgröße',
  textMagnifier: 'Textlupe',
  readingLens: 'Leselupe',
  highlightLinks: 'Links hervorheben',
  lineHeight: 'Zeilenhöhe',
  letterSpacing: 'Zeichenabstand',
  textAlign: 'Textausrichtung',
  darkContrast: 'Dunkler Kontrast',
  lightContrast: 'Heller Kontrast',
  highContrast: 'Hoher Kontrast',
  monochrome: 'Monochrom',
  invertColors: 'Farben invertieren',
  default: 'Standard',
  decrease: 'Verringern',
  increase: 'Erhöhen',
  alignLeft: 'Linksbündig',
  alignCenter: 'Zentriert',
  alignRight: 'Rechtsbündig',
  pageAnalysis: 'Seitenanalyse',
  analyzeNow: 'Seite analysieren',
  analyzing: 'Analysiere…',
  score: 'Punktzahl',
  issuesFound: 'Probleme gefunden',
  noIssues: 'Keine Probleme gefunden',
  wcagPass: 'Bestanden',
  wcagFail: 'Fehler',
  wcagWarn: 'Warnung',
}

const pt: Translations = {
  title: 'Accessify',
  subtitle: 'Configurações de Acessibilidade',
  widgetSize: 'Tamanho do Widget',
  profiles: 'Perfis de Acessibilidade',
  contentAdjustments: 'Ajustes de Conteúdo',
  colorAdjustments: 'Ajustes de Cor',
  resetAll: 'Redefinir todas as configurações',
  close: 'Fechar menu de acessibilidade',
  seizureSafe: 'Seguro para Convulsões',
  visionImpaired: 'Deficiência Visual',
  adhdFriendly: 'Amigável para TDAH',
  cognitiveDisability: 'Deficiência Cognitiva',
  keyboardNavigation: 'Navegação por Teclado',
  screenReader: 'Leitor de Tela',
  colorBlind: 'Daltonismo',
  dyslexia: 'Dislexia',
  contentScale: 'Escala de Conteúdo',
  readableFont: 'Fonte Legível',
  highlightTitles: 'Destacar Títulos',
  fontSize: 'Tamanho da Fonte',
  textMagnifier: 'Lupa de Texto',
  readingLens: 'Lupa de Leitura',
  highlightLinks: 'Destacar Links',
  lineHeight: 'Altura da Linha',
  letterSpacing: 'Espaçamento de Letras',
  textAlign: 'Alinhamento de Texto',
  darkContrast: 'Contraste Escuro',
  lightContrast: 'Contraste Claro',
  highContrast: 'Alto Contraste',
  monochrome: 'Monocromático',
  invertColors: 'Inverter Cores',
  default: 'Padrão',
  decrease: 'Diminuir',
  increase: 'Aumentar',
  alignLeft: 'Alinhar à esquerda',
  alignCenter: 'Centralizar',
  alignRight: 'Alinhar à direita',
  pageAnalysis: 'Análise de Página',
  analyzeNow: 'Analisar Página',
  analyzing: 'Analisando…',
  score: 'Pontuação',
  issuesFound: 'problemas encontrados',
  noIssues: 'Nenhum problema encontrado',
  wcagPass: 'Aprovado',
  wcagFail: 'Falha',
  wcagWarn: 'Aviso',
}

const ar: Translations = {
  title: 'Accessify',
  subtitle: 'إعدادات إمكانية الوصول',
  widgetSize: 'حجم الأداة',
  profiles: 'ملفات إمكانية الوصول',
  contentAdjustments: 'تعديلات المحتوى',
  colorAdjustments: 'تعديلات الألوان',
  resetAll: 'إعادة تعيين جميع الإعدادات',
  close: 'إغلاق قائمة إمكانية الوصول',
  seizureSafe: 'آمن للصرع',
  visionImpaired: 'ضعف البصر',
  adhdFriendly: 'مناسب لـ ADHD',
  cognitiveDisability: 'إعاقة معرفية',
  keyboardNavigation: 'التنقل بلوحة المفاتيح',
  screenReader: 'قارئ الشاشة',
  colorBlind: 'عمى الألوان',
  dyslexia: 'عسر القراءة',
  contentScale: 'مقياس المحتوى',
  readableFont: 'خط مقروء',
  highlightTitles: 'تمييز العناوين',
  fontSize: 'حجم الخط',
  textMagnifier: 'مكبر النص',
  readingLens: 'عدسة القراءة',
  highlightLinks: 'تمييز الروابط',
  lineHeight: 'ارتفاع السطر',
  letterSpacing: 'تباعد الحروف',
  textAlign: 'محاذاة النص',
  darkContrast: 'تباين داكن',
  lightContrast: 'تباين فاتح',
  highContrast: 'تباين عالٍ',
  monochrome: 'أحادي اللون',
  invertColors: 'عكس الألوان',
  default: 'افتراضي',
  decrease: 'تقليل',
  increase: 'زيادة',
  alignLeft: 'محاذاة يسار',
  alignCenter: 'توسيط',
  alignRight: 'محاذاة يمين',
  pageAnalysis: 'تحليل الصفحة',
  analyzeNow: 'تحليل الصفحة',
  analyzing: 'جارٍ التحليل…',
  score: 'النتيجة',
  issuesFound: 'مشاكل موجودة',
  noIssues: 'لا توجد مشاكل',
  wcagPass: 'نجاح',
  wcagFail: 'فشل',
  wcagWarn: 'تحذير',
}

const TRANSLATIONS: Record<Lang, Translations> = { en, es, fr, de, pt, ar }

export function getTranslations(lang: Lang = 'en'): Translations {
  return TRANSLATIONS[lang] ?? en
}

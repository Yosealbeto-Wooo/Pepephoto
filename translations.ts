
export const languages: { [key: string]: string } = {
  en: 'English',
  es: 'Español',
  zh: '中文 (简体)',
  hi: 'हिन्दी',
  fr: 'Français',
  ar: 'العربية',
  de: 'Deutsch',
  ru: 'Русский',
  pt: 'Português',
  ja: '日本語',
};

type TranslationKeys = {
  'app.title': string;
  'upload.title': string;
  'upload.or': string;
  'upload.browse': string;
  'upload.supports': string;
  'upload.processing': string;
  'enhancements.title': string;
  'filters.title': string;
  'history.title': string;
  'controls.quality': string;
  'controls.sharpen': string;
  'controls.colors': string;
  'controls.adjust': string;
  'controls.vintage': string;
  'controls.bw': string;
  'controls.cinematic': string;
  'history.original': string;
  'comparator.original': string;
  'comparator.edited': string;
  'actions.new': string;
  'actions.reset': string;
  'actions.share': string;
  'actions.download': string;
  'actions.apply': string;
  'loader.enhancing': string;
  'error.load': string;
  'error.edit': string;
  'lang.select': string;
  'resizer.title': string;
  'controls.resize.square': string;
  'controls.resize.story': string;
  'controls.resize.landscape': string;
  'controls.resize.portrait_sm': string;
  'transform.title': string;
  'controls.rotate_left': string;
  'controls.rotate_right': string;
  'controls.straighten': string;
  'controls.straighten_desc': string;
  'controls.exposure': string;
  'controls.brightness': string;
  'controls.contrast': string;
  'controls.saturation': string;
  'controls.temperature': string;
  'controls.highlights': string;
  'controls.shadows': string;
  'controls.invert': string;
  'controls.exposure_desc': string;
  'controls.brightness_desc': string;
  'controls.contrast_desc': string;
  'controls.saturation_desc': string;
  'controls.temperature_desc': string;
  'controls.highlights_desc': string;
  'controls.shadows_desc': string;
  'controls.redeye': string;
  'controls.blur': string;
  'controls.watercolor': string;
  'controls.oil_painting': string;
  'controls.cartoon': string;
  'controls.manga': string;
  'controls.custom_filter.title': string;
  'controls.custom_filter.placeholder': string;
  'controls.custom_filter.apply': string;
  'controls.custom_adjustments': string;
  'video_generator.api_key.title': string;
  'video_generator.api_key.description': string;
  'video_generator.api_key.billing_link': string;
  'video_generator.api_key.button': string;
  'error.apiKey.title': string;
  'error.apiKey.description': string;
};

const en: TranslationKeys = {
    'app.title': 'Gemini Photo Enhancer',
    'upload.title': 'Drag & drop your photo here',
    'upload.or': 'or',
    'upload.browse': 'Browse Files',
    'upload.supports': 'Supports JPEG, PNG, WEBP',
    'upload.processing': 'Processing your image...',
    'enhancements.title': 'Enhancements',
    'filters.title': 'Filters',
    'history.title': 'History',
    'controls.quality': 'Improve Quality',
    'controls.sharpen': 'Sharpen',
    'controls.colors': 'Enhance Colors',
    'controls.adjust': 'Auto Adjust',
    'controls.vintage': 'Vintage',
    'controls.bw': 'Black & White',
    'controls.cinematic': 'Cinematic',
    'history.original': 'Original Image',
    'comparator.original': 'ORIGINAL',
    'comparator.edited': 'EDITED',
    'actions.new': 'New Image',
    'actions.reset': 'Reset',
    'actions.share': 'Share',
    'actions.download': 'Download',
    'actions.apply': 'Apply Enhancements',
    'loader.enhancing': 'AI is enhancing your image...',
    'error.load': 'Failed to load image. Please try another file.',
    'error.edit': 'An error occurred during editing: {message}',
    'lang.select': 'Select your language',
    'resizer.title': 'Social Media Resizer',
    'controls.resize.square': 'Square Post (1:1)',
    'controls.resize.story': 'Story (9:16)',
    'controls.resize.landscape': 'Landscape Post (16:9)',
    'controls.resize.portrait_sm': 'Portrait Post (4:5)',
    'transform.title': 'Transform',
    'controls.rotate_left': 'Rotate Left',
    'controls.rotate_right': 'Rotate Right',
    'controls.straighten': 'Straighten',
    'controls.straighten_desc': 'Straighten by {degrees}°',
    'controls.exposure': 'Exposure',
    'controls.brightness': 'Brightness',
    'controls.contrast': 'Contrast',
    'controls.saturation': 'Saturation',
    'controls.temperature': 'Temperature',
    'controls.highlights': 'Highlights',
    'controls.shadows': 'Shadows',
    'controls.invert': 'Invert Colors',
    'controls.exposure_desc': 'Adjust Exposure by {value}',
    'controls.brightness_desc': 'Adjust Brightness by {value}',
    'controls.contrast_desc': 'Adjust Contrast by {value}',
    'controls.saturation_desc': 'Adjust Saturation by {value}',
    'controls.temperature_desc': 'Adjust Temperature by {value}',
    'controls.highlights_desc': 'Adjust Highlights by {value}',
    'controls.shadows_desc': 'Adjust Shadows by {value}',
    'controls.redeye': 'Remove Red Eye',
    'controls.blur': 'Blur',
    'controls.watercolor': 'Watercolor',
    'controls.oil_painting': 'Oil Painting',
    'controls.cartoon': 'Cartoon',
    'controls.manga': 'Manga Style',
    'controls.custom_filter.title': 'Custom Filter',
    'controls.custom_filter.placeholder': 'Describe a filter...',
    'controls.custom_filter.apply': 'Apply Filter',
    'controls.custom_adjustments': 'Custom Adjustments',
    'video_generator.api_key.title': 'Select Your API Key',
    'video_generator.api_key.description': 'To use the AI features, you need to select a project with the Gemini API enabled.',
    'video_generator.api_key.billing_link': 'Learn about billing',
    'video_generator.api_key.button': 'Select API Key',
    'error.apiKey.title': 'API Key Configuration Error',
    'error.apiKey.description': 'The Gemini API key is not available. For this application to work, the `API_KEY` environment variable must be configured and accessible.',
};

export const translations: { [key: string]: TranslationKeys } = {
  en,
  es: {
    ...en,
    'app.title': 'Mejorador de Fotos Gemini',
    'upload.title': 'Arrastra y suelta tu foto aquí',
    'upload.or': 'o',
    'upload.browse': 'Buscar Archivos',
    'upload.supports': 'Soporta JPEG, PNG, WEBP',
    'upload.processing': 'Procesando tu imagen...',
    'enhancements.title': 'Mejoras',
    'filters.title': 'Filtros',
    'history.title': 'Historial',
    'controls.quality': 'Mejorar Calidad',
    'controls.sharpen': 'Enfocar',
    'controls.colors': 'Mejorar Colores',
    'controls.adjust': 'Ajuste Automático',
    'controls.vintage': 'Vintage',
    'controls.bw': 'Blanco y Negro',
    'controls.cinematic': 'Cinemático',
    'history.original': 'Imagen Original',
    'comparator.original': 'ORIGINAL',
    'comparator.edited': 'EDITADA',
    'actions.new': 'Nueva Imagen',
    'actions.reset': 'Reiniciar',
    'actions.share': 'Compartir',
    'actions.download': 'Descargar',
    'actions.apply': 'Aplicar Mejoras',
    'loader.enhancing': 'La IA está mejorando tu imagen...',
    'error.load': 'Error al cargar la imagen. Por favor, intenta con otro archivo.',
    'error.edit': 'Ocurrió un error durante la edición: {message}',
    'lang.select': 'Seleccione su idioma',
    'resizer.title': 'Redimensionar para Redes',
    'controls.resize.square': 'Post Cuadrado (1:1)',
    'controls.resize.story': 'Historia (9:16)',
    'controls.resize.landscape': 'Post Horizontal (16:9)',
    'controls.resize.portrait_sm': 'Post Vertical (4:5)',
    'transform.title': 'Transformar',
    'controls.rotate_left': 'Girar Izquierda',
    'controls.rotate_right': 'Girar Derecha',
    'controls.straighten': 'Enderezar',
    'controls.straighten_desc': 'Enderezar {degrees}°',
    'controls.exposure': 'Exposición',
    'controls.brightness': 'Brillo',
    'controls.contrast': 'Contraste',
    'controls.saturation': 'Saturación',
    'controls.temperature': 'Temperatura',
    'controls.highlights': 'Luces',
    'controls.shadows': 'Sombras',
    'controls.invert': 'Invertir Colores',
    'controls.exposure_desc': 'Ajustar Exposición en {value}',
    'controls.brightness_desc': 'Ajustar Brillo en {value}',
    'controls.contrast_desc': 'Ajustar Contraste en {value}',
    'controls.saturation_desc': 'Ajustar Saturación en {value}',
    'controls.temperature_desc': 'Ajustar Temperatura en {value}',
    'controls.highlights_desc': 'Ajustar Luces en {value}',
    'controls.shadows_desc': 'Ajustar Sombras en {value}',
    'controls.redeye': 'Eliminar Ojos Rojos',
    'controls.blur': 'Difuminar',
    'controls.watercolor': 'Acuarela',
    'controls.oil_painting': 'Pintura al Óleo',
    'controls.cartoon': 'Caricatura',
    'controls.manga': 'Estilo Manga',
    'controls.custom_filter.title': 'Filtro Personalizado',
    'controls.custom_filter.placeholder': 'Describe un filtro...',
    'controls.custom_filter.apply': 'Aplicar Filtro',
    'controls.custom_adjustments': 'Ajustes Personalizados',
    'video_generator.api_key.title': 'Seleccione su clave de API',
    'video_generator.api_key.description': 'Para usar las funciones de IA, debe seleccionar un proyecto con la API de Gemini habilitada.',
    'video_generator.api_key.billing_link': 'Más información sobre la facturación',
    'video_generator.api_key.button': 'Seleccionar clave de API',
    'error.apiKey.title': 'Error de Configuración de Clave de API',
    'error.apiKey.description': 'La clave de API de Gemini no está disponible. Para que esta aplicación funcione, la variable de entorno `API_KEY` debe estar configurada y accesible.',
  },
  zh: {
    ...en,
    'app.title': 'Gemini 照片增强器',
    'upload.title': '将您的照片拖放到此处',
    'upload.or': '或',
    'upload.browse': '浏览文件',
    'upload.supports': '支持 JPEG, PNG, WEBP',
    'upload.processing': '正在处理您的图片...',
    'enhancements.title': '增强功能',
    'filters.title': '滤镜',
    'history.title': '历史记录',
    'controls.quality': '提高质量',
    'controls.sharpen': '锐化',
    'controls.colors': '增强色彩',
    'controls.adjust': '自动调整',
    'controls.vintage': '复古',
    'controls.bw': '黑白',
    'controls.cinematic': '电影',
    'history.original': '原始图片',
    'comparator.original': '原始',
    'comparator.edited': '编辑后',
    'actions.new': '新图片',
    'actions.reset': '重置',
    'actions.share': '分享',
    'actions.download': '下载',
    'actions.apply': '应用增强',
    'loader.enhancing': 'AI 正在增强您的图像...',
    'error.load': '加载图像失败。请尝试另一个文件。',
    'error.edit': '编辑期间发生错误: {message}',
    'lang.select': '请选择您的语言',
    'resizer.title': '社交媒体尺寸调整',
    'controls.resize.square': '方形帖子 (1:1)',
    'controls.resize.story': '快拍 (9:16)',
    'controls.resize.landscape': '横向帖子 (16:9)',
    'controls.resize.portrait_sm': '纵向帖子 (4:5)',
    'transform.title': '变换',
    'controls.rotate_left': '向左旋转',
    'controls.rotate_right': '向右旋转',
    'controls.straighten': '校正',
    'controls.straighten_desc': '校正 {degrees}°',
    'controls.exposure': '曝光',
    'controls.brightness': '亮度',
    'controls.contrast': '对比度',
    'controls.saturation': '饱和度',
    'controls.temperature': '色温',
    'controls.highlights': '高光',
    'controls.shadows': '阴影',
    'controls.invert': '反色',
    'controls.exposure_desc': '调整曝光 {value}',
    'controls.brightness_desc': '调整亮度 {value}',
    'controls.contrast_desc': '调整对比度 {value}',
    'controls.saturation_desc': '调整饱和度 {value}',
    'controls.temperature_desc': '调整色温 {value}',
    'controls.highlights_desc': '调整高光 {value}',
    'controls.shadows_desc': '调整阴影 {value}',
    'controls.redeye': '消除红眼',
    'controls.blur': '模糊',
    'controls.watercolor': '水彩',
    'controls.oil_painting': '油画',
    'controls.cartoon': '卡通',
    'controls.manga': '漫画风格',
    'controls.custom_filter.title': '自定义滤镜',
    'controls.custom_filter.placeholder': '描述一个滤镜...',
    'controls.custom_filter.apply': '应用滤镜',
    'controls.custom_adjustments': '自定义调整',
    'video_generator.api_key.title': '选择您的API密钥',
    'video_generator.api_key.description': '要使用AI功能，您需要选择一个启用了Gemini API的项目。',
    'video_generator.api_key.billing_link': '了解计费',
    'video_generator.api_key.button': '选择API密钥',
    'error.apiKey.title': 'API密钥配置错误',
    'error.apiKey.description': 'Gemini API密钥不可用。为了使此应用程序正常工作，必须配置并访问`API_KEY`环境变量。',
  },
  fr: {
    ...en,
    'app.title': 'Améliorateur de Photos Gemini',
    'upload.title': 'Glissez-déposez votre photo ici',
    'upload.or': 'ou',
    'upload.browse': 'Parcourir les fichiers',
    'upload.supports': 'Prend en charge JPEG, PNG, WEBP',
    'upload.processing': 'Traitement de votre image...',
    'enhancements.title': 'Améliorations',
    'filters.title': 'Filtres',
    'history.title': 'Historique',
    'controls.quality': 'Améliorer la qualité',
    'controls.sharpen': 'Netteté',
    'controls.colors': 'Améliorer les couleurs',
    'controls.adjust': 'Ajustement auto',
    'controls.vintage': 'Vintage',
    'controls.bw': 'Noir & Blanc',
    'controls.cinematic': 'Cinématique',
    'history.original': 'Image originale',
    'comparator.original': 'ORIGINAL',
    'comparator.edited': 'MODIFIÉE',
    'actions.new': 'Nouvelle image',
    'actions.reset': 'Réinitialiser',
    'actions.share': 'Partager',
    'actions.download': 'Télécharger',
    'actions.apply': 'Appliquer les améliorations',
    'loader.enhancing': "L'IA améliore votre image...",
    'error.load': "Échec du chargement de l'image. Veuillez essayer un autre fichier.",
    'error.edit': "Une erreur s'est produite lors de la modification : {message}",
    'lang.select': 'Sélectionnez votre langue',
    'resizer.title': 'Redimensionneur Social',
    'controls.resize.square': 'Post Carré (1:1)',
    'controls.resize.story': 'Story (9:16)',
    'controls.resize.landscape': 'Post Paysage (16:9)',
    'controls.resize.portrait_sm': 'Post Portrait (4:5)',
    'transform.title': 'Transformer',
    'controls.rotate_left': 'Rotation Gauche',
    'controls.rotate_right': 'Rotation Droite',
    'controls.straighten': 'Redresser',
    'controls.straighten_desc': 'Redresser de {degrees}°',
    'controls.exposure': 'Exposition',
    'controls.brightness': 'Luminosité',
    'controls.contrast': 'Contraste',
    'controls.saturation': 'Saturation',
    'controls.temperature': 'Température',
    'controls.highlights': 'Hautes lumières',
    'controls.shadows': 'Ombres',
    'controls.invert': 'Inverser les couleurs',
    'controls.exposure_desc': "Ajuster l'exposition de {value}",
    'controls.brightness_desc': 'Ajuster la luminosité de {value}',
    'controls.contrast_desc': 'Ajuster le contraste de {value}',
    'controls.saturation_desc': 'Ajuster la saturation de {value}',
    'controls.temperature_desc': 'Ajuster la température de {value}',
    'controls.highlights_desc': 'Ajuster les hautes lumières de {value}',
    'controls.shadows_desc': 'Ajuster les ombres de {value}',
    'controls.redeye': 'Supprimer les yeux rouges',
    'controls.blur': 'Flou',
    'controls.watercolor': 'Aquarelle',
    'controls.oil_painting': "Peinture à l'huile",
    'controls.cartoon': 'Dessin animé',
    'controls.manga': 'Style Manga',
    'controls.custom_filter.title': 'Filtre personnalisé',
    'controls.custom_filter.placeholder': 'Décrivez un filtre...',
    'controls.custom_filter.apply': 'Appliquer le filtre',
    'controls.custom_adjustments': 'Ajustements personnalisés',
    'video_generator.api_key.title': 'Sélectionnez votre clé API',
    'video_generator.api_key.description': "Pour utiliser les fonctionnalités d'IA, vous devez sélectionner un projet avec l'API Gemini activée.",
    'video_generator.api_key.billing_link': 'En savoir plus sur la facturation',
    'video_generator.api_key.button': 'Sélectionner la clé API',
    'error.apiKey.title': "Erreur de configuration de la clé API",
    'error.apiKey.description': "La clé API Gemini n'est pas disponible. Pour que cette application fonctionne, la variable d'environnement `API_KEY` doit être configurée et accessible.",
  },
  hi: { 
    ...en, 
    'app.title': 'जेमिनी फोटो एन्हांसर', 
    'lang.select': 'अपनी भाषा का चयन करें',
    'video_generator.api_key.title': 'अपनी एपीआई कुंजी चुनें',
    'error.apiKey.title': 'एपीआई कुंजी कॉन्फ़िगरेशन त्रुटि',
  },
  ar: { 
    ...en, 
    'app.title': 'محسن الصور Gemini', 
    'lang.select': 'اختر لغتك',
    'video_generator.api_key.title': 'حدد مفتاح API الخاص بك',
    'error.apiKey.title': 'خطأ في تكوين مفتاح API',
  },
  de: { 
    ...en, 
    'app.title': 'Gemini Foto-Verbesserer', 
    'lang.select': 'Wähle deine Sprache',
    'video_generator.api_key.title': 'Wählen Sie Ihren API-Schlüssel',
    'error.apiKey.title': 'API-Schlüssel-Konfigurationsfehler',
  },
  ru: { 
    ...en, 
    'app.title': 'Улучшитель фотографий Gemini', 
    'lang.select': 'Выберите ваш язык',
    'video_generator.api_key.title': 'Выберите свой API-ключ',
    'error.apiKey.title': 'Ошибка конфигурации ключа API',
  },
  pt: { 
    ...en, 
    'app.title': 'Otimizador de Fotos Gemini', 
    'lang.select': 'Selecione seu idioma',
    'video_generator.api_key.title': 'Selecione sua chave de API',
    'error.apiKey.title': 'Erro de configuração da chave de API',
  },
  ja: { 
    ...en, 
    'app.title': 'Gemini 写真エンハンサー', 
    'lang.select': '言語を選択してください',
    'video_generator.api_key.title': 'APIキーを選択してください',
    'error.apiKey.title': 'APIキー設定エラー',
  },
};

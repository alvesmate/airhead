# AirHead — промпты для генерации

Лог промптов пригодится для страницы-кейса «как это сделано».

## Этап 1. Поиск образа шлема (Krea, бесплатный тариф)

**Цель:** найти один эталонный кадр шлема. Потом он станет референсом для всех остальных изображений и видео.

**Настройки:** формат 16:9, по 4 варианта на промпт. Модель: любая фотореалистичная из доступных бесплатно.

Общая часть в конце каждого промпта:
```
studio product photography, floating on pure black background, dramatic rim light, subtle reflections, 3/4 view, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### A. Apple-минимализм
```
a sleek consumer space helmet, seamless matte white shell, smoked black glossy visor, minimal soft rounded form, thin aluminium ring at the neck, studio product photography, floating on pure black background, dramatic rim light, subtle reflections, 3/4 view, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### B. Ретрофутуризм 60-х
```
a consumer space helmet in 1960s retro-futurism style, glossy cream enamel shell, gold mirrored visor, chrome details, rounded bubble proportions, studio product photography, floating on pure black background, dramatic rim light, subtle reflections, 3/4 view, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### C. Мягкий текстиль (как AirPods Max)
```
a consumer space helmet covered in soft knitted mesh fabric, pastel sage green, dark tinted visor, anodized aluminium accents, cozy yet high-tech, studio product photography, floating on pure black background, dramatic rim light, subtle reflections, 3/4 view, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### D. Прозрачный купол
```
a consumer space helmet with a fully transparent glass dome, minimal graphite ring collar, subtle internal light strip, elegant and airy, studio product photography, floating on pure black background, dramatic rim light, caustic reflections, 3/4 view, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### Результат этапа 1
Сгенерировано 4 варианта, все в духе направления A. Файлы: `assets/reference/helmet_option_1..4.png`.
Кандидат в эталон: **вариант 2**. У него цельный силуэт, текстура корпуса как у ткани, модуль вентиляции сбоку, металлическое кольцо и розово-голубой контровой свет.

## Этап 2. Проверка консистентности (Krea, референс = helmet_option_2.png)

Загрузи эталон как **image reference** (референс изображения) и генерируй с ним. Цель: тот же шлем в других ракурсах.

### 2.1 Анфас, для hero
```
the same helmet from the reference image, front view, visor facing camera, floating on pure black background, dramatic rim light in soft pink and blue, subtle reflections, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

**Результат 2.1:** 3 варианта, `assets/reference/helmet_front_1..3.png`. Текстура, свет и палитра держатся; детали подбородка «плавают» (вентиляция на подбородке в каждом кадре разная). Кандидат: **front_2**: ближе всего к эталону (металлическое кольцо снизу, рамка визора).

### 2.2 Профиль, для секции фич
Референсы: `helmet_option_2.png` + `helmet_front_2.png`.
```
the same helmet from the reference images, perfect side profile view, fabric-textured white shell, dark visor with thin metal frame, polished metal ring at the neck, ventilation module on the side clearly visible, floating on pure black background, dramatic rim light in soft pink and blue, centered, premium tech product launch aesthetic, ultra detailed, sharp focus, no text, no logo, no person
```

### 2.3 Макро детали, для характеристик
```
extreme close-up macro of the side ventilation module, fabric-textured white shell and polished metal neck ring of the helmet from the reference images, shallow depth of field, black background, soft pink and blue rim light, premium tech product photography, ultra detailed, no text, no logo
```

## Этап 3. Финальные ассеты (Google Gemini)

Krea упёрся в дневной лимит, поэтому финальный набор сгенерирован в Gemini: 5 изображений 2752×1536 и видео 10 с 1280×720. Шлем в них консистентный: новый дизайн с металлической боковой панелью.
Исходники: `assets/reference/new gen/`.

| Файл на сайте | Исходник | Где используется |
|---|---|---|
| `helmet-hero.webp` | khsa… (3/4 спереди, HUD на визоре) | Hero |
| `helmet-side.webp` | opu8… (3/4 сбоку) | Фича «Шумоподавление» |
| `helmet-macro.webp` | v4wd… (макро визора и панели) | Фича «Материал» |
| `helmet-vent.webp` | y3ad… (профиль, значки потока воздуха) | Фича «Вентиляция» |
| `helmet-back.webp` | hzsg… (3/4 сзади) | Блок «Купить» |
| `video/showreel.mp4` | gemini_generated_video… | Шоурил |

Обработка: водяной знак Gemini закрыт куском фона (на макро кадр обрезан справа), в видео убран фильтром `delogo`, звук удалён, видео пережато в H.264 (2,9 → 1,2 МБ).

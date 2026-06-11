# 💰 Mis Gastos

App móvil para llevar el control de tus **gastos, ingresos y ahorro**, con
**resumen mensual** y soporte para **dos monedas: pesos (ARS) y dólares (USD)**.

Funciona **100% offline**: tus datos se guardan en tu propio teléfono, no se
envían a ningún servidor.

## ✨ Qué hace

- Registrar **gastos** e **ingresos** en pesos o dólares.
- **Categorías predefinidas** (comida, transporte, vivienda, servicios, salud, ocio, etc.).
- **Resumen mensual** con los 3 números clave por moneda:
  - 🟢 cuánto **ingresaste**
  - 🔴 cuánto **gastaste**
  - 💙 cuánto **ahorraste** (o déficit si gastaste de más)
- **Plan / Presupuesto** 🎯: cargás tu ingreso y tus gastos fijos, y la app te
  dice **cuánto te queda libre** y **en qué se va** ese sobrante, con barras por
  categoría.
- Elegir el **mes** que querés ver.
- Listado de movimientos con opción de borrar.
- Interfaz con **colores vivos y animaciones** (números que cuentan, barras que
  se llenan, tarjetas que aparecen).

## 📱 Cómo obtener el APK para instalar en tu Android

No hace falta instalar nada en tu compu. El APK se compila solo en GitHub:

1. Subí este proyecto a GitHub (rama `main` o la que uses).
2. Andá a la pestaña **Actions** del repositorio.
3. Abrí la ejecución más reciente de **"Construir APK"** (o lanzala a mano con
   *Run workflow*).
4. Cuando termine (✅), bajá el artefacto **`mis-gastos-apk`**. Adentro está el
   archivo `app-debug.apk`.
5. Pasalo a tu teléfono e instalalo (tenés que permitir
   *"instalar apps de orígenes desconocidos"*).

> Es un APK de **debug** (sin firmar para Play Store), perfecto para uso
> personal. Si más adelante querés publicarlo en Google Play, hay que firmarlo;
> avisame y lo agregamos.

## 🛠️ Desarrollo local (opcional)

```bash
npm install      # instala dependencias
npm run dev      # abre la app en el navegador para probarla
npm run build    # genera la versión de producción en dist/
```

Para construir el APK localmente necesitás Android Studio / Android SDK:

```bash
npm run build
npx cap add android   # solo la primera vez
npx cap sync android
cd android && ./gradlew assembleDebug
# el APK queda en android/app/build/outputs/apk/debug/app-debug.apk
```

## 🧰 Tecnología

- **React + Vite** para la interfaz.
- **Capacitor** para empaquetar la web como app nativa de Android.
- **localStorage** para guardar los datos en el dispositivo.
